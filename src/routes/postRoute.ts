import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { createUpiTransactionRouteOptions } from "../controller/handlers/createUpiTransactionHandler";
import { loginRouteOptions } from "../controller/handlers/loginHandler";
import { createMerchantRouteOptions } from "../controller/handlers/merchantHandler";
import { registerRouteOptions } from "../controller/handlers/registerHandler";
import { updateUpiTransactionRouteOptions } from "../controller/handlers/updateUpiTransaction";
import { upiRouteOptions } from "../controller/handlers/upiHandler";
import { upiTransactionStatusRouteOptions } from "../controller/handlers/upiTransactionStatusHandler";

async function postRoute(fastify: FastifyInstance) {
  fastify.post("/register", registerRouteOptions);
  fastify.post("/login", loginRouteOptions);
  fastify.post("/upi", upiRouteOptions);
  fastify.post("/upi/create", createUpiTransactionRouteOptions);
  fastify.post("/upi/update", updateUpiTransactionRouteOptions);
  fastify.post("/merchant/register", createMerchantRouteOptions);

  fastify.post("/upi/transaction/status", upiTransactionStatusRouteOptions);
}

export default fp(postRoute);
