import { PaymentService } from "../../types";

export class ExpressPayment implements PaymentService {
  process(amount: number): boolean;
  process(amount: number, priority: string): boolean;
  process(amount: unknown, priority?: unknown): boolean {
    return true;
  }
}
