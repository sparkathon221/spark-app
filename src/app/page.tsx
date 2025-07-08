"use client";
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
  Plus
} from 'lucide-react';
import { 
  FileText, 
  Image, 
  Languages, 
  Mic 
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  rating: number;
  link: string;
  category: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: '$149.99',
    rating: 4.8,
    link: 'https://example.com/headphones',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: '$299.99',
    rating: 4.6,
    link: 'https://example.com/smartwatch',
    category: 'Wearables'
  },
  {
    id: '3',
    name: 'Coffee Maker',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: '$89.99',
    rating: 4.9,
    link: 'https://example.com/coffee-maker',
    category: 'Kitchen'
  },
  {
    id: '4',
    name: 'Desk Lamp',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: '$45.99',
    rating: 4.5,
    link: 'https://example.com/desk-lamp',
    category: 'Home'
  },
  {
    id: '5',
    name: 'Backpack',
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: '$79.99',
    rating: 4.7,
    link: 'https://example.com/backpack',
    category: 'Fashion'
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: '$119.99',
    rating: 4.4,
    link: 'https://example.com/speaker',
    category: 'Audio'
  }
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you find the perfect products. What are you looking for today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

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
    
    const botResponse: Message = {
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
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I\'d be happy to help you with that! Based on your interest, I\'ve updated the product recommendations in the sidebar. Check out those amazing deals!',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleProductClick = (product: Product) => {
    window.open(product.link, '_blank');
  };

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

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
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
              key={product.id}
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
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{product.category}</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
                
                <h3 className="font-medium text-gray-800 dark:text-gray-100 mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                
                {renderStars(product.rating)}
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-50">{product.price}</span>
                  <button className="text-xs bg-blue-600 dark:bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
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
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">New Chat</h1>
          </div>
          
          <div className="flex items-center gap-2">
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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
              
              <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100'
              } rounded-lg p-3 shadow-sm`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
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

        {/* Feature Buttons */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
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
              onClick={() => handleFeatureClick('Translate')}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 group"
            >
              <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Translate</span>
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
      </div>
    </div>
  );
}

export default App;