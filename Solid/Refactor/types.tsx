export type Order = {
  type: string;
  quantity: number;
  amount: number;
  customerEmail: string;
  id: number;
};

export interface Process {
  processOrder(order: Order): void;
}

export interface PaymentService {
  process(amount: number): boolean;
  process(amount: number, priority: string): boolean;
}

export interface SendNotification {
  notifyCustomer(email: string, message: string): void;
}

export interface SaveOrder {
  updateOrderStatus(id: number, status: string): void;
}
