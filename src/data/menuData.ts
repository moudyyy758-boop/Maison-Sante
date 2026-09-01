import { MenuItem } from '../types';
import strawberryLemonadeImg from '../assets/images/strawberry_lemonade_1788259523757.jpg';

export const MENU_ITEMS: MenuItem[] = [
  // BREAKFAST
  {
    id: 'bf-001',
    name: 'Classic Breakfast Plate',
    category: 'Breakfast',
    description: 'Eggs, toast, roasted potatoes, fresh fruit, and a light side salad.',
    price: 4500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzfDWaCCH9NUPNfQkTnDl5hhDB7OjKhoXu88QcSg-GTdQ6t_lUHPGv58YjOCA0DEISox-h1YfZqwrw3NAwRgezNoBdfMEjFmAtfN5_WuF_3qrh8Nu7HQSn5WifZZQ0_ljEIedGvWILv0aJTkUty0bAYDVoT_XyUhPhD0uigxJBVg4rMS6-QCFVGyRqfDLf7ihi_6E3aqnuO8VJi_4ACJAfLHs6tPRCX4ajoxp8E7q5ineaE3TtgWpR',
    altText: 'Classic Breakfast Plate with poached eggs, artisanal toast, roasted potatoes, and greens',
    ingredients: ['Farm-fresh eggs', 'Artisanal sourdough', 'Roasted garlic potatoes', 'Fresh seasonal berries', 'Microgreens'],
    allergens: ['Eggs', 'Gluten'],
    tags: ['Popular'],
    available: true,
    customizations: [
      {
        id: 'egg-prep',
        name: 'Egg Preparation',
        type: 'radio',
        required: true,
        options: [
          { id: 'poached', name: 'Poached', priceDelta: 0 },
          { id: 'scrambled', name: 'Soft Scrambled', priceDelta: 0 },
          { id: 'sunny', name: 'Sunny Side Up', priceDelta: 0 },
        ],
      },
      {
        id: 'breakfast-extras',
        name: 'Add Extras',
        type: 'checkbox',
        options: [
          { id: 'extra-eggs', name: 'Extra Egg', priceDelta: 500 },
          { id: 'extra-toast', name: 'Artisanal Sourdough Toast', priceDelta: 600 },
          { id: 'extra-avocado', name: 'Sliced Avocado', priceDelta: 1000 },
        ],
      },
    ],
  },
  {
    id: 'bf-002',
    name: 'Creamy Chicken Sandwich',
    category: 'Breakfast',
    description: 'Grilled chicken, fresh vegetables, creamy dressing, and toasted bread.',
    price: 4000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvGt3wdsSRKpwjsws7VgTBNBjhz4f5iSsRfc2_UOY7N7Qs0XtaPbrgPiIBjRLZKiloc9ly1xdG9KDxBIgJrx8w4AQ7lG5ZSPDiqKSX2fbLUDkR0ShgOuieOkdQ5rENTVrZj2UMjQhUj2Eb1D9yZX6sLawRlJdXNyRJy9WrR7FZ2lRZGQCQS6it7hIspVkwDEc8xbnGInreRcRPrn6gN6gWcnKaFy-jHIFoDeO9SD1G3rvbKP3-VUhG',
    altText: 'Creamy chicken sandwich cut in half on artisanal brioche bread',
    ingredients: ['Tender chicken breast', 'Creamy garlic house aioli', 'Fresh wild arugula', 'Vine-ripened tomatoes', 'Artisanal brioche'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    tags: ['Popular'],
    available: true,
    customizations: [
      {
        id: 'protein-choice',
        name: 'Protein',
        type: 'radio',
        required: true,
        options: [
          { id: 'chicken-standard', name: 'Grilled Chicken Breast', priceDelta: 0 },
          { id: 'chicken-crispy', name: 'Crispy Herb Chicken', priceDelta: 500 },
        ],
      },
      {
        id: 'sandwich-extras',
        name: 'Add Extras',
        type: 'checkbox',
        options: [
          { id: 'extra-cheese', name: 'Extra Melted Cheddar', priceDelta: 500 },
          { id: 'extra-sauce', name: 'Extra House Creamy Aioli', priceDelta: 500 },
          { id: 'add-bacon', name: 'Crispy Turkey Bacon', priceDelta: 1000 },
        ],
      },
    ],
  },
  {
    id: 'bf-003',
    name: 'Pancake & Berry Stack',
    category: 'Breakfast',
    description: 'Fluffy pancakes served with berries and a light drizzle.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1200&auto=format&fit=crop',
    altText: 'Golden fluffy pancakes stacked with fresh berries and maple drizzle',
    ingredients: ['Fluffy buttermilk pancakes', 'Macerated strawberries', 'Fresh blueberries', 'Vanilla cream drizzle', 'Mint leaves'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    tags: ['New', 'Vegetarian'],
    available: true,
    isVegetarian: true,
    customizations: [
      {
        id: 'drizzle-choice',
        name: 'Sweet Drizzle',
        type: 'radio',
        required: true,
        options: [
          { id: 'pure-maple', name: 'Organic Pure Maple Drizzle', priceDelta: 0 },
          { id: 'vanilla-honey', name: 'Vanilla Bean Infused Honey', priceDelta: 0 },
          { id: 'chocolate-fudge', name: 'Warm Dark Chocolate Drizzle', priceDelta: 400 },
        ],
      },
      {
        id: 'pancake-extras',
        name: 'Extras',
        type: 'checkbox',
        options: [
          { id: 'extra-berries', name: 'Extra Berry Medley', priceDelta: 800 },
          { id: 'whipped-cream', name: 'Maison Vanilla Whipped Cream', priceDelta: 500 },
        ],
      },
    ],
  },

  // MAIN DISHES
  {
    id: 'main-001',
    name: 'Creamy Garlic Chicken Pasta',
    category: 'Main Dishes',
    description: 'Tender chicken and pasta tossed in a creamy garlic sauce with herbs.',
    price: 6500,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6iHcOUEr-iUMZH3ExVrJ5Ka5pCL6WnadqDhv94boI3A&s=10',
    altText: 'Creamy garlic chicken pasta with fresh herbs and shaved parmesan',
    ingredients: ['Fettuccine pasta', 'Tender sautéed chicken breast', 'Heavy cream & garlic reduction', 'Parmigiano-Reggiano', 'Fresh Italian parsley'],
    allergens: ['Gluten', 'Dairy'],
    tags: ['Popular', 'Customer Favorite'],
    available: true,
    customizations: [
      {
        id: 'pasta-protein',
        name: 'Protein',
        type: 'radio',
        required: true,
        options: [
          { id: 'chicken', name: 'Chicken', priceDelta: 0 },
          { id: 'no-chicken', name: 'Vegetarian (No Chicken)', priceDelta: -500 },
        ],
      },
      {
        id: 'pasta-extras',
        name: 'Extras',
        type: 'checkbox',
        options: [
          { id: 'extra-chicken', name: 'Extra Chicken', priceDelta: 1500 },
          { id: 'extra-cheese', name: 'Extra Parmesan Cheese', priceDelta: 500 },
          { id: 'extra-sauce', name: 'Extra Creamy Garlic Sauce', priceDelta: 500 },
        ],
      },
    ],
  },
  {
    id: 'main-002',
    name: 'Classic Jollof & Grilled Chicken',
    category: 'Main Dishes',
    description: 'Flavorful jollof rice served with grilled chicken and fresh vegetables.',
    price: 5500,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD575bEsSRkPfl0EGKmbg_4NG5aNNKCbzuFZutA05b7FIcf-fzsrOVdTY&s=10',
    altText: 'Smoky classic jollof rice paired with succulent herb-grilled chicken and steamed vegetables',
    ingredients: ['Smoky party jollof rice', 'Charcoal-grilled spiced chicken quarter', 'Steamed garden vegetables', 'Sweet fried plantain'],
    allergens: [],
    tags: ['Popular', 'Customer Favorite', 'Spicy'],
    available: true,
    isSpicy: true,
    customizations: [
      {
        id: 'jollof-portion',
        name: 'Portion Size',
        type: 'radio',
        required: true,
        options: [
          { id: 'regular', name: 'Regular Portion', priceDelta: 0 },
          { id: 'double-chicken', name: 'Double Grilled Chicken', priceDelta: 1800 },
        ],
      },
      {
        id: 'jollof-extras',
        name: 'Extras',
        type: 'checkbox',
        options: [
          { id: 'extra-dodo', name: 'Extra Sweet Fried Plantain (Dodo)', priceDelta: 800 },
          { id: 'pepper-sauce', name: 'Maison Spicy Pepper Dip', priceDelta: 500 },
        ],
      },
    ],
  },
  {
    id: 'main-003',
    name: 'Herb Grilled Chicken & Rice',
    category: 'Main Dishes',
    description: 'Herb-seasoned grilled chicken served with fragrant rice and vegetables.',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1200&auto=format&fit=crop',
    altText: 'Herb-seasoned grilled chicken breast over fragrant jasmine rice and tender greens',
    ingredients: ['Rosemary & thyme seasoned chicken', 'Fragrant basmati rice', 'Sautéed zucchini and baby carrots', 'Lemon herb butter'],
    allergens: ['Dairy'],
    tags: ['Popular'],
    available: true,
    customizations: [
      {
        id: 'rice-choice',
        name: 'Rice Base',
        type: 'radio',
        required: true,
        options: [
          { id: 'basmati', name: 'Fragrant Basmati Rice', priceDelta: 0 },
          { id: 'herb-rice', name: 'Garlic Herb Rice', priceDelta: 300 },
        ],
      },
      {
        id: 'herb-extras',
        name: 'Extras',
        type: 'checkbox',
        options: [
          { id: 'extra-chicken', name: 'Extra Herb Chicken Breast', priceDelta: 1500 },
          { id: 'extra-veggies', name: 'Extra Grilled Veggies', priceDelta: 700 },
        ],
      },
    ],
  },
  {
    id: 'main-004',
    name: 'Creamy Chicken Rice Bowl',
    category: 'Main Dishes',
    description: 'Seasoned rice, tender chicken, fresh vegetables, and creamy house sauce.',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop',
    altText: 'Warm seasoned rice bowl topped with sliced grilled chicken, avocado, and creamy sauce',
    ingredients: ['Seasoned steamed rice', 'Juicy grilled chicken', 'Crisp cucumber ribbons', 'Shaved carrots', 'Signature creamy house dressing'],
    allergens: ['Dairy'],
    tags: ['New'],
    available: true,
    customizations: [
      {
        id: 'bowl-protein',
        name: 'Protein',
        type: 'radio',
        required: true,
        options: [
          { id: 'chicken', name: 'Grilled Chicken', priceDelta: 0 },
          { id: 'no-meat', name: 'Avocado & Herb Veggie Bowl', priceDelta: -400 },
        ],
      },
      {
        id: 'bowl-extras',
        name: 'Extras',
        type: 'checkbox',
        options: [
          { id: 'extra-sauce', name: 'Extra Creamy House Sauce', priceDelta: 500 },
          { id: 'extra-chicken', name: 'Extra Chicken', priceDelta: 1500 },
        ],
      },
    ],
  },

  // SIDES
  {
    id: 'side-001',
    name: 'Garlic Potatoes',
    category: 'Sides',
    description: 'Crispy golden potatoes finished with garlic and herbs.',
    price: 2500,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfYUueuCpGtSSmoQzJJNyqga_mbzBkx7mAQYIEBZuqvQ&s=10',
    altText: 'Crispy roasted golden baby potatoes tossed in roasted garlic and fresh rosemary',
    ingredients: ['Baby gold potatoes', 'Roasted garlic confit', 'Fresh rosemary and thyme', 'Maldon sea salt', 'Extra virgin olive oil'],
    allergens: [],
    tags: ['Vegetarian'],
    available: true,
    isVegetarian: true,
    customizations: [
      {
        id: 'dip-choice',
        name: 'Complementary Dip',
        type: 'radio',
        required: true,
        options: [
          { id: 'herb-aioli', name: 'Creamy Garlic Herb Aioli', priceDelta: 0 },
          { id: 'truffle-mayo', name: 'Truffle Aioli', priceDelta: 400 },
          { id: 'spicy-ketchup', name: 'Artisanal Smoked Ketchup', priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 'side-002',
    name: 'Seasoned Fries',
    category: 'Sides',
    description: 'Golden fries with Maison de Santé seasoning.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop',
    altText: 'Basket of hot golden french fries dusted with Maison secret herb blend',
    ingredients: ['Hand-cut russet potatoes', 'Maison botanical herb salt', 'Paprika', 'Sea salt'],
    allergens: [],
    tags: ['Vegetarian'],
    available: true,
    isVegetarian: true,
    customizations: [
      {
        id: 'fry-seasoning',
        name: 'Seasoning Level',
        type: 'radio',
        required: true,
        options: [
          { id: 'signature', name: 'Maison Signature Blend', priceDelta: 0 },
          { id: 'light-salt', name: 'Simple Sea Salt', priceDelta: 0 },
          { id: 'spicy-cajun', name: 'Spicy Paprika Herb', priceDelta: 200 },
        ],
      },
    ],
  },
  {
    id: 'side-003',
    name: 'Fresh Garden Salad',
    category: 'Salads',
    description: 'Crisp vegetables with a light house dressing.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop',
    altText: 'Vibrant bowl of fresh crisp mixed greens, cherry tomatoes, radish, and light vinaigrette',
    ingredients: ['Crisp romaine and arugula', 'Heirloom cherry tomatoes', 'English cucumber', 'Shaved watermelon radish', 'Light lemon-thyme vinaigrette'],
    allergens: [],
    tags: ['Vegetarian'],
    available: true,
    isVegetarian: true,
    customizations: [
      {
        id: 'dressing-choice',
        name: 'Dressing Choice',
        type: 'radio',
        required: true,
        options: [
          { id: 'lemon-vinaigrette', name: 'Lemon Herb Vinaigrette', priceDelta: 0 },
          { id: 'creamy-caesar', name: 'Maison Creamy Caesar', priceDelta: 0 },
          { id: 'balsamic', name: 'Aged Balsamic Glaze', priceDelta: 0 },
        ],
      },
      {
        id: 'salad-extras',
        name: 'Add Protein',
        type: 'checkbox',
        options: [
          { id: 'grilled-chicken-slice', name: 'Sliced Herb Chicken', priceDelta: 1500 },
          { id: 'parmesan-shavings', name: 'Aged Parmesan Shavings', priceDelta: 500 },
        ],
      },
    ],
  },

  // DESSERTS
  {
    id: 'des-001',
    name: 'Strawberry Cream Cup',
    category: 'Desserts',
    description: 'Fresh strawberries layered with soft cream.',
    price: 3000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZAXRiv8eP0mefqaP214b0ko2mtv_g5r166bBKLdlLNmN0H757LgVy0A8NDGuqYVflsWlgHszDwtPInuJ9lcx_NVvVFNTlx1tKFEUi9X3tSeKouC0plrNvJFJpdmrqFVrMprJbZwAaLhi1dNbHWMXqJXadszgbK7pGxhQMVRyQKgtYsf64TsMR4BsT4Z-nycFIePmn6eX7B6rPYZTz05cKczlB6RE-uGnzOpwN8pQfCnPHdplDOacs',
    altText: 'Elegant glass cup filled with layers of strawberry compote, whipped vanilla cream, and shortbread crumble',
    ingredients: ['Fresh ripe strawberries', 'Madagascar vanilla bean mascarpone', 'Hand-crushed butter shortbread', 'Organic mint leaf'],
    allergens: ['Dairy', 'Gluten'],
    tags: ['Popular', 'Customer Favorite', 'Vegetarian'],
    available: true,
    isVegetarian: true,
    customizations: [
      {
        id: 'cream-cup-extras',
        name: 'Indulgence Add-on',
        type: 'checkbox',
        options: [
          { id: 'extra-strawberries', name: 'Extra Fresh Strawberries', priceDelta: 500 },
          { id: 'extra-crumble', name: 'Extra Butter Shortbread Crumble', priceDelta: 300 },
        ],
      },
    ],
  },
  {
    id: 'des-002',
    name: 'Chocolate Cake',
    category: 'Desserts',
    description: 'Rich chocolate cake with a soft, indulgent center.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop',
    altText: 'Slice of dark decadent chocolate fudge cake with velvet ganache frosting',
    ingredients: ['70% Valrhona dark chocolate', 'Espresso-infused sponge', 'Silky dark chocolate ganache', 'Flaky sea salt'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    tags: ['Vegetarian'],
    available: true,
    isVegetarian: true,
    customizations: [
      {
        id: 'cake-topping',
        name: 'Accompaniment',
        type: 'radio',
        required: true,
        options: [
          { id: 'none', name: 'Classic (As is)', priceDelta: 0 },
          { id: 'whipped-cream', name: 'Side of Vanilla Bean Cream', priceDelta: 400 },
          { id: 'berry-compote', name: 'Side of Warm Berry Compote', priceDelta: 500 },
        ],
      },
    ],
  },
  {
    id: 'des-003',
    name: 'Vanilla Berry Parfait',
    category: 'Desserts',
    description: 'Creamy vanilla layers with berries and a light crumble.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop',
    altText: 'Glass tumbler layered with greek vanilla bean yogurt, granola crumble, and blackberry-raspberry compote',
    ingredients: ['Greek vanilla bean yogurt', 'Toasted almond oat granola', 'Wild blackberry & raspberry coulis', 'Wildflower honey'],
    allergens: ['Dairy', 'Nuts'],
    tags: ['New', 'Vegetarian'],
    available: true,
    isVegetarian: true,
    customizations: [
      {
        id: 'parfait-extras',
        name: 'Extras',
        type: 'checkbox',
        options: [
          { id: 'extra-granola', name: 'Extra Almond Granola Crumble', priceDelta: 400 },
          { id: 'chia-seeds', name: 'Organic Chia Seeds', priceDelta: 300 },
        ],
      },
    ],
  },

  // DRINKS
  {
    id: 'drk-001',
    name: 'Strawberry Lemonade',
    category: 'Drinks',
    description: 'Refreshing lemonade with strawberry notes.',
    price: 2000,
    image: strawberryLemonadeImg,
    altText: 'Tall glass of chilled blushing strawberry lemonade garnished with sliced lemon and strawberries',
    ingredients: ['Freshly squeezed lemon juice', 'Crushed strawberry puree', 'Pure cane sugar syrup', 'Sparkling filtered water', 'Fresh mint'],
    allergens: [],
    tags: ['Popular', 'Customer Favorite', 'Vegetarian'],
    available: true,
    isVegetarian: true,
    customizations: [
      {
        id: 'ice-level',
        name: 'Ice Level',
        type: 'radio',
        required: true,
        options: [
          { id: 'regular-ice', name: 'Standard Chilled Ice', priceDelta: 0 },
          { id: 'less-ice', name: 'Less Ice', priceDelta: 0 },
          { id: 'no-ice', name: 'No Ice', priceDelta: 0 },
        ],
      },
      {
        id: 'sweetness',
        name: 'Sweetness',
        type: 'radio',
        required: true,
        options: [
          { id: 'standard-sweet', name: 'Standard (Balanced)', priceDelta: 0 },
          { id: 'less-sweet', name: 'Light Sweetness (Less Sugar)', priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 'drk-002',
    name: 'Fresh Fruit Cooler',
    category: 'Drinks',
    description: 'A refreshing blend of seasonal fruits.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1200&auto=format&fit=crop',
    altText: 'Chilled artisanal fruit cooler with passionfruit, citrus, and mint sprigs in crystal glassware',
    ingredients: ['Watermelon', 'Pineapple', 'Valencia orange', 'Passionfruit essence', 'Crushed ice'],
    allergens: [],
    tags: ['Vegetarian'],
    available: true,
    isVegetarian: true,
    customizations: [
      {
        id: 'cooler-ice',
        name: 'Ice Preference',
        type: 'radio',
        required: true,
        options: [
          { id: 'regular-ice', name: 'Standard Chilled', priceDelta: 0 },
          { id: 'no-ice', name: 'No Ice', priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 'drk-003',
    name: 'Iced Vanilla Latte',
    category: 'Drinks',
    description: 'Smooth iced coffee with a subtle vanilla finish.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1200&auto=format&fit=crop',
    altText: 'Glass of cold brew iced latte with visible milk marble swirls and Madagascar vanilla syrup',
    ingredients: ['Specialty espresso double shot', 'Whole organic milk or oat milk', 'House-made Madagascar vanilla syrup', 'Cube ice'],
    allergens: ['Dairy (optional oat alternative)'],
    tags: ['Popular', 'Vegetarian'],
    available: true,
    isVegetarian: true,
    customizations: [
      {
        id: 'milk-choice',
        name: 'Milk Preference',
        type: 'radio',
        required: true,
        options: [
          { id: 'whole-milk', name: 'Whole Milk', priceDelta: 0 },
          { id: 'oat-milk', name: 'Creamy Oat Milk', priceDelta: 400 },
          { id: 'almond-milk', name: 'Almond Milk', priceDelta: 400 },
        ],
      },
      {
        id: 'coffee-shot',
        name: 'Espresso Strength',
        type: 'radio',
        required: true,
        options: [
          { id: 'standard-double', name: 'Double Shot (Standard)', priceDelta: 0 },
          { id: 'extra-shot', name: 'Triple Shot (+₦500)', priceDelta: 500 },
          { id: 'decaf', name: 'Decaf Espresso', priceDelta: 0 },
        ],
      },
    ],
  },
];

export const FAQS = [
  {
    question: 'How do I place an order?',
    answer: 'Browse our curated menu, select your favorite dishes, customize your options, review your order in the cart, enter your delivery or pickup details, and submit your order request.'
  },
  {
    question: 'Can I pay online?',
    answer: 'Online payment is not currently available. Payment arrangements will be confirmed separately once our kitchen reviews and accepts your order request.'
  },
  {
    question: 'Can I customize my order?',
    answer: 'Yes! Selected dishes offer customization options such as protein selection, spice levels, extras, and specific dietary instructions in the food details window.'
  },
  {
    question: 'Do you offer delivery?',
    answer: 'Yes! Delivery availability and exact delivery fees will be confirmed when your order request is processed by our concierge.'
  },
  {
    question: 'Can I place a pickup order?',
    answer: 'Yes, if you select Pickup during checkout, our kitchen team will confirm the preparation time and pickup location details directly with your order confirmation.'
  }
];

export const BRAND_INFO = {
  name: 'Maison de Santé',
  tagline: 'GOOD FOOD, BEAUTIFULLY MADE.',
  subtext: '“Thoughtfully prepared dishes made to bring a little more comfort and elegance to your day.”',
  about: 'At Maison de Santé, we believe good food should feel comforting, beautiful, and thoughtfully made. Every dish is prepared with care and served with the intention of making your day a little more delicious.',
  contact: {
    phone: '+234 800 MAISON (624766)',
    email: 'orders@maisondesante.com',
    instagram: '@maisondesante',
    location: 'Victoria Island / Ikoyi, Lagos',
    hours: 'Mon – Sun: 8:00 AM – 9:00 PM',
  },
  faqs: FAQS.map((f) => ({ q: f.question, a: f.answer }))
};
