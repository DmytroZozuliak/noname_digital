export interface ApiError {
  status: number;
  data: {
    message: string;
    statusCode: number;
  };
}

export interface NewsResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}
