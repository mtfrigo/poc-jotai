import { OracleConsole } from "@/modules/console/schemas/console";
import { faker } from "@faker-js/faker";

export function makeOracleConsole(data: Partial<OracleConsole>): OracleConsole
export function makeOracleConsole(): OracleConsole
export function makeOracleConsole(console?: Partial<OracleConsole>) {
    const data = console ?? {};

    const oracleConsole: OracleConsole = {
        status: 'IDLE',
        flavor: 'ORACLE',
        id: faker.string.uuid(),
        statement: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        ...data,
      };

      return oracleConsole;
    

}