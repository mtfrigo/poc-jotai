import { Connection } from "@/modules/console/schemas/connection";
import { faker } from "@faker-js/faker";

export function makeConnection(props: Partial<Connection>): Connection
export function makeConnection(): Connection
export function makeConnection(props?: Partial<Connection>) {
  const data = props ?? {}

  const connection: Connection = {
    id: faker.string.uuid(),
    name: `${faker.commerce.product()}Database`,
    flavor: faker.helpers.arrayElement([
      "MONGO",
      "ORACLE",
      // "POSTGRES",
      // "MYSQL",
    ]),
    ...data
  };

  return connection;
};

