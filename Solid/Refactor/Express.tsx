import { verifyInventory } from "./helpers/Inventory";
import {
  Order,
  PaymentService,
  Process,
  SaveOrder,
  SendNotification,
} from "./types";

export class Express implements Process {
  private _paymentService: PaymentService;
  private _notifyService: SendNotification;
  private _saveOrderService: SaveOrder;
  constructor(
    expressPaymentService: PaymentService,
    notifyService: SendNotification,
    saveOrderService: SaveOrder
  ) {
    this._paymentService = expressPaymentService;
    this._notifyService = notifyService;
    this._saveOrderService = saveOrderService;
  }

  processOrder(order: Order) {
    verifyInventory(order);
    this.processExpressPayment(order, "highPriority");
  }

  processExpressPayment(order: Order, priority: string) {
    // Handles express payment processing
    if (this._paymentService.process(order.amount, priority)) {
      return true;
    } else {
      throw new Error("Express payment failed");
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
