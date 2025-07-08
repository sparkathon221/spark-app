"use client"
import React, { useState } from 'react';
import { ChevronLeft, Pin, X, Plus, MessageCircle, Star, FileText, Clock, Settings, Upload, Image, Languages, Mic, Send, Paperclip } from 'lucide-react';
import ImageUpload from './ImageUpload';
import SpeechToText from './SpeechToText';

const ChatInterface = () => {
	const [message, setMessage] = useState('');
	const [showImageUpload, setShowImageUpload] = useState(false);
	const [showSpeechToText, setShowSpeechToText] = useState(false);
	const [uploadedImages, setUploadedImages] = useState([]);
	const [chatImages, setChatImages] = useState([]);
	const [isRecording, setIsRecording] = useState(false);

	const chatHistory = [
		{
			id: 1,
			title: "Image Generation",
			date: "Today • 16 October",
			type: "image",
			preview: "Parrot images"
		},
		{
			id: 2,
			title: "AI Search",
			date: "Yesterday • 15 October",
			type: "search",
			queries: [
				"How to decrease CAC?",
				"How to increase LTV?"
			]
		}
	];

	const summaryPoints = [
		{
			title: "Resilient Tourism:",
			content: "Despite the pandemic's impact, international tourism rebounded significantly in 2022, showing the industry's resilience."
		},
		{
			title: "Growth Predictions:",
			content: "Forecasts suggest that travel and tourism GDP will grow of 5.8% annually between 2022 and 2032, enhancing overall economic growth."
		}
	];

	const quickActions = [
		{
			icon: FileText,
			label: "Chat Files",
			color: "bg-red-100 text-red-600",
			onClick: () => console.log('Chat Files clicked')
		},
		{
			icon: Image,
			label: "Images",
			color: "bg-orange-100 text-orange-600",
			onClick: () => {
				setShowImageUpload(!showImageUpload);
				setShowSpeechToText(false);
			}
		},
		{
			icon: Languages,
			label: "Translate",
			color: "bg-blue-100 text-blue-600",
			onClick: () => console.log('Translate clicked')
		},
		{
			icon: Mic,
			label: "Audio Chat",
			color: "bg-gray-100 text-gray-600",
			onClick: () => {
				setShowSpeechToText(!showSpeechToText);
				setShowImageUpload(false);
			}
		}
	];

	const handleImageUpload = (image) => {
		console.log('Image uploaded:', image);
		// Add image to chat context
		setChatImages(prev => [...prev, image]);
	};

	const handleImagesChange = (images) => {
		setUploadedImages(images);
	};

	const handleTranscriptionChange = (transcription) => {
		setMessage(transcription);
	};

	const handleSpeechStart = () => {
		setIsRecording(true);
		console.log('Speech recording started');
	};

	const handleSpeechEnd = () => {
		setIsRecording(false);
		console.log('Speech recording ended');
	};

	const handleSpeechError = (error) => {
		setIsRecording(false);
		console.error('Speech recognition error:', error);
	};

	const handleSendMessage = () => {
		if (message.trim() || uploadedImages.length > 0) {
			// Here you would typically send the message and images to your backend
			console.log('Sending message:', message);
			console.log('With images:', uploadedImages);

			// Reset form
			setMessage('');
			setUploadedImages([]);
			setShowImageUpload(false);
			setShowSpeechToText(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
  );
};

export default ChatInterface;
