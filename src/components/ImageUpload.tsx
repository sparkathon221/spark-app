"use client"
import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, FileImage, Loader2 } from 'lucide-react';

const ImageUpload = ({ onImageUpload, onImagesChange, maxFiles = 5, acceptedTypes = ['image/*'] }) => {
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
			const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
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

			// Callback to parent component
			if (onImagesChange) {
				onImagesChange(updatedImages);
			}

			// Individual upload callback
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
		<div className="w-full space-y-4">
			{/* Upload Area */}
			<div
				className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${dragActive
					? 'border-blue-500 bg-blue-50'
					: 'border-gray-300 hover:border-gray-400'
					} ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
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

				<div className="flex flex-col items-center space-y-3">
					{uploading ? (
						<Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
					) : (
						<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
							<Upload className="w-6 h-6 text-blue-600" />
						</div>
					)}

					<div>
						<p className="text-lg font-medium text-gray-900">
							{uploading ? 'Uploading...' : 'Upload Images'}
						</p>
						<p className="text-sm text-gray-500">
							Drag and drop images here, or{' '}
							<button
								onClick={openFileDialog}
								className="text-blue-600 hover:text-blue-700 underline"
								disabled={uploading}
							>
								browse
							</button>
						</p>
					</div>

					<div className="flex items-center space-x-4 text-xs text-gray-400">
						<span>Max {maxFiles} files</span>
						<span>•</span>
						<span>Up to 10MB each</span>
						<span>•</span>
						<span>JPG, PNG, GIF, WebP</span>
					</div>
				</div>
			</div>

			{/* Uploaded Images Preview */}
			{uploadedImages.length > 0 && (
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-medium text-gray-900">
							Uploaded Images ({uploadedImages.length})
						</h3>
						<button
							onClick={() => {
								setUploadedImages([]);
								if (onImagesChange) onImagesChange([]);
							}}
							className="text-xs text-gray-500 hover:text-gray-700"
						>
							Clear all
						</button>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{uploadedImages.map((image) => (
							<div key={image.id} className="relative group">
								<div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
									<img
										src={image.url}
										alt={image.name}
										className="w-full h-full object-cover"
									/>
								</div>

								{/* Remove button */}
								<button
									onClick={() => removeImage(image.id)}
									className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
								>
									<X className="w-3 h-3" />
								</button>

								{/* Image info */}
								<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
									<p className="truncate">{image.name}</p>
									<p className="text-gray-300">{formatFileSize(image.size)}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Quick Upload Button */}
			<div className="flex justify-center">
				<button
					onClick={openFileDialog}
					disabled={uploading || uploadedImages.length >= maxFiles}
					className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${uploading || uploadedImages.length >= maxFiles
						? 'bg-gray-100 text-gray-400 cursor-not-allowed'
						: 'bg-blue-600 text-white hover:bg-blue-700'
						}`}
				>
					<FileImage className="w-4 h-4" />
					<span>
						{uploading ? 'Uploading...' : 'Add More Images'}
					</span>
				</button>
			</div>
		</div>
	);
};

export default ImageUpload;
