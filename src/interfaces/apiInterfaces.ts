export interface ApiError {
  status: number;
  data: {
    message: string;
    statusCode: number;
  };
}
export interface GoodsResponse {
  limit: number;
  products: GoodsResponseData[];
  skip: number;
  total: number;
}
export interface GoodsResponseData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
