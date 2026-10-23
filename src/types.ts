export interface SoapProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'exfoliating' | 'calming' | 'energizing' | 'sensitive';
  price: number;
  weight: string;
  image: string;
  scentNotes: string[];
  topNote: string;
  heartNote: string;
  baseNote: string;
  description: string;
  skinType: string[];
  latherRating: number; // 1-5
  latherType: string;
  exfoliationLevel: 'None (Smooth)' | 'Mild (Botanical)' | 'Moderate (Mineral/Pumice)';
  curingTime: string;
  ingredients: string[];
  heroIngredient: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  reviews: {
    author: string;
    location: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export interface CartItem {
  product: SoapProduct;
  quantity: number;
  isBundle?: boolean;
  bundleItems?: string[];
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  postalCode: string;
  shippingMethod: string;
  shippingCost: number;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
}
