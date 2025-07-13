"use client";
import { CassetteTape, Mic, NotepadText, Square, Volume2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type props = {
	setTranscribedMsg: Function;
};

export const VoiceRecorder = ({ setTranscribedMsg }: props) => {
	const streamRef = useRef<MediaStream | null>(null);
	const recorder = useRef<MediaRecorder | null>(null);
	const chunks = useRef<Blob[]>([]);
	const [webm, setWebm] = useState<Blob | null>(null);
	const [webmUrl, setWebmUrl] = useState<string | null>(null);
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [transcribeResult, setTranscribeResult] = useState<string>("");
	const [recordingTime, setRecordingTime] = useState<number>(0);
	const [audioLevel, setAudioLevel] = useState<number>(0);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const analyzerRef = useRef<AnalyserNode | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);

	const startRecording = async () => {
		if (isRecording) return;
		
		try {
			streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
			recorder.current = new MediaRecorder(streamRef.current);
			
			// Set up audio level monitoring
			audioContextRef.current = new AudioContext();
			analyzerRef.current = audioContextRef.current.createAnalyser();
			const source = audioContextRef.current.createMediaStreamSource(streamRef.current);
			source.connect(analyzerRef.current);
			analyzerRef.current.fftSize = 256;
			
			// Start monitoring audio levels
			const monitorAudioLevel = () => {
				if (analyzerRef.current && isRecording) {
					const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
					analyzerRef.current.getByteFrequencyData(dataArray);
					const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
					setAudioLevel(average);
					requestAnimationFrame(monitorAudioLevel);
				}
			};
			monitorAudioLevel();
			
			recorder.current.addEventListener("dataavailable", (event) => {
				chunks.current.push(event.data);
			});
			
			recorder.current.addEventListener("stop", () => {
				let webmBlob = new Blob(chunks.current, { type: "audio/webm; codecs=opus" });
				let url = window.URL.createObjectURL(webmBlob);
				setWebmUrl(url);
				setWebm(webmBlob);
				chunks.current = [];
				if (streamRef.current) {
					streamRef.current.getTracks().forEach((track) => track.stop());
				}
				if (audioContextRef.current) {
					audioContextRef.current.close();
				}
			});
			
			recorder.current.start();
			setIsRecording(true);
			setRecordingTime(0);
			
			// Start timer
			timerRef.current = setInterval(() => {
				setRecordingTime(prev => prev + 1);
			}, 1000);
			
		} catch (error) {
			console.error("Error starting recording:", error);
		}
	};

	const stopRecording = () => {
		if (recorder.current) {
			recorder.current.stop();
			setIsRecording(false);
			setAudioLevel(0);
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		}
	};

	const sendRequest = async () => {
		if (isProcessing) return;
		setIsProcessing(true);
		if (!webm) return;
		
		try {
			const formdata = new FormData();
			formdata.append("audio", webm, "recording.webm");

			const response = await fetch("http://localhost:5000/transcribe", {
				method: "POST",
				body: formdata,
			});
			const body = await response.json();
			setTranscribedMsg(body.text);
			setTranscribeResult(body.text);
		} catch (error) {
			console.error("Error transcribing audio:", error);
		} finally {
			setIsProcessing(false);
		}
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	useEffect(() => {
		if (webm) sendRequest();
	}, [webm]);

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, []);

	const getButtonStyle = () => {
		if (isProcessing) {
			return "bg-yellow-500/20 border-yellow-500/40 text-yellow-400";
		}
		if (isRecording) {
			return "bg-red-500/20 border-red-500/40 text-red-400 animate-pulse";
		}
		return "bg-blue-500/20 border-blue-500/40 text-blue-400 hover:bg-blue-500/30";
	};

	const getButtonIcon = () => {
		if (isProcessing) return <NotepadText className="w-5 h-5" />;
		if (isRecording) return <Square className="w-5 h-5" />;
		return <Mic className="w-5 h-5" />;
	};

	return (
		<div className="w-full max-w-md mx-auto bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
			{/* Recording Button and Status */}
			<div className="flex items-center space-x-4">
				{/* Main Record Button */}
				<button
					disabled={isProcessing}
					onClick={() => {
						if (isRecording) stopRecording();
						else startRecording();
					}}
					className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${getButtonStyle()}`}
				>
					{getButtonIcon()}
					
					{/* Audio level indicator */}
					{isRecording && (
						<div className="absolute inset-0 rounded-full border-2 border-red-400 opacity-50"
							style={{
								transform: `scale(${1 + audioLevel / 100})`,
								transition: 'transform 0.1s ease-out'
							}}
						/>
					)}
				</button>

				{/* Status and Timer */}
				<div className="flex-1">
					<div className="flex items-center space-x-2">
						<div className="text-sm font-medium text-white">
							{isProcessing ? "Processing..." : isRecording ? "Recording" : "Ready"}
						</div>
						
						{isRecording && (
							<>
								<div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
								<div className="text-sm text-gray-400 font-mono">
									{formatTime(recordingTime)}
								</div>
							</>
						)}
					</div>
					
					{/* Audio level bars */}
					{isRecording && (
						<div className="flex items-center space-x-1 mt-2">
							<Volume2 className="w-3 h-3 text-gray-400" />
							<div className="flex space-x-1">
								{[...Array(20)].map((_, i) => (
									<div
										key={i}
										className={`w-1 h-3 rounded-full transition-all duration-100 ${
											i < (audioLevel / 10) ? 'bg-green-500' : 'bg-gray-600'
										}`}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Processing Indicator */}
			{isProcessing && (
				<div className="mt-4 flex items-center justify-center space-x-2 text-yellow-400">
					<div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" />
					<div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
					<div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
					<span className="text-sm ml-2">Transcribing audio...</span>
				</div>
			)}

			{/* Transcript Result */}
			{transcribeResult && (
				<div className="mt-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600/50">
					<div className="text-xs text-gray-400 mb-1">Transcription:</div>
					<div className="text-sm text-white">{transcribeResult}</div>
				</div>
			)}
		</div>
	);
};