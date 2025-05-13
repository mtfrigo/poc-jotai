import fastify from "fastify";

import mongoosePlugin from "./src/plugins/mongoose";
import rabbitPlugin from "./src/plugins/rabbitmq";
import rabbitConsumerPlugin from "./src/plugins/rabbitmq-consumer";
import exampleRoutes from "./src/routes/example.routes";
import executionRoutes from "./src/routes/execution.routes";
import teamRoutes from "./src/routes/teams.routes";
import userConnectionsRoutes from "./src/routes/user-connections.routes";
import consoleRoutes from "./src/routes/console.routes";
import cors from "@fastify/cors";

export const app = fastify();

app.register(cors, {
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include PUT method
});

app.register(mongoosePlugin);
app.register(rabbitPlugin);
app.register(rabbitConsumerPlugin);

app.register(exampleRoutes, { prefix: "/" });
app.register(executionRoutes, { prefix: "/execution" });
app.register(teamRoutes, { prefix: "/team" });
app.register(userConnectionsRoutes, { prefix: "/connections" });
app.register(consoleRoutes, { prefix: "/console" });

app.listen({ port: 8080, host: "0.0.0.0" }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
