import { SendNotification } from "../../types";

export class EmailNotifier implements SendNotification {
  notifyCustomer(email: string, message: string): void {
    console.log("====================================");
    console.log(`Email sent to ${email}: ${message}`);
    console.log("====================================");
  }
}
