"use client";

import React, { useState } from 'react';
import {
    Star,
    ShoppingCart,
    Heart,
    Share2,
    ChevronLeft,
    ChevronRight,
    Plus,
    Minus
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';

interface ProductImage {
    id: number;
    url: string;
    alt: string;
}

interface Review {
    id: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

interface RelatedProduct {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface ProductPageProps {
    product: {
        id: number;
        name: string;
        price: number;
        rating: number;
        shortDescription: string;
        longDescription: string;
        specifications: string[];
        colors: string[];
        sizes: string[];
        images: ProductImage[];
        reviews: Review[];
        relatedProducts: RelatedProduct[];
    };
}

export const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    const [mainImage, setMainImage] = useState(product.images[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        console.log('Added to cart:', {
            ...product,
            selectedColor,
            selectedSize,
            quantity
        });
        // Implement actual cart addition logic here
    };

    const handleAddToWishlist = () => {
        console.log('Added to wishlist:', product.id);
        // Implement actual wishlist addition logic here
    };

    // Implament copy link to clipboard here

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div>
                    <div className="w-full h-[550px] mb-4">
                        <img src={mainImage.url} alt={mainImage.alt} className="object-cover w-full h-full rounded-lg" />
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {product.images.map((image) => (
                            <img
                                key={image.id}
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-24 cursor-pointer rounded-md hover:opacity-75 transition object-cover"
                                onClick={() => setMainImage(image)}
                            />
                        ))}
                    </div>
                </div>


                {/* Product Info */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <div className="flex items-center mb-4">
                        <div className="flex items-center mr-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">
                            ({product.reviews.length} reviews)
                        </span>
                    </div>
                    <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
                    <p className="text-gray-600 mb-6">{product.shortDescription}</p>

                    {/* Color Selection */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                        <div className="flex space-x-2">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${selectedColor === color ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                                        }`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                        <Select onValueChange={(value) => setSelectedSize(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a size" />
                            </SelectTrigger>
                            <SelectContent>
                                {product.sizes.map((size) => (
                                    <SelectItem key={size} value={size}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-2 border rounded-l-md"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-16 text-center border-t border-b"
                        />
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-2 border rounded-r-md"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Add to Cart and Wishlist */}
                    <div className="flex space-x-4 mb-6">
                        <Button onClick={handleAddToCart} className="flex-1">
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add to Cart
                        </Button>
                        <Button variant="outline" onClick={handleAddToWishlist}>
                            <Heart className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Social Sharing */}
                    <div className="flex space-x-4 mb-6">
                        <Button variant="outline" size="icon">
                            <Share2 className="w-5 h-5" />
                        </Button>
                        {/* Add more social sharing buttons here */}
                    </div>

                    {/* Delivery Info */}
                    <div className="text-sm text-gray-600/70 mb-6">
                        <p>Estimated delivery: 3-5 business days</p>
                        <p>Free returns within 30 days</p>
                    </div>
                </div>
            </div>

            {/* Detailed Info Tabs */}
            <Tabs defaultValue="description" className="mt-12">
                <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                    <p>{product.longDescription}</p>
                </TabsContent>
                <TabsContent value="specifications" className="mt-4">
                    <ul className="list-disc pl-5">
                        {product.specifications.map((spec, index) => (
                            <li key={index}>{spec}</li>
                        ))}
                    </ul>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                    <div className="space-y-4">
                        {product.reviews.map((review) => (
                            <Card key={review.id}>
                                <CardContent className="pt-4">
                                    <div className="flex items-center mb-2">
                                        <div className="flex items-center mr-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium">{review.author}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                                    <p className="text-xs text-gray-400">{review.date}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Related Products */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {product.relatedProducts.map((relatedProduct) => (
                        <Link href={`https://google.com/`}
                            target={`_blank`}>
                            <Card key={relatedProduct.id} className='cursor-pointer'>
                                <CardContent className="p-4">
                                    <img src={relatedProduct.imageUrl} alt={relatedProduct.name} className="w-full h-48 object-cover mb-4 rounded" />
                                    <h3 className="text-lg font-semibold mb-2">{relatedProduct.name}</h3>
                                    <p className="text-gray-600">${relatedProduct.price.toFixed(2)}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};