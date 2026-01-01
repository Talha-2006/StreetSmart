'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  getProductByBarcode: (barcode: string) => Product | undefined;
  updateStock: (id: string, quantity: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Mock initial products for demonstration
const initialProducts: Product[] = [
  { id: '1', barcode: '1234567890123', name: 'Product 1', price: 10.99, stock: 50 },
  { id: '2', barcode: '2345678901234', name: 'Product 2', price: 15.50, stock: 30 },
  { id: '3', barcode: '3456789012345', name: 'Product 3', price: 8.75, stock: 75 },
];

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    // Load products from localStorage if available
    const stored = localStorage.getItem('products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, []);

  useEffect(() => {
    // Save products to localStorage whenever they change
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const getProductByBarcode = (barcode: string) => {
    return products.find(p => p.barcode === barcode);
  };

  const updateStock = (id: string, quantity: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, stock: Math.max(0, p.stock - quantity) } : p
    ));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, getProductByBarcode, updateStock }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

