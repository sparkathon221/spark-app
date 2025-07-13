"use client";
import ImageUpload from '@/components/ImageUpload';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { useEffect, useState } from 'react';

function App() {
	const [image, setImage] = useState<Blob | null>(null);
	const [text, setText] = useState<string>("");
	const onImageUpload = (async (Image) => {
		console.log(Image)
		setImage(Image.file);
	})
	const sendChat = async () => {
		const reader = new FileReader();
		reader.onloadend = () => {
			fetch("/api/upload", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					image: reader.result,
					text: text
				}),
			});
		};
		reader.readAsDataURL(image);
	}
	const onImagesChange = (async (Image) => {
		setImage(null);
	})
	return (
		<div>
			<ImageUpload onImageUpload={onImageUpload} onImagesChange={onImagesChange}></ImageUpload>
			<VoiceRecorder setTranscribedMsg={setText}></VoiceRecorder>
			<button onClick={sendChat}>send</button>
		</div>
	);
}

export default App;
