import {PanelTabs, ConnectionPanels  } from "../models/connection-panels";
import {OraclePanel  } from "../models/oracle-panel";

export async function fetchPanels(user: string, id: string) {
  const panels = await ConnectionPanels.findOne({ connectionId: id });


  if(panels === null) {
    return {
      id,
      user,
      panels: []
    }
  }

  if(panels?.user !== user) {
    throw new Error("User not authorized to access this panels");
  }

  return panels;
}

export async function addPanel({
  user,
  id,
  data
}: {
  user: string,
  id: string,
  data: {
    name: string
  }
}) {
  const panel = new PanelTabs({
    id: data.name,
    label: data.name
  });

  const panels = await ConnectionPanels.findOne({ connectionId: id });

  if (!panels) {
    try {
      const newConnectionPanels = new ConnectionPanels({
        user,
        connectionId: id,
        panels: [panel],
      });
      
       await newConnectionPanels.save();
       return panel.id
    } catch (err) {
      console.log(err);
    } finally {
      return;
    }
  }

  if(panels?.user !== user) {
    throw new Error("User not authorized to access this panels");
  }

  panels.panels.push(panel);
  await panels.save();

  return panel.id;
}

export async function fetchOraclePanel(id: string) {
  const panel = await OraclePanel.findOne({ _id: id });


  return panel;
}

export async function updateOraclePanel({
  id,
  statement,
  executionId,
  schema,
}: {
  id: string;
  executionId: string;
  statement: string;
  schema: string;
}) {
  const  panel = await OraclePanel.findOneAndUpdate(
    { _id: id },
    { statement, schema, executionId},
    { new: true }
  );

  console.log("ATUALIZADO")
  console.log({panel})

  return panel;
}
