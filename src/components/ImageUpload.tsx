"use client"
import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, FileImage, Loader2, Plus } from 'lucide-react';

const ImageUpload = ({ onImageUpload, onImagesChange, maxFiles = 1, maxFileSizeInMB = 10, acceptedTypes = ['image/*'] }) => {
	const [uploadedImages, setUploadedImages] = useState([]);
	const [dragActive, setDragActive] = useState(false);
	const [uploading, setUploading] = useState(false);
	const fileInputRef = useRef(null);

	const handleFiles = async (files) => {
		const fileArray = Array.from(files);
		const validFiles = fileArray.filter(file => {
			const isValidType = acceptedTypes.some(type => {
				if (type === 'image/*') {
					return file.type.startsWith('image/');
				}
				return file.type === type;
			});
			const isValidSize = file.size <= maxFileSizeInMB * 1024 * 1024;
			return isValidType && isValidSize;
		});

		if (validFiles.length === 0) {
			alert('Please select valid image files (max 10MB each)');
			return;
		}

		if (uploadedImages.length + validFiles.length > maxFiles) {
			alert(`You can only upload up to ${maxFiles} images`);
			return;
		}

		setUploading(true);

		try {
			const newImages = await Promise.all(
				validFiles.map(async (file) => {
					return new Promise((resolve) => {
						const reader = new FileReader();
						reader.onload = (e) => {
							resolve({
								id: Date.now() + Math.random(),
								file: file,
								url: e.target.result,
								name: file.name,
								size: file.size,
								type: file.type
							});
						};
						reader.readAsDataURL(file);
					});
				})
			);

			const updatedImages = [...uploadedImages, ...newImages];
			setUploadedImages(updatedImages);

			if (onImagesChange) {
				onImagesChange(updatedImages);
			}

			if (onImageUpload) {
				newImages.forEach(image => onImageUpload(image));
			}
		} catch (error) {
			console.error('Error uploading images:', error);
			alert('Error uploading images. Please try again.');
		} finally {
			setUploading(false);
		}
	};

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFiles(e.dataTransfer.files);
		}
	};

	const handleFileInput = (e) => {
		if (e.target.files) {
			handleFiles(e.target.files);
		}
	};

	const removeImage = (imageId) => {
		const updatedImages = uploadedImages.filter(img => img.id !== imageId);
		setUploadedImages(updatedImages);

		if (onImagesChange) {
			onImagesChange(updatedImages);
		}
	};

	const formatFileSize = (bytes) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const openFileDialog = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className="w-full max-w-4xl mx-auto">
			{/* Upload Area */}
			<div
				className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 ease-in-out ${
					dragActive
						? 'border-blue-400 bg-blue-50/10 scale-[1.01]'
						: 'border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50'
				} ${uploading ? 'opacity-60 pointer-events-none' : ''} backdrop-blur-sm`}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
			>
				<input
					ref={fileInputRef}
					type="file"
					multiple
					accept={acceptedTypes.join(',')}
					onChange={handleFileInput}
					className="hidden"
				/>

				<div className="flex items-center justify-center space-x-8">
					{/* Upload Icon */}
					<div className="flex-shrink-0">
						{uploading ? (
							<div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
								<Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
							</div>
						) : (
							<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300">
								<Upload className="w-6 h-6 text-white" />
							</div>
						)}
					</div>

					{/* Text Content */}
					<div className="flex-1 text-left">
						<h3 className="text-lg font-semibold text-white mb-1">
							{uploading ? 'Uploading Images...' : 'Upload Images'}
						</h3>
						<p className="text-gray-400 text-sm mb-3">
							Drag and drop your images here, or{' '}
							<button
								onClick={openFileDialog}
								className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors"
								disabled={uploading}
							>
								browse files
							</button>
						</p>
						<div className="flex items-center space-x-4 text-xs text-gray-500">
							<div className="flex items-center space-x-1">
								<FileImage className="w-3 h-3" />
								<span>Max {maxFiles} files</span>
							</div>
							<div className="w-1 h-1 bg-gray-600 rounded-full"></div>
							<span>Up to {maxFileSizeInMB}MB each</span>
							<div className="w-1 h-1 bg-gray-600 rounded-full"></div>
							<span>JPG, PNG, GIF, WebP</span>
						</div>
					</div>

					{/* Browse Button */}
					<div className="flex-shrink-0">
						<button
							onClick={openFileDialog}
							disabled={uploading}
							className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
								uploading
									? 'bg-gray-700 text-gray-400 cursor-not-allowed'
									: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/20'
							}`}
						>
							<Plus className="w-4 h-4" />
							<span>Browse</span>
						</button>
					</div>
				</div>
			</div>

			{/* Uploaded Images Preview */}
			{uploadedImages.length > 0 && (
				<div className="mt-4 space-y-3">
					<div className="flex items-center justify-between">
						<h4 className="text-sm font-medium text-gray-300">
							Uploaded Images ({uploadedImages.length})
						</h4>
						<button
							onClick={() => {
								setUploadedImages([]);
								if (onImagesChange) onImagesChange([]);
							}}
							className="text-xs text-gray-500 hover:text-red-400 transition-colors"
						>
							Clear all
						</button>
					</div>

					<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
						{uploadedImages.map((image) => (
							<div key={image.id} className="relative group">
								<div className="aspect-square bg-gray-800 rounded-xl overflow-hidden ring-1 ring-gray-700 hover:ring-gray-600 transition-all duration-200">
									<img
										src={image.url}
										alt={image.name}
										className="w-full h-full object-cover"
									/>
								</div>

								{/* Remove button */}
								<button
									onClick={() => removeImage(image.id)}
									className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:scale-110"
								>
									<X className="w-4 h-4" />
								</button>

								{/* Image info overlay */}
								<div className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end">
									<div className="p-3 w-full">
										<p className="text-white text-xs font-medium truncate">{image.name}</p>
										<p className="text-gray-300 text-xs">{formatFileSize(image.size)}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Add More Button */}
			{uploadedImages.length > 0 && uploadedImages.length < maxFiles && (
				<div className="mt-4 flex justify-center">
					<button
						onClick={openFileDialog}
						disabled={uploading}
						className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
							uploading
								? 'bg-gray-700 text-gray-400 cursor-not-allowed'
								: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/20 hover:scale-105'
						}`}
					>
						<Plus className="w-4 h-4" />
						<span>Add More Images</span>
					</button>
				</div>
			)}
		</div>
	);
};

export default ImageUpload;