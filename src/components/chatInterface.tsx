"use client"
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
	Send,
	Menu,
	X,
	User,
	Bot,
	ExternalLink,
	ShoppingCart,
	Heart,
	Star,
	Sun,
	Moon,
	Plus,
	MessageCircle,
	Sidebar
} from 'lucide-react';
import {
	FileText,
	Image,
	Languages,
	Mic
} from 'lucide-react';
import ProfilePage from '@/components/ProfilePage';
import IProduct from '@/types/products';
import IChatMessage from '@/types/message';


const products: IProduct[] = [
	{
		product_id: "P1001",
		name: "boAt Rockerz 450 Bluetooth Headphones",
		image: "https://m.media-amazon.com/images/I/61u48FEs3WL._SL1500_.jpg",
		link: "https://www.amazon.in/dp/B08GZBFZQW",
		ratings: "4.2",
		no_of_ratings: "58,000",
		discount_price: "₹1,499",
		actual_price: "₹3,990",
		main_category: "Electronics",
		sub_category: "Headphones"
	},
	{
		product_id: "P1002",
		name: "Fastrack Reflex Beat+ Smartwatch",
		image: "https://m.media-amazon.com/images/I/61IMRs+o0iL._SL1500_.jpg",
		link: "https://www.amazon.in/dp/B0B7YD1DH4",
		ratings: "4.1",
		no_of_ratings: "12,500",
		discount_price: "₹1,299",
		actual_price: "₹2,995",
		main_category: "Electronics",
		sub_category: "Wearables"
	},
	{
		product_id: "P1003",
		name: "MI Portable Bluetooth Speaker",
		image: "https://m.media-amazon.com/images/I/71gmxT3uOVL._SL1500_.jpg",
		link: "https://www.amazon.in/dp/B08PBW4R62",
		ratings: "4.3",
		no_of_ratings: "10,200",
		discount_price: "₹1,999",
		actual_price: "₹2,999",
		main_category: "Electronics",
		sub_category: "Speakers"
	},
	{
		product_id: "P1004",
		name: "Wildcraft 44 Ltrs Casual Backpack",
		image: "https://m.media-amazon.com/images/I/91RX2PZ1SFL._SL1500_.jpg",
		link: "https://www.amazon.in/dp/B07W4T7T7Y",
		ratings: "4.5",
		no_of_ratings: "8,100",
		discount_price: "₹1,699",
		actual_price: "₹3,299",
		main_category: "Fashion",
		sub_category: "Bags"
	},
	{
		product_id: "P1005",
		name: "Nike Revolution 6 Running Shoes",
		image: "https://m.media-amazon.com/images/I/71Jkef3cv1L._SL1500_.jpg",
		link: "https://www.amazon.in/dp/B097CR8N1H",
		ratings: "4.4",
		no_of_ratings: "2,300",
		discount_price: "₹3,295",
		actual_price: "₹4,995",
		main_category: "Fashion",
		sub_category: "Footwear"
	}
];

const ChatInput = (props: { inputText: string, setInputText: Function, handleSendMessage: Function }) => {
	const { inputText, setInputText, handleSendMessage } = props;
	return (
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
	)
}


const ProdSideBar = (props: { sidebarOpen: boolean, handleNewChat: Function }) => {
	const { sidebarOpen, handleNewChat } = props;
	const renderStars = (rating: number) => {
		return (
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
	};
	const handleProductClick = (product: Product) => {
		window.open(product.link, '_blank');
	};
	return (
		<div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden`}>
			<div className="p-4 border-b border-gray-200 dark:border-gray-700">
				<div className="flex items-center justify-between">
					<ShoppingCart className="w-5 h-5 text-blue-600" />
					<button
						onClick={handleNewChat}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 hover:shadow-sm group"
						title="Start new chat"
					>
						<Plus className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors group-hover:rotate-90 duration-200" />
					</button>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{products.map((product) => (
					<div
						key={product.product_id}
						onClick={() => handleProductClick(product)}
						className="group cursor-pointer bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-3 neon-hover"
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
								<ExternalLink className="w-3 h-3 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
							</div>

							<h3 className="font-medium text-gray-800 dark:text-gray-100 mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
								{product.name}
							</h3>

							{renderStars(parseFloat(product.ratings))}

							<div className="flex items-center justify-between mt-2">
								<span className="text-lg font-bold text-gray-900 dark:text-gray-50">{product.actual_price}</span>
								<button className="text-xs bg-blue-600 dark:bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
									View
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)

}
const ChatHeader = (props: { currentPage: string, setCurrentPage: Function, sidebarOpen: boolean, setSidebarOpen: Function, isDarkMode: boolean, toggleDarkMode: Function }) => {
	const { setSidebarOpen, sidebarOpen, isDarkMode, toggleDarkMode, currentPage, setCurrentPage } = props;
	return (
		<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<button
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm"
					title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
				>
					{sidebarOpen ? (
						<X className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
					) : (
						<Menu className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
					)}
				</button>
				{!sidebarOpen && (
					<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
						<ShoppingCart className="w-4 h-4" />
					</div>
				)}
				<h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
					{currentPage === 'chat' ? 'New Chat' : 'Profile'}
				</h1>
			</div>

			<div className="flex items-center gap-2">
				<button
					onClick={() => setCurrentPage(currentPage === 'chat' ? 'profile' : 'chat')}
					className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
					title={currentPage === 'chat' ? "View Profile" : "Back to Chat"}
				>
					{currentPage === 'chat' ? (
						<User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
					) : (
						<MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
					)}
				</button>
				<button
					onClick={toggleDarkMode}
					className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
					title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
				>
					{isDarkMode ? (
						<Sun className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
					) : (
						<Moon className="w-5 h-5 text-gray-600" />
					)}
				</button>
				<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
					<Bot className="w-5 h-5 text-white" />
				</div>
			</div>
		</header>
	)
}
function ChatInterface() {
	const [image, setImage] = useState<Blob | null>(null);
	const [text, setText] = useState<string>("");
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [currentPage, setCurrentPage] = useState<'chat' | 'profile'>('chat');
	const [messages, setMessages] = useState<IChatMessage[]>([
		{
			id: '1',
			text: 'Hello! I\'m here to help you find the perfect products. What are you looking for today?',
			sender: 'bot',
			timestamp: new Date()
		}
	]);
	const [inputText, setInputText] = useState('');
	const onImageUpload = async (Image) => {
		console.log(Image);
		setImage(Image.file);
	};

	const onImagesChange = async (Image) => {
		setImage(null);
	};

	const sendChat = async () => {
		if (!image) return;

		const formData = new FormData();
		formData.append("image", image, "image.png");
		formData.append("text", text);

		await fetch("/api/upload", {
			method: "POST",
			body: formData,
		});
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
		setInputText('');
	};
	const handleFeatureClick = (feature: string) => {
		const featureMessages = {
			'Chat Files': 'File sharing feature activated! You can now upload and share documents in our conversation.',
			'Images': 'Image feature activated! You can now share and analyze images with me.',
			'Translate': 'Translation feature activated! I can help translate text between different languages.',
			'Audio Chat': 'Audio chat feature activated! Voice communication is now available.'
		};

		const botResponse: IChatMessage = {
			id: Date.now().toString(),
			text: featureMessages[feature as keyof typeof featureMessages],
			sender: 'bot',
			timestamp: new Date()
		};
		setMessages(prev => [...prev, botResponse]);
	};

	// Apply dark mode to document
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	const toggleDarkMode = () => {
		setIsDarkMode(prevMode => !prevMode);
	};

	const handleSendMessage = () => {
		if (inputText.trim()) {
			const newMessage: Message = {
				id: Date.now().toString(),
				text: inputText,
				sender: 'user',
				timestamp: new Date()
			};

			setMessages(prev => [...prev, newMessage]);
			setInputText('');

			// Simulate bot response
			setTimeout(() => {
				const botResponse: IChatMessage = {
					id: (Date.now() + 1).toString(),
					text: 'I\'d be happy to help you with that! Based on your interest, I\'ve updated the product recommendations in the sidebar. Check out those amazing deals!',
					sender: 'bot',
					timestamp: new Date()
				};
				setMessages(prev => [...prev, botResponse]);
			}, 1000);
		}
	};



	return (
		<div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
			{/* Sidebar */}

			<ProdSideBar handleNewChat={handleNewChat} sidebarOpen={sidebarOpen}></ProdSideBar>
			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				{/* Header */}
				<ChatHeader currentPage={currentPage} setCurrentPage={setCurrentPage} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}></ChatHeader>

				{/* Content Area */}
				<div className="flex-1 overflow-y-auto">
					{currentPage === 'chat' ? (
						<>
							{/* Messages */}
							<div className="p-4 space-y-4">
								{messages.map((message) => (
									<div
										key={message.id}
										className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
									>
										{message.sender === 'bot' && (
											<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
												<Bot className="w-5 h-5 text-white" />
											</div>
										)}

										<div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${message.sender === 'user'
											? 'bg-blue-600 text-white'
											: 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100'
											} rounded-lg p-3 shadow-sm`}>
											<p className="text-sm leading-relaxed">{message.text}</p>
											<p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
												}`}>
												{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
											</p>
										</div>

										{message.sender === 'user' && (
											<div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
												<User className="w-5 h-5 text-white" />
											</div>
										)}
									</div>
								))}
							</div>
						</>
					) : (
						<ProfilePage isDarkMode={isDarkMode} />
					)}
				</div>

				{/* Feature Buttons and Input - Only show on chat page */}
				{currentPage === 'chat' && (
					<>
						{/* Feature Buttons */}
						<div className="flex justify-center bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
							<div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
								<button
									onClick={() => handleFeatureClick('Chat Files')}
									className="flex flex-col items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 group"
								>
									<FileText className="w-5 h-5 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
									<span className="text-xs font-medium text-red-700 dark:text-red-300">Chat Files</span>
								</button>

								<button
									onClick={() => handleFeatureClick('Images')}
									className="flex flex-col items-center gap-2 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-200 group"
								>
									<Image className="w-5 h-5 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" />
									<span className="text-xs font-medium text-orange-700 dark:text-orange-300">Images</span>
								</button>


								<button
									onClick={() => handleFeatureClick('Audio Chat')}
									className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 group"
								>
									<Mic className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform" />
									<span className="text-xs font-medium text-gray-700 dark:text-gray-300">Audio Chat</span>
								</button>
							</div>
						</div>

						{/* Input */}
						<ChatInput setInputText={setInputText} inputText={inputText} handleSendMessage={handleSendMessage} ></ChatInput>
					</>
				)}
			</div>
		</div>
	);
}

export default ChatInterface;
