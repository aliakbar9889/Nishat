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
  { id: 9, name: "Product 9", price: 500, discount: 50, stars: 4.3, image: "/KIDS 02.png" },
  { id: 10, name: "Product 10", price: 550, discount: 55, stars: 4.9, image: "/KIDS 03.png" },
  { id: 11, name: "Product 11", price: 600, discount: 60, stars: 4.4, image: "/WOMEN 03.png" },
  { id: 12, name: "Product 12", price: 650, discount: 65, stars: 4.7, image: "/WOMEN 04.png" },
  { id: 13, name: "Product 13", price: 700, discount: 70, stars: 5.0, image: "/MENS 05.png" },
  { id: 14, name: "Product 14", price: 750, discount: 75, stars: 4.0, image: "/KIDS 04.png" },
  { id: 15, name: "Product 15", price: 800, discount: 80, stars: 4.8, image: "/MENS HOODY 02.png" },
  { id: 16, name: "Product 16", price: 850, discount: 85, stars: 4.5, image: "/WOMEN HOODY 01.png" },
  { id: 17, name: "Product 17", price: 900, discount: 90, stars: 4.2, image: "/WOMEN HOODY 02.png" },
  { id: 18, name: "Product 18", price: 950, discount: 95, stars: 4.6, image: "KIDS HOODY 01.png" },
  { id: 19, name: "Product 19", price: 1000, discount: 100, stars: 4.3, image: "/KIDS HOODY 02.png" },
  { id: 20, name: "Product 20", price: 1050, discount: 105, stars: 4.9, image: "/KIDS HOODY 03.png" },
  { id: 21, name: "Product 21", price: 1100, discount: 110, stars: 4.0, image: "/KIDS 05.png" },
  { id: 22, name: "Product 22", price: 1150, discount: 115, stars: 4.4, image: "/MENS 06.png" },
  { id: 23, name: "Product 23", price: 1200, discount: 120, stars: 4.5, image: "/MENS 07.png" },
  { id: 24, name: "Product 24", price: 1250, discount: 125, stars: 4.7, image: "/MENS 08.png" },
  { id: 25, name: "Product 25", price: 1300, discount: 130, stars: 5.0, image: "/WOMEN 05.png" },
  { id: 26, name: "Product 26", price: 1350, discount: 135, stars: 4.3, image: "/WOMEN 06.png" },
  { id: 27, name: "Product 27", price: 1400, discount: 140, stars: 4.8, image: "/WOMEN 07.png" },
  { id: 28, name: "Product 28", price: 1450, discount: 145, stars: 4.6, image: "/WOMEN 08.png" },
  { id: 29, name: "Product 29", price: 1500, discount: 150, stars: 4.2, image: "/KIDS 06.png" },
  { id: 30, name: "Product 30", price: 1550, discount: 155, stars: 4.5, image: "/KDS 07.png" },
  { id: 31, name: "Product 31", price: 1600, discount: 160, stars: 4.7, image: "/WOMEN HOODY 03.png" },
  { id: 32, name: "Product 32", price: 1650, discount: 165, stars: 4.4, image: "/WOMEN HOODY 04.png" },
  { id: 33, name: "Product 33", price: 1700, discount: 170, stars: 4.8, image: "/WOMEN HOODY 05.png" },
  { id: 34, name: "Product 34", price: 1750, discount: 175, stars: 4.6, image: "/KIDS HOODY 04.png" },
  { id: 35, name: "Product 35", price: 1800, discount: 180, stars: 4.2, image: "/KIDS HOODY 05.png" },
  { id: 36, name: "Product 36", price: 1850, discount: 185, stars: 5.0, image: "/KIDS HOODY 06.png" },
  { id: 37, name: "Product 37", price: 1900, discount: 190, stars: 4.3, image: "/MENS HOODY 03.png" },
  { id: 38, name: "Product 38", price: 1950, discount: 195, stars: 4.4, image: "/MENS HOODY 04.png" },
  { id: 39, name: "Product 39", price: 2000, discount: 200, stars: 4.7, image: "/WOMEN HOODY 06.png" },
  { id: 40, name: "Product 40", price: 2050, discount: 205, stars: 4.5, image: "/MEN HOODY 02.png" },
  { id: 41, name: "Product 41", price: 2100, discount: 210, stars: 4.1, image: "/KIDS HOODY 01.png" },
  { id: 42, name: "Product 42", price: 2150, discount: 215, stars: 4.6, image: "/MEN HOODY 03.png" },
];

// API route handler
export async function GET() {
  return NextResponse.json({ products });
}
