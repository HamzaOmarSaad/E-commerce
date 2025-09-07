export interface IOrder {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: OrderCartItem[];
  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface OrderCartItem {
  count: number;
  price: number;
  product: OrderProduct;
}

export interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
  category: {
    name: string;
  };
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface OrdersResponse {
  status: string;
  results: number;
  data: IOrder[];
  error?: string;
}
