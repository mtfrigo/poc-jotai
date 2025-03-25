import {
  OracleExecuteBody,
  OracleExecuteServiceContract,
  FetchExecutionServiceContract,
} from "@/modules/console/api/execution/execution.contracts";
import { generateUUID } from "@/shared/libs/uuid";
import { faker } from "@faker-js/faker";

export const successfulOracleExecutionServiceMock: OracleExecuteServiceContract =
  {
    exec: () =>
      Promise.resolve({
        createdAt: new Date(),
        flavor: "ORACLE",
        id: generateUUID(),
        resourceId: "X",
        status: "PENDING",
      }),
  };

export const successfulFetchExecutionServiceMock: FetchExecutionServiceContract =
  {
    exec: () =>
      Promise.resolve({
        createdAt: new Date(),
        flavor: "MONGO",
        id: generateUUID(),
        resourceId: "X",
        status: "SUCCESS",
        finishedAt: new Date(),
      }),
  };

export class InMemoryOracleExecuteService
  implements OracleExecuteServiceContract
{
  async exec(body: OracleExecuteBody) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const headers = ["First Name", "Sign", "Sex"];

    const numberOfRows = faker.number.int({ min: 1, max: 15 });

    return {
      headers,
      rows: Array.from({ length: numberOfRows }).map(() => ({
        [headers[0]]: faker.person.firstName(),
        [headers[1]]: faker.person.zodiacSign(),
        [headers[2]]: faker.person.sex(),
      })),
    };
  }
}
