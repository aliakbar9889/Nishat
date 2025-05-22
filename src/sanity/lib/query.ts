import {groq} from 'next-sanity';

export const allproducts = groq`*[_type == "product"]`;

export const mensProductsQuery = `*[_type == "mensProduct"]{
  _id,
  title,
  price,
  discount,
  image
}`;

export const womenProductsQuery = `*[_type == "womenProduct"]{
  _id,
  title,
  price,
  discount,
  image
}`;

export const kidProductsQuery = `*[_type == "kidProduct"]{
  _id,
  title,
  price,
  discount,
  image
}`;
export const kidHoodiesQuery = `*[_type == "kidHoodies"]{
  _id,
  title,
  price,
  discount,
  image
}`;
export const MenHoodiesQuery = `*[_type == "menHoodies"]{
  _id,
  title,
  price,
  discount,
  image
}`;
export const WomenHoodiesQuery = `*[_type == "womenHoodies"]{
  _id,
  title,
  price,
  discount,
  image
}`;