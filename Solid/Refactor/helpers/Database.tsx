import { SaveOrder } from "../types";

export class Database implements SaveOrder {
  updateOrderStatus(id: number, status: string): void {
    console.log("====================================");
    console.log("Order status updated");
    console.log("====================================");
  }
}
