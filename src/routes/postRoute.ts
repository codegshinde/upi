import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { createUpiTransactionRouteOptions } from "../controller/handlers/createUpiTransactionHandler";
import { loginRouteOptions } from "../controller/handlers/loginHandler";
import { registerRouteOptions } from "../controller/handlers/registerHandler";
import { updateUpiTransactionRouteOptions } from "../controller/handlers/updateUpiTransaction";
import { upiRouteOptions } from "../controller/handlers/upiHandler";

async function postRoute(fastify: FastifyInstance) {
  fastify.post("/register", registerRouteOptions);
  fastify.post("/login", loginRouteOptions);
  fastify.post("/upi", upiRouteOptions);

  fastify.post("/upi/create", createUpiTransactionRouteOptions);

  fastify.patch("/upi/update", updateUpiTransactionRouteOptions);
}

export default fp(postRoute);
