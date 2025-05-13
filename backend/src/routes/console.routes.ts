import { FastifyInstance } from "fastify";
import {
  fetchPanels,
  fetchOraclePanel,
  addOraclePanel,
  updateOraclePanel
} from "../controllers/console.controller";
import { addConnectionPanelSchema } from "../schemas/add-connection-panel";

export default async function consoleRoutes(fastify: FastifyInstance) {
  fastify.get("/:user/panels/:id", fetchPanels);
  fastify.post(
    "/:user/oracle/:id", 
    { schema: { body: addConnectionPanelSchema } }, 
    addOraclePanel
  );
  fastify.get("/:user/oracle/:id", fetchOraclePanel);
  fastify.put("/:user/oracle/:id", updateOraclePanel);
}
