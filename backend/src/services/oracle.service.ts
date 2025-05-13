import { OraclePanel } from "../models/oracle-panel";


export async function addPanel({
  id,
  connectionId
}: {
  id: string,
  connectionId: string,
}) {
  const panel = new OraclePanel({
    _id: id,
    connectionId: connectionId,
    flavor: 'ORACLE'
  });

  const entry =   await panel.save()

  return entry;
}