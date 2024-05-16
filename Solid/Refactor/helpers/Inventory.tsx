import { Order } from "../types";

var inventory = 100;

export function verifyInventory(order: Order) {
  // Checks inventory levels
  if (inventory < order.quantity) {
    throw new Error("Out of stock");
  }
}
