import { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import fp from "fastify-plugin";

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URI as string);
    console.log("Connected to MongoDB ✔");
  } catch (error) {
    throw new Error(`Error connecting to database: ${error}`);
  }
}

async function disconnectDatabase() {
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

const databasePlugin = async (fastify: FastifyInstance) => {
  await connectToDatabase();
  fastify.addHook("onClose", disconnectDatabase);
};

export default fp(databasePlugin);
