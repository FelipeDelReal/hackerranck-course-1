import { getInstance } from "./helpers/Factory/ProcessFactory";

class SystemManager {
  processOrder(order) {
    let process = getInstance(order);

    if (process != null) {
      process.processOrder(order);
    }
  }
}
