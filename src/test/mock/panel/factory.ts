import { Panel } from "@/modules/console/schemas/panel";
import { Tab } from "@/modules/console/schemas/tab";
import { faker } from "@faker-js/faker";

export function makePanel(props: Partial<Panel>): Panel
export function makePanel(): Panel
export function makePanel(props?: Partial<Panel>) {
  const data = props ?? {}

  const connection: Panel = {
    tabs: [],
    activeTab: faker.string.uuid(),
    ...data,
  };

  return connection;
};

export function makeTab(): Tab {

  return {
    id: faker.string.uuid(),
    label: faker.person.middleName(),
  }
}
