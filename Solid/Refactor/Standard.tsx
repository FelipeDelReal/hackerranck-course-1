import { verifyInventory } from "./helpers/Inventory";
import {
  Order,
  PaymentService,
  Process,
  SaveOrder,
  SendNotification,
} from "./types";

export class Standard implements Process {
  private _paymentService: PaymentService;
  private _notifyService: SendNotification;
  private _saveOrderService: SaveOrder;
  constructor(
    paymentService: PaymentService,
    notifyService: SendNotification,
    saveOrderService: SaveOrder
  ) {
    this._paymentService = paymentService;
    this._notifyService = notifyService;
    this._saveOrderService = saveOrderService;
  }
  processOrder(order: Order) {
    verifyInventory(order);
    this.processStandardPayment(order);
    this.updateOrderStatus(order, "processed");
    this.notifyCustomer(order);
  }

  processStandardPayment(order: Order) {
    // Handles standard payment processing
    if (this._paymentService.process(order.amount)) {
      return true;
    } else {
      throw new Error("Payment failed");
    }
  }

  notifyCustomer(order: Order) {
    // Sends an email notification to the customer
    this._notifyService.notifyCustomer(
      order.customerEmail,
      "Your order has been processed."
    );
  }

  updateOrderStatus(order: Order, status) {
    // Updates the order status in the database
    this._saveOrderService.updateOrderStatus(order.id, status);
  }
}
