export type Category = "veg" | "nonveg" | "jain";
export type SpiceLevel = "low" | "medium" | "high";

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  price: number;       // in ₹
  ingredients: string[];
  spiceLevel: SpiceLevel;
  image: string;
  description: string;
  isPopular?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  // ── Veg ──────────────────────────────────────────────────────────────────
  {
    id: "mcaloo-tikki",
    name: "McAloo Tikki",
    category: "veg",
    price: 59,
    ingredients: ["Aloo Tikki Patty", "Lettuce", "Tomato", "Eggless Mayo", "Sesame Bun"],
    spiceLevel: "medium",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
    description: "India's favourite crispy potato patty burger with tangy dip.",
    isPopular: true,
  },
  {
    id: "mcspicy-paneer",
    name: "McSpicy Paneer",
    category: "veg",
    price: 149,
    ingredients: ["Paneer Patty", "Lettuce", "Habanero Sauce", "Cheese Slice", "Brioche Bun"],
    spiceLevel: "high",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80",
    description: "Fiery crispy paneer patty packed with spicy habanero sauce.",
    isPopular: true,
  },
  {
    id: "masala-fries",
    name: "Masala Fries",
    category: "veg",
    price: 89,
    ingredients: ["Golden Fries", "Peri Peri Masala", "Chaat Powder", "Lemon Zest"],
    spiceLevel: "medium",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=80",
    description: "Classic golden fries tossed in a bold Indian spice blend.",
    isPopular: true,
  },
  {
    id: "piri-piri-wrap",
    name: "Piri Piri Wrap",
    category: "veg",
    price: 129,
    ingredients: ["Grilled Veggie Patty", "Piri Piri Sauce", "Cabbage Slaw", "Tangy Relish", "Chapati Wrap"],
    spiceLevel: "high",
    image: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=500&auto=format&fit=crop&q=80",
    description: "A bold wrap bursting with piri piri heat and crunchy slaw.",
  },
  {
    id: "mango-smoothie",
    name: "Mango McCafe",
    category: "veg",
    price: 99,
    ingredients: ["Alphonso Mango Pulp", "Milk", "Vanilla Ice Cream", "Cardamom"],
    spiceLevel: "low",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&auto=format&fit=crop&q=80",
    description: "Fresh Alphonso mango blended into a thick tropical shake.",
  },
  {
    id: "veggie-maharaja",
    name: "Veggie Maharaja Mac",
    category: "veg",
    price: 189,
    ingredients: ["Double Veggie Patty", "Lettuce", "Onions", "Thousand Island", "Sesame Bun"],
    spiceLevel: "medium",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=80",
    description: "The Indian royale — double decker veggie with thousand island.",
    isPopular: true,
  },

  // ── Non-Veg ───────────────────────────────────────────────────────────────
  {
    id: "mcchicken",
    name: "McChicken",
    category: "nonveg",
    price: 119,
    ingredients: ["Crispy Chicken Patty", "Lettuce", "Eggless Mayo", "Sesame Bun"],
    spiceLevel: "low",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&auto=format&fit=crop&q=80",
    description: "Classic crispy chicken burger — simple, satisfying, iconic.",
    isPopular: true,
  },
  {
    id: "chicken-maharaja",
    name: "Chicken Maharaja Mac",
    category: "nonveg",
    price: 229,
    ingredients: ["Double Chicken Patty", "Habanero Sauce", "Lettuce", "Cheese", "Brioche Bun"],
    spiceLevel: "high",
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500&auto=format&fit=crop&q=80",
    description: "The king of burgers — fiery double chicken with habanero cheese.",
    isPopular: true,
  },
  {
    id: "mcspicy-chicken",
    name: "McSpicy Chicken",
    category: "nonveg",
    price: 169,
    ingredients: ["Spicy Chicken Patty", "Lettuce", "Spicy Mayo", "Jalapeños", "Toasted Bun"],
    spiceLevel: "high",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
    description: "Extra spicy chicken patty for those who want the heat.",
  },
  {
    id: "chicken-wrap",
    name: "Grilled Chicken Wrap",
    category: "nonveg",
    price: 149,
    ingredients: ["Grilled Chicken Strips", "Peri Peri Sauce", "Lettuce", "Onions", "Chapati"],
    spiceLevel: "medium",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80",
    description: "Tender grilled chicken wrapped in a soft chapati with peri peri.",
  },
  {
    id: "filet-o-fish",
    name: "Filet-O-Fish",
    category: "nonveg",
    price: 139,
    ingredients: ["Fish Patty", "Tartar Sauce", "Cheese Slice", "Steamed Bun"],
    spiceLevel: "low",
    image: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=500&auto=format&fit=crop&q=80",
    description: "Light, tender fish fillet with tangy tartar sauce on a steamed bun.",
  },

  // ── Jain ─────────────────────────────────────────────────────────────────
  {
    id: "jain-burger",
    name: "Jain Aloo Burger",
    category: "jain",
    price: 69,
    ingredients: ["Jain Aloo Patty", "Lettuce", "Jain Mayo", "No Onion No Garlic Bun"],
    spiceLevel: "low",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=80",
    description: "Specially crafted for Jain dietary needs. No onion, no garlic.",
    isPopular: false,
  },
  {
    id: "jain-wrap",
    name: "Jain Veggie Wrap",
    category: "jain",
    price: 109,
    ingredients: ["Jain Veggie Patty", "Jain Sauce", "Capsicum", "Lettuce", "Plain Roti"],
    spiceLevel: "low",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&auto=format&fit=crop&q=80",
    description: "A clean, flavourful Jain wrap with no onion or garlic.",
  },
  {
    id: "jain-fries",
    name: "Jain Salted Fries",
    category: "jain",
    price: 69,
    ingredients: ["Potato Fries", "Rock Salt", "Jain Approved Seasoning"],
    spiceLevel: "low",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=80",
    description: "Simple golden fries with Jain-certified seasoning, no additives.",
  },
];
