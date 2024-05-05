export interface IProduct {
  productId: any;
  total: any;
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  description: string;
  category: { name: string };
  quantity: number;
  ratingsAverage: number;
  image: string;
  ratingsQuantity: number;
}
