import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { RegisterRouteBody, registerRouteSchema } from "../schemas/registerSchema";

interface DataTypes extends RegisterRouteBody {
  userId: string;
}
/**
 * Handles the registration request.
 * @param { FastifyRequest } request - The Fastify request object.
 * @param { FastifyReply } response - The Fastify response object.
 * @returns { Promise<void> } A promise that resolves once the handler is complete.
 */
async function registerHandler(request: FastifyRequest, response: FastifyReply): Promise<void> {
  const data = <DataTypes>request.body;
  try {
    const mobile = await request.getDocument({ mobile: data.mobile });
    if (mobile) {
      throw new Error("Mobile number already exists");
    }
    const email = await request.getDocument({ email: data.email });
    if (email) {
      throw new Error("Email address already exists");
    }

    data.password = await request.hashPassword(data.password);
    data.userId = await request.createUniqId(data.firstName, data.lastName);

    const user = await request.createDocument(data);

    delete user.password;
    response.send({
      user: user,
      message: "new user registered successfully.",
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Options for the registration route.
 * Combines the route schema with the handler.
 * @type { RouteShorthandOptionsWithHandler }
 */
export const registerRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: registerRouteSchema,
  handler: registerHandler,
};
