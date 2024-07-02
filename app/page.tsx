import React from 'react';
import { ProductPage } from './product-page';

const productData = {
  id: 1,
  name: 'Sample Product',
  price: 99.99,
  rating: 4.5,
  shortDescription: 'This is a short description of the product.',
  longDescription: 'This is a more detailed description of the product. It includes all the features, benefits, and other important information.',
  specifications: [
    'Contains natural fruit extracts',
    'Free from artificial colors and flavors',
    'Includes vitamins and minerals: Vitamin C, Vitamin D, Calcium',
    'Organic and non-GMO ingredients',
  ],
  colors: ['#DCA47C', '#FFD3B6', '#698474'], // Colors
  sizes: ['S', 'M', 'L', 'XL'],
  images: [
    { id: 1, url: '/prod1.jpg', alt: 'Product Image 1' },
    { id: 2, url: '/prod2.jpg', alt: 'Product Image 2' },
    { id: 3, url: '/prod3.jpg', alt: 'Product Image 3' },
  ],
  reviews: [
    { id: 1, author: 'Jane Doe', rating: 5, comment: 'Great product!', date: '2024-06-01' },
    { id: 2, author: 'John Smith', rating: 4, comment: 'Very useful, but a bit expensive.', date: '2024-06-15' },
    { id: 3, author: 'Alice Johnson', rating: 4, comment: 'I liked it, but the color was slightly different than expected.', date: '2024-06-20' },
  ],
  relatedProducts: [
    { id: 2, name: 'Related Product 1', price: 59.99, imageUrl: '/altProd1.jpg' },
    { id: 3, name: 'Related Product 2', price: 79.99, imageUrl: '/altProd2.jpg' },
    { id: 4, name: 'Related Product 3', price: 89.99, imageUrl: '/altProd3.jpg' },
  ],
};

const ProductDetailPage = () => {
  return <ProductPage product={productData} />;
};

export default ProductDetailPage;
