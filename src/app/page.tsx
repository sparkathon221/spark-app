"use client";
import React, { useState, useEffect } from 'react';
import {
	Send, Menu, X, User, Bot, ExternalLink, ShoppingCart,
	Heart, Star, Sun, Moon, Plus, MessageCircle
} from 'lucide-react';
import ProfilePage from '@/components/ProfilePage';
import IProduct from '@/types/products';
import IChatMessage from '@/types/message';
import ImageUpload from '@/components/ImageUpload';
import { VoiceRecorder } from '@/components/VoiceRecorder';

const ChatInput = ({ inputText, setInputText, handleSendMessage }) => (
	<div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
		<div className="flex gap-2">
			<input
				type="text"
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
				placeholder="Ask about products, get recommendations..."
				className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
			/>
			<button
				onClick={handleSendMessage}
				disabled={!inputText.trim()}
				className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			>
				<Send className="w-5 h-5" />
			</button>
		</div>
	</div>
);

const ChatHeader = ({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen, isDarkMode, toggleDarkMode }) => (
	<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
		<div className="flex items-center gap-3">
			<button
				onClick={() => setSidebarOpen(!sidebarOpen)}
				className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm"
				title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
			>
				{sidebarOpen ? (
					<X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
				) : (
					<Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
				)}
			</button>
			<h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
				{currentPage === 'chat' ? 'New Chat' : 'Profile'}
			</h1>
		</div>

		<div className="flex items-center gap-2">
			<button
				onClick={() => setCurrentPage(currentPage === 'chat' ? 'profile' : 'chat')}
				className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
				title={currentPage === 'chat' ? "View Profile" : "Back to Chat"}
			>
				{currentPage === 'chat' ? <User className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
			</button>
			<button
				onClick={toggleDarkMode}
				className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
			>
				{isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
			</button>
			<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
				<Bot className="w-5 h-5 text-white" />
			</div>
		</div>
	</header>
);

const ProdSideBar = ({ products, sidebarOpen, handleNewChat }) => {
	const handleProductClick = (product: IProduct) => {
		window.open(product.link, '_blank');
	};
	const renderStars = (rating: number) => (
		<div className="flex items-center gap-1">
			{[...Array(5)].map((_, i) => (
				<Star
					key={i}
					className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
				/>
			))}
			<span className="text-xs text-gray-600 dark:text-gray-400 ml-1">{rating}</span>
		</div>
	);
	return (
		<div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden`}>
			<div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between">
				<ShoppingCart className="w-5 h-5 text-blue-600" />
				<button
					onClick={handleNewChat}
					className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500"
				>
					<Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
				</button>
			</div>
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{products.map((product) => (
					<div
						key={product.product_id}
						onClick={() => handleProductClick(product)}
						className="group cursor-pointer bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-3"
					>
						<div className="relative">
							<img
								src={product.image}
								alt={product.name}
								className="w-full h-32 object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
							/>
							<div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 rounded-full p-1">
								<Heart className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors" />
							</div>
						</div>
						<div className="mt-3">
							<div className="flex items-center justify-between">
								<span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{product.main_category}</span>
								<ExternalLink className="w-3 h-3 text-gray-400 dark:text-gray-500" />
							</div>
							<h3 className="font-medium text-gray-800 dark:text-gray-100 mt-1">{product.name}</h3>
							{renderStars(parseFloat(product.ratings))}
							<div className="flex items-center justify-between mt-2">
								<span className="text-lg font-bold text-gray-900 dark:text-white">{product.actual_price}</span>
								<button className="text-xs bg-blue-600 dark:bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
									View
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

function ChatInterface() {
	const [image, setImage] = useState<Blob | null>(null);
	const [text, setText] = useState('');
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [currentPage, setCurrentPage] = useState<'chat' | 'profile'>('chat');
	const [products, setProducts] = useState<IProduct[]>([]);
	const [messages, setMessages] = useState<IChatMessage[]>([
		{
			id: '1',
			text: 'Hello! I\'m here to help you find the perfect products. What are you looking for today?',
			sender: 'bot',
			timestamp: new Date()
		}
	]);

	const onImageUpload = async (Image) => {
		setImage(Image.file);
	};
	const onImagesChange = async () => setImage(null);

	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDarkMode);
	}, [isDarkMode]);

	const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

	const handleSendMessage = async () => {
		if (!text.trim() && !image) return;

		const formData = new FormData();
		if (image) formData.append("image", image, "image.png");
		formData.append("prompt", text);
		formData.append("top_k", "3");

		const response = await fetch("http://localhost:8000/recommend", {
			method: "POST",
			body: formData
		});
		const result = await response.json();

		const topProducts = result.recommendations?.slice(0, 3) || [];

		const userRequest: IChatMessage = {
			id: Date.now().toString() + '_user',
			text: text,
			sender: 'user',
			timestamp: new Date()
		};
		const botResponse: IChatMessage = {
			id: Date.now().toString() + '_bot',
			text: result.response,
			sender: 'bot',
			timestamp: new Date(),
			products: topProducts
		};

		setMessages(prev => [...prev, userRequest, botResponse]);
		setProducts(result.recommendations);
		setText('');
		setImage(null);
	};

	const handleNewChat = () => {
		setMessages([
			{
				id: '1',
				text: 'Hello! I\'m here to help you find the perfect products. What are you looking for today?',
				sender: 'bot',
				timestamp: new Date()
			}
		]);
		setText('');
	};

	return (
		<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
			<ProdSideBar products={products} sidebarOpen={sidebarOpen} handleNewChat={handleNewChat} />
			<div className="flex-1 flex flex-col">
				<ChatHeader
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
					isDarkMode={isDarkMode}
					toggleDarkMode={toggleDarkMode}
				/>

				<div className="flex-1 overflow-y-auto p-4 space-y-4">
					{currentPage === 'chat' ? (
						messages.map((message) => (
							<div
								key={message.id}
								className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
							>
								{message.sender === 'bot' && (
									<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
										<Bot className="w-5 h-5 text-white" />
									</div>
								)}
								<div className={`max-w-xl ${message.sender === 'user'
									? 'bg-blue-600 text-white'
									: 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white'
									} rounded-lg p-3 shadow-sm`}>
									<p className="text-sm">{message.text}</p>
									<p className="text-xs mt-1 text-right">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
									{/* Product Carousel */}
									{message.products?.length > 0 && (
										<div className="mt-3 flex overflow-x-auto gap-3">
											{message.products.map((product) => (
												<a
													key={product.product_id}
													href={product.link}
													target="_blank"
													rel="noopener noreferrer"
													className="min-w-[150px] bg-white dark:bg-gray-800 border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
												>
													<img src={product.image} alt={product.name} className="h-24 w-full object-cover" />
													<div className="p-2">
														<p className="text-xs font-semibold truncate text-gray-800 dark:text-white">{product.name}</p>
														<p className="text-xs text-blue-600 dark:text-blue-400">{product.discount_price}</p>
													</div>
												</a>
											))}
										</div>
									)}
								</div>
								{message.sender === 'user' && (
									<div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
										<User className="w-5 h-5 text-white" />
									</div>
								)}
							</div>
						))
					) : (
						<ProfilePage isDarkMode={isDarkMode} />
					)}
				</div>

				{currentPage === 'chat' && (
					<>
						<div className="flex justify-center bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
							<ImageUpload onImageUpload={onImageUpload} onImagesChange={onImagesChange} />
							<VoiceRecorder setTranscribedMsg={setText} />
						</div>
						<ChatInput setInputText={setText} inputText={text} handleSendMessage={handleSendMessage} />
					</>
				)}
			</div>
		</div>
	);
}

export default ChatInterface;
