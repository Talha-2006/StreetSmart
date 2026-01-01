'use client';

import { OrderItem } from '@/types';
import jsPDF from 'jspdf';

interface ReceiptSectionProps {
  items: OrderItem[];
  onClear: () => void;
}

export default function ReceiptSection({ items, onClear }: ReceiptSectionProps) {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Header
    doc.setFontSize(20);
    doc.text('StreetSmart', pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;
    doc.setFontSize(12);
    doc.text('Receipt', pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;
    doc.text(new Date().toLocaleString(), pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    // Items
    doc.setFontSize(10);
    doc.text('Items:', 20, yPos);
    yPos += 8;

    items.forEach((item) => {
      const itemText = `${item.product.name} x${item.quantity}`;
      const priceText = `$${item.subtotal.toFixed(2)}`;
      
      doc.text(itemText, 20, yPos);
      doc.text(priceText, pageWidth - 20, yPos, { align: 'right' });
      yPos += 8;
    });

    yPos += 5;
    doc.line(20, yPos, pageWidth - 20, yPos);
    yPos += 10;

    // Totals
    doc.setFontSize(12);
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });
    yPos += 10;
    doc.text(`Tax (8%): $${tax.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });
    yPos += 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: $${total.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });

    doc.save(`receipt-${Date.now()}.pdf`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Receipt</h2>
        {items.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No items in receipt</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b">
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.product.name}</p>
                <p className="text-sm text-gray-600">
                  ${item.product.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-gray-800">${item.subtotal.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={generatePDF}
            className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 active:bg-green-800 transition-colors"
          >
            Generate PDF Receipt
          </button>
        </>
      )}
    </div>
  );
}

