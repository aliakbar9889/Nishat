import { NextResponse } from "next/server";

// Sample products array with 42 products
const products = [
  { id: 1, name: "kuko", price: 100, discount: 10, stars: 4.5, image: "/MENS 02.png" },
  { id: 2, name: "Product 2", price: 150, discount: 15, stars: 4.0, image: "/WOMEN 01.png" },
  { id: 3, name: "Product 3", price: 200, discount: 20, stars: 4.5, image: "/MENS 03.png" },
  { id: 4, name: "Product 4", price: 250, discount: 25, stars: 5.0, image: "/KIDS 01.png" },
  { id: 5, name: "Product 5", price: 300, discount: 30, stars: 4.2, image: "/MENS 01.png" },
  { id: 6, name: "Product 6", price: 350, discount: 35, stars: 4.8, image: "/WOMEN 02.png" },
  { id: 7, name: "Product 7", price: 400, discount: 40, stars: 4.1, image: "/MENS 04.png" },
  { id: 8, name: "Product 8", price: 450, discount: 45, stars: 4.6, image: "/MENS HOODY 01.png" },
];

// API route handler
export async function GET() {
  return NextResponse.json({ products });
}
