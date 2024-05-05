export interface Product {
  _id: string;
  title: string;
  category: { name: string };
  description: string;
  ratingsQuantity: number;
  price: number;
  quantity: number;
  image: string;
  imageCover: string;
}
