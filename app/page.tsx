"use client"

import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
}

const initialProducts: Product[] = [
  {
    id: 1, name: 'Sleek Watch', price: 129.99, rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2, name: 'Wireless Earbuds', price: 89.99, rating: 4.2,
    imageUrl: 'https://images.unsplash.com/photo-1598371611276-1bc503a270a4?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  },
  {
    id: 3, name: 'Smart Home Hub', price: 149.99, rating: 4.8,
    imageUrl: "https://plus.unsplash.com/premium_photo-1663075936658-11cfc7d6a5d6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  },
  {
    id: 4, name: 'Fitness Tracker', price: 59.99, rating: 4.0,
    imageUrl: "https://plus.unsplash.com/premium_photo-1681433383783-661b519b154a?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5, name: 'Portable Charger', price: 39.99, rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1619489646924-b4fce76b1db5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 6, name: 'Noise-Canceling Headphones', price: 199.99, rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1612478120679-5b7412e15f84?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

const ProductGridPage: React.FC = () => {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter(id => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  const isInCart = (productId: number) => cart.some(item => item.id === productId);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">TechStore</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  You have {cart.length} item(s) in your cart.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-4">
                    <span>{item.name}</span>
                    <div>
                      <span className="mr-4">${item.price.toFixed(2)}</span>
                      <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                {cart.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <strong>Total: ${getTotalPrice()}</strong>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-center items-center h-48 bg-gray-100 rounded-md mb-4 relative overflow-hidden">
                  {/* <ShoppingBag className="w-24 h-24 text-gray-400" /> */}
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">{product.rating.toFixed(1)}</span>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
                <Button
                  onClick={() => isInCart(product.id) ? removeFromCart(product.id) : addToCart(product)}
                  className="w-full"
                  variant={isInCart(product.id) ? "destructive" : "default"}
                >
                  {isInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart
                    className={`w-5 h-5 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                  />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductGridPage;