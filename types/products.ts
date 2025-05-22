import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Product {
  description: any;
  quantity: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
  imageUrl: string | StaticImport;
  slug: any;
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
