"use client"
import { Music } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { AnimatedRecord } from './animatedSVG/AnimatedRecord';
import Processing from './animatedSVG/Processing';
import StillRecord from './animatedSVG/StillRecord';

export const VoiceRecorder = () => {
	const streamRef = useRef<MediaStream | null>(null);
	const recorder = useRef<MediaRecorder | null>(null);
	const chunks = useRef<Blob[]>([]);
	const [webm, setWebm] = useState<Blob | null>(null);
	const [webmUrl, setWebmUrl] = useState<string | null>(null);
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [transcribeResult, setTranscribeResult] = useState<string>("");
	const startRecording = async () => {
		if (isRecording) return;
		streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
		recorder.current = new MediaRecorder(streamRef.current);
		recorder.current.addEventListener("dataavailable",
			(event) => {
				console.log(event.data)
				chunks.current.push(event.data);
			}
		)
		recorder.current.addEventListener("stop",
			() => {
				let webmBlob = new Blob(chunks.current, { type: "audio/webm; codecs=opus" });
				let url = window.URL.createObjectURL(webmBlob);
				setWebmUrl(url);
				setWebm(webmBlob);

				// Clean up
				chunks.current = [];
				if (streamRef.current) {
					streamRef.current.getTracks().forEach(track => track.stop());
				}
			}
		)

		recorder.current.start();
		setIsRecording(true);
	}
	const stopRecording = () => {
		if (recorder.current) {
			recorder.current.stop();
			setIsRecording(false);
		}
	}
	const sendRequest = async () => {
		if (isProcessing) return;
		setIsProcessing(true);
		console.log("here")
		if (!webm) return;
		const formdata = new FormData();
		formdata.append("audio", webm, "recording.webm");
		console.log("sending msg")
		const response = await fetch("http://localhost:5000/transcribe", {
			method: "POST",
			body: formdata
		});
		const body = await response.json();
		console.log(body);
		setTranscribeResult(body.text);
		setIsProcessing(false);
	}
	useEffect(() => {
		if (webm)
			sendRequest();
	}, [webm])
	/*
	recorder.ondataavailable(e => {
		if (e.data.size > 0) chunks.push(e.data)
	})
	recorder.onstop(e => {
		const blob = new Blob(chunks, {
			type: 'audio/webm;'
		})
	})
	*/
	return (
		<div className='flex-auto'>
			<button className="border-red-100 size-10" disabled={isProcessing} onClick={
				() => {
					if (isRecording) {
						stopRecording();
					}
					else {
						startRecording();
					}
				}
			}
			>{
					(isRecording ? <AnimatedRecord></AnimatedRecord> : (isProcessing ? <Processing></Processing> : <StillRecord></StillRecord>))
				}</button>
			<div>
				result : {transcribeResult}
			</div>
		</div>
	)
}
