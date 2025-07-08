"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Square, Play, Pause, Volume2, VolumeX, Trash2, Send, Loader2 } from 'lucide-react';

const SpeechToText = ({
	onTranscriptionChange,
	onSpeechStart,
	onSpeechEnd,
	onError,
	autoSend = false,
	language = 'en-US',
	continuous = true,
	interimResults = true
}) => {
	const [isRecording, setIsRecording] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [transcription, setTranscription] = useState('');
	const [interimTranscription, setInterimTranscription] = useState('');
	const [audioLevel, setAudioLevel] = useState(0);
	const [recordingTime, setRecordingTime] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [audioBlob, setAudioBlob] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState('');
	const [isSupported, setIsSupported] = useState(true);

	const recognitionRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	const audioContextRef = useRef(null);
	const analyserRef = useRef(null);
	const intervalRef = useRef(null);
	const timeIntervalRef = useRef(null);
	const audioRef = useRef(null);

	useEffect(() => {
		// Check for browser support
		if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
			setIsSupported(false);
			setError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
			return;
		}

		// Initialize speech recognition
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		recognitionRef.current = new SpeechRecognition();

		recognitionRef.current.continuous = continuous;
		recognitionRef.current.interimResults = interimResults;
		recognitionRef.current.lang = language;

		recognitionRef.current.onstart = () => {
			setIsRecording(true);
			setError('');
			if (onSpeechStart) onSpeechStart();
		};

		recognitionRef.current.onresult = (event) => {
			let finalTranscript = '';
			let interimTranscript = '';

			for (let i = event.resultIndex; i < event.results.length; i++) {
				const transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					finalTranscript += transcript;
				} else {
					interimTranscript += transcript;
				}
			}

			if (finalTranscript) {
				const newTranscription = transcription + finalTranscript;
				setTranscription(newTranscription);
				if (onTranscriptionChange) {
					onTranscriptionChange(newTranscription);
				}
			}

			setInterimTranscription(interimTranscript);
		};

		recognitionRef.current.onerror = (event) => {
			const errorMessages = {
				'no-speech': 'No speech was detected. Please try again.',
				'audio-capture': 'No microphone was found. Please check your microphone.',
				'not-allowed': 'Microphone access was denied. Please allow microphone access.',
				'network': 'Network error occurred. Please check your connection.',
				'aborted': 'Speech recognition was aborted.',
				'language-not-supported': 'The selected language is not supported.'
			};

			const errorMessage = errorMessages[event.error] || `Speech recognition error: ${event.error}`;
			setError(errorMessage);
			if (onError) onError(errorMessage);
			stopRecording();
		};

		recognitionRef.current.onend = () => {
			setIsRecording(false);
			setIsPaused(false);
			if (onSpeechEnd) onSpeechEnd();

			// Auto-send if enabled and there's transcription
			if (autoSend && transcription.trim()) {
				handleSendTranscription();
			}
		};

		return () => {
			if (recognitionRef.current) {
				recognitionRef.current.stop();
			}
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			if (timeIntervalRef.current) {
				clearInterval(timeIntervalRef.current);
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
		};
	}, [transcription, autoSend, continuous, interimResults, language]);

	const startRecording = async () => {
		try {
			setError('');
			setIsProcessing(true);

			// Get microphone access
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

			// Initialize audio recording
			mediaRecorderRef.current = new MediaRecorder(stream);
			const audioChunks = [];

			mediaRecorderRef.current.ondataavailable = (event) => {
				audioChunks.push(event.data);
			};

			mediaRecorderRef.current.onstop = () => {
				const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
				setAudioBlob(audioBlob);
				stream.getTracks().forEach(track => track.stop());
			};

			mediaRecorderRef.current.start();

			// Initialize audio visualization
			audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
			analyserRef.current = audioContextRef.current.createAnalyser();
			const source = audioContextRef.current.createMediaStreamSource(stream);
			source.connect(analyserRef.current);

			analyserRef.current.fftSize = 256;
			const bufferLength = analyserRef.current.frequencyBinCount;
			const dataArray = new Uint8Array(bufferLength);

			const updateAudioLevel = () => {
				analyserRef.current.getByteFrequencyData(dataArray);
				const average = dataArray.reduce((a, b) => a + b) / bufferLength;
				setAudioLevel(average);
			};

			intervalRef.current = setInterval(updateAudioLevel, 100);

			// Start recording timer
			setRecordingTime(0);
			timeIntervalRef.current = setInterval(() => {
				setRecordingTime(prev => prev + 1);
			}, 1000);

			// Start speech recognition
			recognitionRef.current.start();
			setIsProcessing(false);
		} catch (error) {
			setError('Failed to access microphone. Please check permissions.');
			setIsProcessing(false);
			if (onError) onError('Failed to access microphone');
		}
	};

	const stopRecording = () => {
		if (recognitionRef.current) {
			recognitionRef.current.stop();
		}
		if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
			mediaRecorderRef.current.stop();
		}
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		if (timeIntervalRef.current) {
			clearInterval(timeIntervalRef.current);
		}
		setIsRecording(false);
		setIsPaused(false);
		setAudioLevel(0);
	};

	const pauseRecording = () => {
		if (recognitionRef.current) {
			recognitionRef.current.stop();
		}
		setIsPaused(true);
	};

	const resumeRecording = () => {
		if (recognitionRef.current) {
			recognitionRef.current.start();
		}
		setIsPaused(false);
	};

	const clearTranscription = () => {
		setTranscription('');
		setInterimTranscription('');
		setAudioBlob(null);
		setRecordingTime(0);
		setError('');
		if (onTranscriptionChange) {
			onTranscriptionChange('');
		}
	};

	const playRecording = () => {
		if (audioBlob && audioRef.current) {
			const audioUrl = URL.createObjectURL(audioBlob);
			audioRef.current.src = audioUrl;
			audioRef.current.play();
			setIsPlaying(true);
		}
	};

	const pausePlayback = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			setIsPlaying(false);
		}
	};

	const handleSendTranscription = () => {
		if (transcription.trim() && onTranscriptionChange) {
			onTranscriptionChange(transcription);
			clearTranscription();
		}
	};

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	const getAudioLevelColor = () => {
		if (audioLevel < 20) return 'bg-green-500';
		if (audioLevel < 40) return 'bg-yellow-500';
		if (audioLevel < 60) return 'bg-orange-500';
		return 'bg-red-500';
	};

	if (!isSupported) {
		return (
			<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
				<div className="flex items-center space-x-2 text-red-700">
					<MicOff className="w-5 h-5" />
					<span className="text-sm font-medium">Speech Recognition Not Supported</span>
				</div>
				<p className="text-red-600 text-sm mt-2">{error}</p>
			</div>
		);
	}

	return (
		<div className="w-full space-y-4">
			{/* Error Display */}
			{error && (
				<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
					<div className="flex items-center space-x-2 text-red-700">
						<MicOff className="w-4 h-4" />
						<span className="text-sm">{error}</span>
					</div>
				</div>
			)}

			{/* Recording Controls */}
			<div className="flex items-center justify-center space-x-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
				{!isRecording ? (
					<button
						onClick={startRecording}
						disabled={isProcessing}
						className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
					>
						{isProcessing ? (
							<Loader2 className="w-6 h-6 animate-spin" />
						) : (
							<Mic className="w-6 h-6" />
						)}
					</button>
				) : (
					<div className="flex items-center space-x-3">
						<button
							onClick={isPaused ? resumeRecording : pauseRecording}
							className="flex items-center justify-center w-12 h-12 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors"
						>
							{isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
						</button>

						<button
							onClick={stopRecording}
							className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
						>
							<Square className="w-5 h-5" />
						</button>
					</div>
				)}
			</div>

			{/* Recording Status */}
			{isRecording && (
				<div className="flex items-center justify-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
						<span className="text-sm font-medium text-blue-900">
							{isPaused ? 'Paused' : 'Recording'}
						</span>
					</div>

					<div className="text-sm text-blue-700">
						{formatTime(recordingTime)}
					</div>

					{/* Audio Level Indicator */}
					<div className="flex items-center space-x-1">
						<Volume2 className="w-4 h-4 text-blue-600" />
						<div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
							<div
								className={`h-full ${getAudioLevelColor()} transition-all duration-100`}
								style={{ width: `${Math.min(audioLevel * 2, 100)}%` }}
							/>
						</div>
					</div>
				</div>
			)}

			{/* Transcription Display */}
			{(transcription || interimTranscription) && (
				<div className="p-4 bg-white rounded-lg border border-gray-200">
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-sm font-medium text-gray-900">Transcription</h3>
						<div className="flex items-center space-x-2">
							{audioBlob && (
								<button
									onClick={isPlaying ? pausePlayback : playRecording}
									className="p-1 text-gray-500 hover:text-gray-700"
								>
									{isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
								</button>
							)}
							<button
								onClick={clearTranscription}
								className="p-1 text-gray-500 hover:text-red-600"
							>
								<Trash2 className="w-4 h-4" />
							</button>
						</div>
					</div>

					<div className="prose prose-sm max-w-none">
						<p className="text-gray-900 mb-0">
							{transcription}
							{interimTranscription && (
								<span className="text-gray-500 italic">{interimTranscription}</span>
							)}
						</p>
					</div>

					{!autoSend && transcription && (
						<div className="mt-3 flex justify-end">
							<button
								onClick={handleSendTranscription}
								className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
							>
								<Send className="w-4 h-4" />
								<span>Send</span>
							</button>
						</div>
					)}
				</div>
			)}

			{/* Hidden audio element for playback */}
			<audio
				ref={audioRef}
				onEnded={() => setIsPlaying(false)}
				style={{ display: 'none' }}
			/>
		</div>
	);
};

export default SpeechToText;
