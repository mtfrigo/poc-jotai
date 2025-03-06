import { Connection } from "@/modules/console/schemas/connection";
import { faker } from "@faker-js/faker";

export const generateNewConnection = () => {
  const connection: Connection = {
    id: faker.string.uuid(),
    name: `${faker.commerce.product()}Database`,
    flavor: faker.helpers.arrayElement([
      "MONGO",
      "ORACLE",
      // "POSTGRES",
      // "MYSQL",
    ]),
    console: null,
  };

  return connection;
};
