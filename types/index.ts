export interface Product {
  id: string;
  barcode: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  role: 'cashier' | 'storekeeper';
}

