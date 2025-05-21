// product.js:

const products = [
  {
    name: "OAF Fan Jersey 2025",
    description: "Lightweight practice jersey for intense training sessions",
    price: 899,
    sku: "TW-PR-001",
    discountPrice: 499,
    countInStock: 100,
    category: "Training Wear",
    collection: "Practice",
    brand: "FANCHARGE STORE",
    sizes: ["S","M", "L", "XL"],
    colors: ["Original"],
    material: "Polyester",
    gender: "Men",
    images: [{ url: "/images/srh-practice-jersey.jpg", altText: "SRH Fan Jersey" }]
  },
  
  {
    name: "OAF Travel Duffel Bag",
    description: "Spacious duffel bag with SRH logo for travel and gym",
    price: 1799,
    sku: "AC-CA-003",
    discountPrice: 1599,
    countInStock: 50,
    category: "Accessories",
    collection: "Casual",
    brand: "FANCHARGE STORE",
    colors: ["Black", "Gray"],
    material: "Polyester",
    gender: "Unisex",
    images: [{ url: "/images/srh-duffel-bag.jpg", altText: "SRH Travel Bag" }]
  },
  {
    name: "OAF Denim Casual Shirt",
    description: "Trendy denim shirt for casual outings featuring SRH badge",
    price: 1899,
    sku: "TW-CA-004",
    discountPrice: 1299,
    countInStock: 60,
    category: "Training Wear",
    collection: "Casual",
    brand: "FANCHARGE STORE",
    sizes: ["S","M", "L", "XL"],
    colors: ["Blue"],
    material: "Denim",
    gender: "Men",
    images: [{ url: "/images/srh-denim-shirt.jpg", altText: "SRH Denim Shirt" }]
  },
  {
    name: "OAF Orange Cap Limited",
    description: "Limited edition SRH pink cap supporting breast cancer awareness",
    price: 699,
    sku: "AC-LE-005",
    discountPrice: 399,
    countInStock: 80,
    category: "Accessories",
    collection: "Limited Edition",
    brand: "FANCHARGE STORE",
    colors: ["Orange"],
    material: "Cotton",
    gender: "Unisex",
    images: [{ url: "/images/srh-pink-cap.jpg", altText: "SRH Pink Cap" }]
  },
 
  {
    name: "OAF Silk Scarf",
    description: "Elegant silk scarf with SRH prints",
    price: 1199,
    sku: "AC-CA-007",
    discountPrice: 799,
    countInStock: 30,
    category: "Accessories",
    collection: "Casual",
    brand: "FANCHARGE STORE",
    colors: ["White", "Beige"],
    material: "Silk",
    gender: "Women",
    images: [{ url: "/images/srh-silk-scarf.jpg", altText: "SRH Silk Scarf" }]
  },
  {
    name: "OAF Training Shorts",
    description: "Quick-dry shorts for intensive practice sessions",
    price: 799,
    sku: "TW-PR-008",
    discountPrice: 499,
    countInStock: 110,
    category: "Training Wear",
    collection: "Practice",
    brand: "FANCHARGE STORE",
    sizes: ["M", "L", "XL"],
    colors: ["Gray", "Black"],
    material: "Polyester",
    gender: "Men",
    images: [{ url: "/images/srh-training-shorts.jpg", altText: "SRH Training Shorts" }]
  },
  {
    name: "OAF Collector Bat",
    description: "Miniature bat with signatures of SRH players",
    price: 799,
    sku: "CO-MD-009",
    discountPrice: 449,
    countInStock: 150,
    category: "Collectibles",
    collection: "Match Day",
    brand: "FANCHARGE STORE",
    colors: ["Beige"],
    material: "Wood",
    gender: "Unisex",
    images: [{ url: "/images/srh-collector-bat.jpg", altText: "SRH Collector Bat" }]
  },
 
  {
    name: "OAF Limited Mug",
    description: "24k gold-plated limited edition mug for collectors",
    price: 599,
    sku: "CO-LE-011",
    discountPrice: 349,
    countInStock: 10,
    category: "Collectibles",
    collection: "Limited Edition",
    brand: "SRH Official",
    colors: ["Gold"],
    material: "Ceramic",
    gender: "Unisex",
    images: [{ url: "/images/srh-gold-mug.jpg", altText: "SRH Gold Mug" }]
  },
  {
    name: "OAF Sleeveless Practice Tee",
    description: "Sleeveless T-shirt ideal for practice sessions",
    price: 599,
    sku: "TW-PR-012",
    discountPrice: 399,
    countInStock: 95,
    category: "Training Wear",
    collection: "Practice",
    brand: "FANCHARGE STORE",
    sizes: ["M", "L", "XL"],
    colors: ["Yellow", "Black"],
    material: "Cotton",
    gender: "Men",
    images: [{ url: "/images/srh-practice-tee.jpg", altText: "SRH Practice Sleeveless Tee" }]
  },
 
  {
    name: "OAF Linen Kurta",
    description: "Special SRH-themed linen kurta for ethnic day",
    price: 1799,
    sku: "TW-CA-014",
    discountPrice: 1299,
    countInStock: 50,
    category: "Training Wear",
    collection: "Casual",
    brand: "FANCHARGE STORE",
    sizes: ["M", "L", "XL"],
    colors: ["White", "Beige"],
    material: "Linen",
    gender: "Men",
    images: [{ url: "/images/srh-linen-kurta.jpg", altText: "SRH Linen Kurta" }]
  },
  
  {
    name: "OAF Autograph Book",
    description: "Collector's edition SRH autograph book",
    price: 499,
    sku: "CO-MD-016",
    discountPrice: 249,
    countInStock: 100,
    category: "Collectibles",
    collection: "Match Day",
    brand: "FANCHARGE STORE",
    colors: ["Orange"],
    material: "Paper",
    gender: "Unisex",
    images: [{ url: "/images/srh-autograph-book.jpg", altText: "SRH Autograph Book" }]
  },
 
  
  {
    name: "OAF Hoodie",
    description: "Warm fleece zipper hoodie with SRH branding",
    price: 2499,
    sku: "TW-CA-019",
    discountPrice: 1799,
    countInStock: 60,
    category: "Training Wear",
    collection: "Casual",
    brand: "FANCHARGE STORE",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Gray", "Black"],
    material: "Fleece",
    gender: "Men",
    images: [{ url: "/images/srh-fleece-hoodie.jpg", altText: "SRH Fleece Hoodie" }]
  }, 
  {
    name: "OAF Training T-Shirt",
    description: "Comfortable SRH training T-shirt for practice sessions",
    price: 799,
    sku: "TW-PR-022",
    discountPrice: 699,
    countInStock: 120,
    category: "Training Wear",
    collection: "Practice",
    brand: "FANCHARGE STORE",
    sizes: ["M", "L", "XL","XXL"],
    colors: ["Black", "Gray"],
    material: "Cotton",
    gender: "Men",
    images: [
      { url: "/images/srh-training-shirt.jpg", altText: "SRH Training T-shirt" }
    ]
  },
 
  {
    name: "OAF Official Cap",
    description: "Official SRH team cap with premium embroidery",
    price: 599,
    sku: "AC-MD-024",
    discountPrice: 549,
    countInStock: 200,
    category: "Accessories",
    collection: "Match Day",
    brand: "FANCHARGE STORE",
    sizes: ["M", "L"],
    colors: ["Black", "Orange"],
    material: "Cotton",
    gender: "Unisex",
    images: [
      { url: "/images/srh-official-cap.jpg", altText: "SRH Official Cap Front" }
    ]
  },
  
  
  {
    name: "OAF Collector's Mug",
    description: "Official SRH ceramic mug for the passionate fans",
    price: 399,
    sku: "CO-CA-027",
    discountPrice: 349,
    countInStock: 300,
    category: "Collectibles",
    collection: "Casual",
    brand: "FANCHARGE STORE",
    colors: ["Orange", "White"],
    material: "Ceramic",
    gender: "Unisex",
    images: [
      { url: "/images/srh-collector-mug.jpg", altText: "SRH Collector Mug" }
    ]
  },
  
 
 
  {
    name: "OAF Collector Keychain",
    description: "Exclusive SRH logo keychain for true fans",
    price: 299,
    sku: "CO-MD-031",
    discountPrice: 99,
    countInStock: 200,
    category: "Collectibles",
    collection: "Match Day",
    brand: "FANCHARGE STORE",
    colors: ["Black", "Orange"],
    material: "Metal",
    gender: "Unisex",
    images: [{ url: "/images/srh-keychain.jpg", altText: "SRH Keychain" }]
  },
 
  {
    name: "OAF Velvet Fan Jersey",
    description: "Luxurious velvet jersey for premium fans",
    price: 1799,
    sku: "JR-LE-036",
    discountPrice: 999,
    countInStock: 20,
    category: "Jerseys",
    collection: "Limited Edition",
    brand: "FANCHARGE STORE",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Orange"],
    material: "Velvet",
    gender: "Unisex",
    images: [{ url: "/images/srh-velvet-fan-jersey.jpg", altText: "SRH Velvet Jersey" }]
  },
 
 
  {
    name: "OAF Silk Scarf Limited",
    description: "Limited edition women's SRH scarf",
    price: 1599,
    sku: "AC-LE-039",
    discountPrice: 1199,
    countInStock: 50,
    category: "Accessories",
    collection: "Limited Edition",
    brand: "FANCHARGE STORE",
    colors: ["Pink", "White"],
    material: "Silk",
    gender: "Women",
    images: [{ url: "/images/srh-womens-silk-scarf.jpg", altText: "SRH Women's Silk Scarf" }]
  },
 
 
  {
    name: "OAF Casual Polo Shirt",
    description: "Elegant SRH-themed casual polo for outings",
    price: 899,
    sku: "TW-CA-042",
    discountPrice: 749,
    countInStock: 90,
    category: "Training Wear",
    collection: "Casual",
    brand: "FANCHARGE STORE",
    sizes: ["S","M", "L", "XL"],
    colors: ["White", "Navy"],
    material: "Cotton",
    gender: "Men",
    images: [{ url: "/images/srh-polo-shirt.jpg", altText: "SRH Polo Shirt" }]
  },
 
 
 
]

module.exports = products;
