'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useProducts } from '@/contexts/ProductContext';
import { OrderItem } from '@/types';
import BarcodeScanner from '@/components/BarcodeScanner';
import ReceiptSection from '@/components/ReceiptSection';
import ProductSection from '@/components/ProductSection';

export default function CashierPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { getProductByBarcode, updateStock, products } = useProducts();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleScanSuccess = (barcode: string) => {
    const product = getProductByBarcode(barcode);
    
    if (product) {
      if (product.stock <= 0) {
        alert('Product is out of stock!');
        return;
      }

      // Check if product is already in the order
      const existingItemIndex = orderItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Increase quantity if already in order
        const updatedItems = [...orderItems];
        updatedItems[existingItemIndex].quantity += 1;
        updatedItems[existingItemIndex].subtotal = 
          updatedItems[existingItemIndex].product.price * updatedItems[existingItemIndex].quantity;
        setOrderItems(updatedItems);
      } else {
        // Add new item to order
        const newItem: OrderItem = {
          product,
          quantity: 1,
          subtotal: product.price,
        };
        setOrderItems([...orderItems, newItem]);
      }
      
      setShowScanner(false);
    } else {
      alert('Product not found!');
      setShowScanner(false);
    }
  };

  const handleCompleteOrder = () => {
    if (orderItems.length === 0) {
      alert('No items in the order!');
      return;
    }

    // Update stock for all items
    orderItems.forEach(item => {
      updateStock(item.product.id, item.quantity);
    });

    // Clear the order
    setOrderItems([]);
    alert('Order completed! Stock has been updated.');
  };

  const handleClearOrder = () => {
    if (confirm('Are you sure you want to clear the order?')) {
      setOrderItems([]);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {showScanner && (
        <BarcodeScanner
          onScanSuccess={handleScanSuccess}
          onClose={() => setShowScanner(false)}
        />
      )}

      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Cashier</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <ReceiptSection items={orderItems} onClear={handleClearOrder} />
          </div>
          <div>
            <ProductSection products={products} />
          </div>
        </div>
      </div>

      {/* Fixed Scan Button at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4">
            <button
              onClick={() => setShowScanner(true)}
              className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md"
            >
              📷 Scan Barcode
            </button>
            {orderItems.length > 0 && (
              <button
                onClick={handleCompleteOrder}
                className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 active:bg-green-800 transition-colors shadow-md"
              >
                ✓ Complete Order
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

