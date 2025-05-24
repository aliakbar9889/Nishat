import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface Product {
  description: string; // Changed from `any` to `string`
  quantity: number; // Changed from `ReactI18NextChildren | Iterable<ReactI18NextChildren>` to `number`
  imageUrl: string | StaticImport;
  slug: string; // Changed from `any` to `string`
  _id: string;
  title: string;
  price: number;
  discount?: number;
  image?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
}