"use client"
import React, { useState } from 'react';
import { ChevronLeft, Pin, X, Plus, MessageCircle, Star, FileText, Clock, Settings, Upload, Image, Languages, Mic, Send } from 'lucide-react';

const ChatInterface = () => {
	const [message, setMessage] = useState('');

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
		{ icon: FileText, label: "Chat Files", color: "bg-red-100 text-red-600" },
		{ icon: Image, label: "Images", color: "bg-orange-100 text-orange-600" },
		{ icon: Languages, label: "Translate", color: "bg-blue-100 text-blue-600" },
		{ icon: Mic, label: "Audio Chat", color: "bg-gray-100 text-gray-600" }
	];

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Sidebar */}
			<div className="w-80 bg-white border-r border-gray-200 flex flex-col">
				{/* Sidebar Header */}
				<div className="p-4 border-b border-gray-200">
					<div className="flex items-center justify-between mb-4">
						<ChevronLeft className="w-5 h-5 text-gray-600" />
						<h2 className="text-lg font-semibold text-gray-900">Chat Results</h2>
						<div className="w-5 h-5" />
					</div>
				</div>

				{/* Sidebar Navigation */}
				<div className="flex flex-col p-4 space-y-2">
					<button className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-600">
						<MessageCircle className="w-5 h-5" />
						<span className="font-medium">Chat</span>
					</button>
					<button className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50">
						<Star className="w-5 h-5" />
						<span>Favorites</span>
					</button>
					<button className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50">
						<FileText className="w-5 h-5" />
						<span>Documents</span>
					</button>
					<button className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50">
						<Clock className="w-5 h-5" />
						<span>Recent</span>
					</button>
				</div>

				{/* Chat History */}
				<div className="flex-1 overflow-y-auto p-4">
					<div className="space-y-6">
						<div>
							<h3 className="text-sm font-medium text-gray-500 mb-3">Today</h3>
							<div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-xl p-4 text-white relative overflow-hidden">
								<div className="flex items-center justify-between mb-2">
									<div className="flex items-center space-x-2">
										<Image className="w-4 h-4" />
										<span className="text-sm font-medium">Image Generation</span>
									</div>
									<Pin className="w-4 h-4" />
								</div>
								<p className="text-xs opacity-90 mb-3">Today • 16 October</p>
								<div className="flex space-x-2">
									<div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
										<div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full"></div>
									</div>
									<div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
										<div className="w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full"></div>
									</div>
									<div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
										<div className="w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full"></div>
									</div>
									<div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-xs">
										+3
									</div>
								</div>
								<div className="mt-3 p-2 bg-white/10 rounded-lg">
									<div className="flex items-center space-x-2">
										<Image className="w-3 h-3" />
										<span className="text-xs">Parrot images</span>
									</div>
									<p className="text-xs opacity-75 mt-1">Ara parrot, photorealistic, grey background</p>
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-sm font-medium text-gray-500 mb-3">Yesterday</h3>
							<div className="bg-gray-50 rounded-xl p-4">
								<div className="flex items-center justify-between mb-2">
									<div className="flex items-center space-x-2">
										<MessageCircle className="w-4 h-4 text-gray-600" />
										<span className="text-sm font-medium text-gray-900">AI Search</span>
									</div>
									<Pin className="w-4 h-4 text-gray-400" />
								</div>
								<p className="text-xs text-gray-500 mb-3">Yesterday • 15 October</p>
								<div className="space-y-2">
									<div className="flex items-center space-x-2">
										<MessageCircle className="w-3 h-3 text-gray-400" />
										<span className="text-sm text-gray-700">How to decrease CAC?</span>
									</div>
									<p className="text-xs text-gray-500 ml-5">Customer acquisition cost could be decr...</p>
									<div className="flex items-center space-x-2">
										<MessageCircle className="w-3 h-3 text-gray-400" />
										<span className="text-sm text-gray-700">How to increase LTV?</span>
									</div>
									<p className="text-xs text-gray-500 ml-5">Here are some ways to increased by m...</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Sidebar Footer */}
				<div className="p-4 border-t border-gray-200">
					<div className="flex items-center space-x-3">
						<div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
							<span className="text-sm font-medium text-orange-600">M</span>
						</div>
						<div className="flex-1">
							<p className="text-sm font-medium text-gray-900">Marry</p>
						</div>
						<Settings className="w-5 h-5 text-gray-400" />
					</div>
				</div>
			</div>

			{/* Main Chat Area */}
			<div className="flex-1 flex flex-col">
				{/* Chat Header */}
				<div className="bg-white border-b border-gray-200 p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<Pin className="w-5 h-5 text-gray-400" />
							<h1 className="text-xl font-semibold text-gray-900">New Chat</h1>
						</div>
						<X className="w-5 h-5 text-gray-400 cursor-pointer" />
					</div>
				</div>

				{/* Chat Messages */}
				<div className="flex-1 overflow-y-auto p-6 space-y-6">
					{/* AI Message */}
					<div className="flex space-x-3">
						<div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
							<span className="text-sm font-medium text-orange-600">AI</span>
						</div>
						<div className="flex-1">
							<div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
								<p className="text-gray-900 mb-3">
									Hi, Marry!<br />
									How can I help you?
								</p>
							</div>
						</div>
					</div>

					{/* Document Summary */}
					<div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
						<div className="flex items-start space-x-3">
							<FileText className="w-5 h-5 text-blue-600 mt-0.5" />
							<div className="flex-1">
								<p className="text-sm text-gray-700 mb-3">
									Imagine that you are <span className="font-medium">the manager</span> and
									make me the list of <span className="font-medium">summary points</span> of
									this documents
								</p>
								<div className="bg-white rounded-lg p-3 border border-gray-200">
									<div className="flex items-center space-x-2 mb-2">
										<FileText className="w-4 h-4 text-gray-400" />
										<span className="text-sm text-gray-600">Document preview</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* AI Response with Summary */}
					<div className="flex space-x-3">
						<div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
							<span className="text-sm font-medium text-orange-600">AI</span>
						</div>
						<div className="flex-1">
							<div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
								<div className="space-y-3">
									{summaryPoints.map((point, index) => (
										<div key={index} className="flex space-x-3">
											<span className="text-sm font-medium text-gray-900 mt-0.5">{index + 1}.</span>
											<div>
												<span className="font-medium text-gray-900">{point.title}</span>
												<span className="text-gray-700"> {point.content}</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="p-6 bg-white border-t border-gray-200">
					<div className="grid grid-cols-4 gap-4 mb-6">
						{quickActions.map((action, index) => (
							<button
								key={index}
								className={`${action.color} rounded-lg p-4 flex flex-col items-center space-y-2 hover:opacity-80 transition-opacity`}
							>
								<action.icon className="w-6 h-6" />
								<span className="text-sm font-medium">{action.label}</span>
							</button>
						))}
					</div>

					{/* Message Input */}
					<div className="relative">
						<input
							type="text"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Ask me anything..."
							className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600">
							<Send className="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatInterface;
