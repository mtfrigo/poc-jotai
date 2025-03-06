import { Connection } from "@/modules/console/schemas/connection";

export type ListConnectionServiceContract = {
  exec: () => Promise<Connection[]>;
};

export class ListConnectionService implements ListConnectionServiceContract {
  constructor() {}

  static create() {
    return new ListConnectionService();
  }

  async exec(): Promise<Connection[]> {
    const list: Connection[] = [];

    return list;
  }
}
