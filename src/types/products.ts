import { ReactNode, Key } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Product {
  name: ReactNode;               // ReactNode is best for React children or text
  id: Key | null | undefined;    // React's Key type
  quantity: number;              // Only one quantity field as number
  description: ReactNode;        // Same as name
  imageUrl: string | StaticImport;
  slug: string;                  // Define proper slug type, not any
  _id: string;
  title: string;
  price: number;
  discount?: number;
  image?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}
