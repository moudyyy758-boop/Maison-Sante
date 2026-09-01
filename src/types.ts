export type CategoryType = 
  | 'All' 
  | 'Breakfast' 
  | 'Main Dishes' 
  | 'Sides' 
  | 'Salads' 
  | 'Desserts' 
  | 'Drinks';

export type DietaryTag = 'Popular' | 'Customer Favorite' | 'New' | 'Vegetarian' | 'Spicy';

export interface CustomizationOption {
  id: string;
  name: string;
  priceDelta: number; // in Naira e.g. 1500
}

export interface CustomizationGroup {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  required?: boolean;
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  price: number; // in Naira
  image: string;
  altText: string;
  ingredients: string[];
  allergens?: string[];
  tags: DietaryTag[];
  available: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  customizationGroups?: CustomizationGroup[];
  customizations?: CustomizationGroup[];
}

export interface SelectedCustomization {
  groupId: string;
  groupName: string;
  optionId: string;
  optionName: string;
  priceDelta: number;
}

export interface CartItem {
  id: string; // unique item instance id in cart
  menuItemId: string;
  name: string;
  image: string;
  basePrice: number;
  unitPrice: number; // base + customizations
  quantity: number;
  totalPrice: number;
  selectedCustomizations: SelectedCustomization[];
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy';
  specialInstructions?: string;
}

export type OrderStatus = 
  | 'received' 
  | 'confirming' 
  | 'preparing' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export type PaymentStatus = 'pending' | 'confirmed';

export type DeliveryMethod = 'delivery' | 'pickup';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email?: string;
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: string;
  city?: string;
  deliveryDate?: string;
  preferredTime?: string;
  notes?: string;
}

export interface Order {
  orderId: string; // e.g. "MS-2026-0042"
  customerName: string;
  phone: string;
  email?: string;
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: string;
  city?: string;
  deliveryDate?: string;
  deliveryTime?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: string; // e.g. "To be confirmed"
  total: number; // or string if fee uncalculated
  notes?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  submittedAt: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'remove';
}
