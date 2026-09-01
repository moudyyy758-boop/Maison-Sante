import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, Order, ToastMessage, SelectedCustomization } from '../types';

interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (
    item: MenuItem,
    quantity: number,
    customizations: SelectedCustomization[],
    spiceLevel?: 'Mild' | 'Medium' | 'Spicy',
    specialInstructions?: string
  ) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalCartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Food Detail Modal
  selectedProduct: MenuItem | null;
  setSelectedProduct: (item: MenuItem | null) => void;

  // Routing / View navigation
  currentView: 'home' | 'menu' | 'order' | 'order-confirmation' | 'order-history';
  setCurrentView: (view: 'home' | 'menu' | 'order' | 'order-confirmation' | 'order-history') => void;
  navigateTo: (view: 'home' | 'menu' | 'order' | 'order-confirmation' | 'order-history', sectionId?: string) => void;

  // Orders
  latestOrder: Order | null;
  allOrders: Order[];
  selectedTrackingOrderId: string | null;
  setSelectedTrackingOrderId: (id: string | null) => void;
  submitOrderRequest: (orderData: Omit<Order, 'orderId' | 'status' | 'paymentStatus' | 'submittedAt'>) => Promise<Order>;
  updateOrderStatusInStorage: (orderId: string, newStatus: Order['status'], newPaymentStatus?: Order['paymentStatus']) => void;
  deleteOrderFromStorage: (orderId: string) => void;
  clearAllOrders: () => void;
  reorderPastOrder: (order: Order) => void;
  seedDemoOrder: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  // Search & Filter state sharing
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;

  // Theme support
  isLightMode: boolean;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'maison_de_sante_cart_v1';
const ORDERS_STORAGE_KEY = 'maison_de_sante_orders_v1';
const LATEST_ORDER_KEY = 'maison_de_sante_latest_order_v1';
const THEME_STORAGE_KEY = 'maison_de_sante_theme_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state with persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'menu' | 'order' | 'order-confirmation' | 'order-history'>('home');
  const [selectedTrackingOrderId, setSelectedTrackingOrderId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Search & Category
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Theme
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) === 'light';
    } catch {
      return false;
    }
  });

  // Orders with persistence
  const [latestOrder, setLatestOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem(LATEST_ORDER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [allOrders, setAllOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not persist cart:', e);
    }
  }, [cart]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(allOrders));
    } catch (e) {
      console.warn('Could not persist orders:', e);
    }
  }, [allOrders]);

  // Persist latest order
  useEffect(() => {
    try {
      if (latestOrder) {
        localStorage.setItem(LATEST_ORDER_KEY, JSON.stringify(latestOrder));
      }
    } catch (e) {
      console.warn('Could not persist latest order:', e);
    }
  }, [latestOrder]);

  // Handle toast timers
  const addToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    setIsLightMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next ? 'light' : 'dark');
      } catch {}
      return next;
    });
  };

  // Add to cart with intelligent grouping
  const addToCart = (
    item: MenuItem,
    quantity: number,
    customizations: SelectedCustomization[],
    spiceLevel?: 'Mild' | 'Medium' | 'Spicy',
    specialInstructions?: string
  ) => {
    const customizationsDelta = customizations.reduce((sum, c) => sum + c.priceDelta, 0);
    const unitPrice = Math.max(0, item.price + customizationsDelta);
    const totalPrice = unitPrice * quantity;

    // Create a fingerprint to group identical orders
    const customKeys = customizations
      .map((c) => `${c.groupId}:${c.optionId}`)
      .sort()
      .join('|');
    const signature = `${item.id}_${customKeys}_${spiceLevel || ''}_${(specialInstructions || '').trim().toLowerCase()}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((p) => {
        const pCustomKeys = p.selectedCustomizations
          .map((c) => `${c.groupId}:${c.optionId}`)
          .sort()
          .join('|');
        const pSig = `${p.menuItemId}_${pCustomKeys}_${p.spiceLevel || ''}_${(p.specialInstructions || '').trim().toLowerCase()}`;
        return pSig === signature;
      });

      if (existingIndex > -1) {
        const updated = [...prev];
        const current = updated[existingIndex];
        const newQty = current.quantity + quantity;
        updated[existingIndex] = {
          ...current,
          quantity: newQty,
          totalPrice: current.unitPrice * newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: 'cart_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
          menuItemId: item.id,
          name: item.name,
          image: item.image,
          basePrice: item.price,
          unitPrice,
          quantity,
          totalPrice,
          selectedCustomizations: customizations,
          spiceLevel,
          specialInstructions: specialInstructions?.trim() || undefined,
        };
        return [...prev, newItem];
      }
    });

    addToast(`${item.name} added to your order ♡`, 'success');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              totalPrice: item.unitPrice * nextQty,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      addToast(`Item removed from your order.`, 'remove');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalCartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const navigateTo = (view: 'home' | 'menu' | 'order' | 'order-confirmation' | 'order-history', sectionId?: string) => {
    setCurrentView(view);
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Submit order request
  const submitOrderRequest = async (
    orderData: Omit<Order, 'orderId' | 'status' | 'paymentStatus' | 'submittedAt'>
  ): Promise<Order> => {
    // Generate unique order ID e.g. MS-2026-0089
    const year = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const orderId = `MS-${year}-${randomSeq}`;

    const newOrder: Order = {
      ...orderData,
      orderId,
      status: 'received',
      paymentStatus: 'pending',
      submittedAt: new Date().toISOString(),
    };

    // Simulate async submission
    await new Promise((resolve) => setTimeout(resolve, 800));

    setLatestOrder(newOrder);
    setSelectedTrackingOrderId(orderId);
    setAllOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addToast('Your order request has been received! ♡', 'success');
    setCurrentView('order-confirmation');

    return newOrder;
  };

  const updateOrderStatusInStorage = (
    orderId: string,
    newStatus: Order['status'],
    newPaymentStatus?: Order['paymentStatus']
  ) => {
    setAllOrders((prev) =>
      prev.map((order) => {
        if (order.orderId === orderId) {
          return {
            ...order,
            status: newStatus,
            paymentStatus: newPaymentStatus || order.paymentStatus,
          };
        }
        return order;
      })
    );
    if (latestOrder && latestOrder.orderId === orderId) {
      setLatestOrder((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
              paymentStatus: newPaymentStatus || prev.paymentStatus,
            }
          : null
      );
    }
    addToast(`Order ${orderId} updated to: ${newStatus.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const deleteOrderFromStorage = (orderId: string) => {
    setAllOrders((prev) => prev.filter((order) => order.orderId !== orderId));
    if (latestOrder && latestOrder.orderId === orderId) {
      setLatestOrder(null);
    }
    addToast(`Order ${orderId} removed from history.`, 'remove');
  };

  const clearAllOrders = () => {
    setAllOrders([]);
    setLatestOrder(null);
    setSelectedTrackingOrderId(null);
    try {
      localStorage.removeItem(ORDERS_STORAGE_KEY);
      localStorage.removeItem(LATEST_ORDER_KEY);
    } catch {}
    addToast('All order history has been cleared.', 'info');
  };

  const reorderPastOrder = (order: Order) => {
    // Add all items from this order into the cart
    setCart((prev) => {
      let updated = [...prev];
      order.items.forEach((item) => {
        const customKeys = (item.selectedCustomizations || [])
          .map((c) => `${c.groupId}:${c.optionId}`)
          .sort()
          .join('|');
        const signature = `${item.menuItemId}_${customKeys}_${item.spiceLevel || ''}_${(item.specialInstructions || '').trim().toLowerCase()}`;

        const existingIdx = updated.findIndex((p) => {
          const pCustomKeys = (p.selectedCustomizations || [])
            .map((c) => `${c.groupId}:${c.optionId}`)
            .sort()
            .join('|');
          const pSig = `${p.menuItemId}_${pCustomKeys}_${p.spiceLevel || ''}_${(p.specialInstructions || '').trim().toLowerCase()}`;
          return pSig === signature;
        });

        if (existingIdx > -1) {
          const current = updated[existingIdx];
          const newQty = current.quantity + item.quantity;
          updated[existingIdx] = {
            ...current,
            quantity: newQty,
            totalPrice: current.unitPrice * newQty,
          };
        } else {
          updated.push({
            ...item,
            id: 'cart_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
          });
        }
      });
      return updated;
    });

    setIsCartOpen(true);
    addToast(`${order.items.length} dishes added to your cart from #${order.orderId} ♡`, 'success');
  };

  const seedDemoOrder = () => {
    const year = new Date().getFullYear();
    const demoOrder: Order = {
      orderId: `MS-${year}-1024`,
      customerName: 'Claire Laurent',
      phone: '+234 812 345 6789',
      email: 'claire.laurent@example.com',
      deliveryMethod: 'delivery',
      deliveryAddress: '24 Admiralty Way, Lekki Phase 1',
      city: 'Lekki Phase 1',
      deliveryDate: 'Today',
      deliveryTime: '1:00 PM – 2:00 PM',
      items: [
        {
          id: 'cart_demo_1',
          menuItemId: 'dish-jollof-suya',
          name: 'Smoked Basmati Jollof & Suya Beef',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
          basePrice: 12500,
          unitPrice: 14000,
          quantity: 2,
          totalPrice: 28000,
          selectedCustomizations: [
            {
              groupId: 'cg-protein',
              groupName: 'Protein Choice',
              optionId: 'opt-suya-beef',
              optionName: 'Suya Spiced Beef Strips',
              priceDelta: 0,
            },
            {
              groupId: 'cg-extras',
              groupName: 'Curated Extras',
              optionId: 'opt-plantain',
              optionName: 'Caramelized Dodo (Plantain)',
              priceDelta: 1500,
            }
          ],
          spiceLevel: 'Medium',
          specialInstructions: 'Please pack the suya pepper separately.'
        },
        {
          id: 'cart_demo_2',
          menuItemId: 'dish-hibiscus-spritz',
          name: 'Artisanal Zobo & Elderflower Spritz',
          image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
          basePrice: 4500,
          unitPrice: 4500,
          quantity: 2,
          totalPrice: 9000,
          selectedCustomizations: [],
          spiceLevel: 'Mild',
        }
      ],
      subtotal: 37000,
      deliveryFee: '₦2,500 (Confirmed)',
      total: 39500,
      notes: 'Please buzz gate security code 4022 on arrival.',
      status: 'delivered',
      paymentStatus: 'confirmed',
      submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    };

    setAllOrders((prev) => [demoOrder, ...prev]);
    addToast('Sample past order loaded to your history ♡', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalCartCount,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        currentView,
        setCurrentView,
        navigateTo,
        latestOrder,
        allOrders,
        selectedTrackingOrderId,
        setSelectedTrackingOrderId,
        submitOrderRequest,
        updateOrderStatusInStorage,
        deleteOrderFromStorage,
        clearAllOrders,
        reorderPastOrder,
        seedDemoOrder,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        isLightMode,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
