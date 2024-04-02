import { FastifyMongoObject } from "@fastify/mongodb";
import { FastifyInstance, FastifyRequest } from "fastify";
import { CreateDocument } from "./services/createDocument";
import { GetDocument } from "./services/getDocument";
import { CreateUniqId } from "./utils/createUniqId";
import { HashPassword } from "./utils/hashPassword";
import { ComparePassword } from "./utils/comparePassword";
import { FastifyJwtSignOptions } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    hashPassword: HashPassword;
    comparePassword: ComparePassword;
    createDocument: CreateDocument;
    getDocument: GetDocument;
    createUniqId: CreateUniqId;
    signJWT: (payload: Record<string, string | any>) => string;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    config: {
      DATABASE_URI: string;
      JWT_SECRET: string;
    };
  }
}
