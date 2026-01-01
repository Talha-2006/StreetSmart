'use client';

import { Product } from '@/types';

interface ProductSectionProps {
  products: Product[];
}

export default function ProductSection({ products }: ProductSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">All Products</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No products available</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-600">Barcode: {product.barcode}</p>
                <p className="text-sm text-gray-600">Price: ${product.price.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    product.stock < 10 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  Stock: {product.stock}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

