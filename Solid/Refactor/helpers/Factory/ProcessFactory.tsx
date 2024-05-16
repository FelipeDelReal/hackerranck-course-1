import { Express } from "../../Express";
import { Standard } from "../../Standard";
import { EmailNotifier } from "../Notifier/EmailNotifier";
import { ExpressPayment } from "../Payment/ExpressPayment";
import { Payment } from "../Payment/Payment";
import { Database } from "../Database";

export function getInstance(order) {
  if (order.type == "standard") {
    return new Standard(new Payment(), new EmailNotifier(), new Database());
  } else if (order.type == "express") {
    return new Express(
      new ExpressPayment(),
      new EmailNotifier(),
      new Database()
    );
  }
}
