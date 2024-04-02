import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { loginRouteOptions } from "../controller/handlers/loginHandler";
import { registerRouteOptions } from "../controller/handlers/registerHandler";
import { upiRouteOptions } from "../controller/handlers/upiHandler";

async function postRoute(fastify: FastifyInstance) {
  fastify.post("/register", registerRouteOptions);
  fastify.post("/login", loginRouteOptions);
  fastify.post("/upi", upiRouteOptions);
}

export default fp(postRoute);
