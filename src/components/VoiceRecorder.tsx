"use client";
import { CassetteTape, Mic, NotepadText } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type props = {
	setTranscribedMsg: Function
}

export const VoiceRecorder = ({ setTranscribedMsg }: props) => {
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
		});
		recorder.current.start();
		setIsRecording(true);
	};

	const stopRecording = () => {
		if (recorder.current) {
			recorder.current.stop();
			setIsRecording(false);
		}
	};

	const sendRequest = async () => {
		if (isProcessing) return;
		setIsProcessing(true);
		if (!webm) return;
		const formdata = new FormData();
		formdata.append("audio", webm, "recording.webm");

		const response = await fetch("http://localhost:5000/transcribe", {
			method: "POST",
			body: formdata,
		});
		const body = await response.json();
		setTranscribedMsg(body.text);
		setTranscribeResult(body.text);
		setIsProcessing(false);
	};

	useEffect(() => {
		if (webm) sendRequest();
	}, [webm]);

	return (
		<div className="voice-container">
			<button
				disabled={isProcessing}
				onClick={() => {
					if (isRecording) stopRecording();
					else startRecording();
				}}
			>
				{isProcessing ? <NotepadText></NotepadText> : isRecording ? <CassetteTape></CassetteTape> : <Mic></Mic>}
				<div className="mic-icon" />
			</button>
			<div className="transcript">Result: {transcribeResult}</div>
		</div>
	);
};
