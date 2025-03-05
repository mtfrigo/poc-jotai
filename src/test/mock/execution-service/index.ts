import {
  ExecuteServiceContract,
  ExecuteBody,
} from "@/data/execution-service/execution.contracts";
import { faker } from "@faker-js/faker";

export class InMemoryExecuteService implements ExecuteServiceContract {
  async exec(body: ExecuteBody) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const headers = ["First Name", "Sign", "Gender"];

    const numberOfRows = faker.number.int({ min: 1, max: 15 });

    return {
      headers,
      rows: Array.from({ length: numberOfRows }).map(() => ({
        [headers[0]]: faker.person.firstName(),
        [headers[1]]: faker.person.zodiacSign(),
        [headers[2]]: faker.person.gender(),
      })),
    };
  }
}
