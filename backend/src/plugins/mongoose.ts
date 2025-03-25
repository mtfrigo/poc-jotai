import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import mongoose from "mongoose";

export default fp(async function (fastify, opts) {
  const mongoUri = "mongodb://root:example@localhost:27016/mydb?authSource=admin";

  try {
    const db = await mongoose.connect(mongoUri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    fastify.decorate("mongoose", db);

    fastify.addHook("onClose", async () => {
      await mongoose.connection.close();
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
});
