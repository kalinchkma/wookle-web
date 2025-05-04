
export const sampleProducts = [
  {
    id: "product_1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life",
    fullDescription: "Experience immersive sound with our premium wireless headphones. Featuring advanced noise-cancellation technology, these headphones block out ambient noise so you can focus on your music. With a comfortable over-ear design and soft cushioning, you can wear them all day. The built-in microphone allows for clear calls, and the 30-hour battery life ensures your music keeps playing as long as you need it to.",
    price: 129.99,
    discount: 15,
    rating: 4.7,
    reviews: 245,
    category: "Electronics",
    inStock: true,
    featured: true,
    freeShipping: true,
    options: {
      Color: ["Black", "White", "Blue"],
      Size: ["Standard"]
    },
    features: [
      "Active noise cancellation",
      "30-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
      "Comfortable over-ear design"
    ],
    specifications: [
      { name: "Brand", value: "SoundMaster" },
      { name: "Model", value: "SM-WH100" },
      { name: "Battery Life", value: "30 hours" },
      { name: "Connectivity", value: "Bluetooth 5.0" },
      { name: "Weight", value: "250g" }
    ],
    seller: "AudioTech",
    sellerRating: 4.8,
    sellerSales: 1250,
    createdAt: "2023-04-15T10:30:00Z",
    sales: 189
  },
  {
    id: "product_2",
    name: "Smart Fitness Tracker",
    description: "Track your health metrics and stay connected with notifications",
    price: 79.99,
    discount: 0,
    rating: 4.5,
    reviews: 187,
    category: "Fitness",
    inStock: true,
    featured: true,
    freeShipping: true,
    seller: "FitGear",
    sellerRating: 4.6,
    sellerSales: 980,
    createdAt: "2023-05-20T14:45:00Z",
    sales: 156
  },
  {
    id: "product_3",
    name: "Organic Cotton T-Shirt",
    description: "Soft, sustainable, and stylish everyday t-shirt",
    price: 24.99,
    discount: 10,
    rating: 4.3,
    reviews: 112,
    category: "Clothing",
    inStock: true,
    featured: false,
    freeShipping: false,
    seller: "EcoWear",
    sellerRating: 4.7,
    sellerSales: 750,
    createdAt: "2023-06-10T09:15:00Z",
    sales: 98
  },
  {
    id: "product_4",
    name: "Professional Chef Knife Set",
    description: "5-piece premium stainless steel knife set for cooking enthusiasts",
    price: 149.99,
    discount: 20,
    rating: 4.9,
    reviews: 78,
    category: "Kitchen",
    inStock: true,
    featured: true,
    freeShipping: true,
    seller: "CulinaryPro",
    sellerRating: 4.9,
    sellerSales: 430,
    createdAt: "2023-03-05T11:20:00Z",
    sales: 67
  },
  {
    id: "product_5",
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 360° sound and 12-hour playtime",
    price: 59.99,
    discount: 0,
    rating: 4.4,
    reviews: 203,
    category: "Electronics",
    inStock: true,
    featured: false,
    freeShipping: true,
    seller: "AudioTech",
    sellerRating: 4.8,
    sellerSales: 1250,
    createdAt: "2023-07-22T16:30:00Z",
    sales: 178
  },
  {
    id: "product_6",
    name: "Leather Crossbody Bag",
    description: "Stylish genuine leather bag with adjustable strap",
    price: 89.99,
    discount: 5,
    rating: 4.6,
    reviews: 95,
    category: "Accessories",
    inStock: true,
    featured: true,
    freeShipping: false,
    seller: "FashionStyle",
    sellerRating: 4.5,
    sellerSales: 620,
    createdAt: "2023-02-18T13:45:00Z",
    sales: 82
  },
  {
    id: "product_7",
    name: "Smart Home Security Camera",
    description: "HD camera with motion detection and two-way audio",
    price: 119.99,
    discount: 0,
    rating: 4.2,
    reviews: 156,
    category: "Home",
    inStock: false,
    featured: false,
    freeShipping: true,
    seller: "SmartTech",
    sellerRating: 4.4,
    sellerSales: 890,
    createdAt: "2023-08-30T10:15:00Z",
    sales: 134
  },
  {
    id: "product_8",
    name: "Yoga Mat with Carrying Strap",
    description: "Non-slip, eco-friendly exercise mat for yoga and fitness",
    price: 34.99,
    discount: 0,
    rating: 4.7,
    reviews: 210,
    category: "Fitness",
    inStock: true,
    featured: true,
    freeShipping: false,
    seller: "FitGear",
    sellerRating: 4.6,
    sellerSales: 980,
    createdAt: "2023-01-25T09:30:00Z",
    sales: 195
  },
  {
    id: "product_9",
    name: "Stainless Steel Water Bottle",
    description: "Vacuum insulated bottle that keeps drinks cold for 24 hours",
    price: 29.99,
    discount: 0,
    rating: 4.8,
    reviews: 175,
    category: "Kitchen",
    inStock: true,
    featured: false,
    freeShipping: true,
    seller: "EcoWare",
    sellerRating: 4.7,
    sellerSales: 720,
    createdAt: "2023-09-12T14:20:00Z",
    sales: 163
  },
  {
    id: "product_10",
    name: "Wireless Charging Pad",
    description: "Fast-charging Qi-compatible wireless charger for smartphones",
    price: 39.99,
    discount: 25,
    rating: 4.3,
    reviews: 128,
    category: "Electronics",
    inStock: true,
    featured: true,
    freeShipping: true,
    seller: "TechGadgets",
    sellerRating: 4.5,
    sellerSales: 1050,
    createdAt: "2023-04-05T11:45:00Z",
    sales: 117
  },
  {
    id: "product_11",
    name: "Ceramic Plant Pot Set",
    description: "Set of 3 decorative pots in different sizes for indoor plants",
    price: 49.99,
    discount: 0,
    rating: 4.6,
    reviews: 87,
    category: "Home",
    inStock: true,
    featured: false,
    freeShipping: false,
    seller: "HomeDecor",
    sellerRating: 4.8,
    sellerSales: 540,
    createdAt: "2023-06-28T15:10:00Z",
    sales: 76
  },
  {
    id: "product_12",
    name: "Organic Skincare Gift Set",
    description: "Natural face wash, moisturizer, and serum in a beautiful gift box",
    price: 69.99,
    discount: 10,
    rating: 4.9,
    reviews: 92,
    category: "Beauty",
    inStock: true,
    featured: true,
    freeShipping: true,
    seller: "NaturalBeauty",
    sellerRating: 4.9,
    sellerSales: 380,
    createdAt: "2023-05-15T12:30:00Z",
    sales: 85
  }
];

export const sampleCategories = [
  { id: 1, name: "Electronics", count: 3 },
  { id: 2, name: "Fitness", count: 2 },
  { id: 3, name: "Clothing", count: 1 },
  { id: 4, name: "Kitchen", count: 2 },
  { id: 5, name: "Accessories", count: 1 },
  { id: 6, name: "Home", count: 2 },
  { id: 7, name: "Beauty", count: 1 }
];

export const sampleTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Customer",
    rating: 5,
    comment: "I've been shopping on ShopZone for over a year now and I'm always impressed with the quality of products and the fast shipping. The customer service is excellent too!"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Verified Buyer",
    rating: 4,
    comment: "Great marketplace with a wide variety of products. I've found items here that I couldn't find anywhere else. The seller verification process gives me confidence in my purchases."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Seller & Buyer",
    rating: 5,
    comment: "As both a seller and buyer on ShopZone, I can say that the platform is incredibly user-friendly. The selling tools are powerful and the buying experience is smooth. Highly recommend!"
  }
];

export const sampleOrders = [
  {
    id: "10001",
    customer: "John Smith",
    email: "john.smith@example.com",
    date: "2023-10-15",
    amount: 129.99,
    status: "Completed"
  },
  {
    id: "10002",
    customer: "Emma Johnson",
    email: "emma.j@example.com",
    date: "2023-10-14",
    amount: 79.99,
    status: "Shipped"
  },
  {
    id: "10003",
    customer: "Michael Brown",
    email: "m.brown@example.com",
    date: "2023-10-13",
    amount: 149.99,
    status: "Processing"
  },
  {
    id: "10004",
    customer: "Sophia Williams",
    email: "sophia.w@example.com",
    date: "2023-10-12",
    amount: 59.99,
    status: "Cancelled"
  },
  {
    id: "10005",
    customer: "James Davis",
    email: "james.d@example.com",
    date: "2023-10-11",
    amount: 89.99,
    status: "Completed"
  }
];

export const sampleSellerStats = {
  sales: 5240.50,
  salesTrend: 12.5,
  orders: 128,
  ordersTrend: 8.2,
  products: 36,
  productsTrend: 4.1,
  customers: 95,
  customersTrend: 15.3
};
