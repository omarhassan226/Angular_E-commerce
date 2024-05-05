import { Product } from '../../products/models/product';

export interface Review {
  _id: string;
  reviewDetails: string;
  user: { name: string; image: string; _id: string };
  product: string;
  rating: number;
}
