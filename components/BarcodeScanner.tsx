'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface BarcodeScannerProps {
  onScanSuccess: (barcode: string) => void;
  onClose: () => void;
}

export default function BarcodeScanner({ onScanSuccess, onClose }: BarcodeScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const scannerId = 'barcode-scanner';
    const html5Qrcode = new Html5Qrcode(scannerId);

    const startScanning = async () => {
      try {
        await html5Qrcode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onScanSuccess(decodedText);
            stopScanning();
          },
          () => {
            // Error callback - ignore, scanner will keep trying
          }
        );
        scannerRef.current = html5Qrcode;
      } catch (err) {
        setError('Failed to start camera. Please check permissions.');
        console.error(err);
      }
    };

    const stopScanning = async () => {
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop();
          scannerRef.current.clear();
        } catch (err) {
          console.error(err);
        }
        scannerRef.current = null;
      }
    };

    startScanning();

    return () => {
      stopScanning();
    };
  }, [onScanSuccess]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <h2 className="text-white text-xl font-semibold">Scan Barcode</h2>
        <button
          onClick={onClose}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Close
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center h-full">
        <div id="barcode-scanner" className="w-full max-w-md"></div>
        {error && (
          <div className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

