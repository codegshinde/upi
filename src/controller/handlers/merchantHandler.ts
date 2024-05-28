import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { Merchant } from "../../models/Merchant";
import { MerchantRouteRequestBody, merchantRouteSchema } from "../schemas/createMerchantSchema";

// Define the handler function for creating a merchant
async function createMerchantHandler(request: FastifyRequest, response: FastifyReply) {
  try {
    const body = request.body as MerchantRouteRequestBody;

    // Check if the mobile number already exists
    const existingMerchantMobile = await Merchant.findOne({ mobile: body.mobile });
    
    if (existingMerchantMobile) {
      return response.status(400).send({ status: "error", message: "Mobile Number Already Exists" });
    }

    // Check if the email address already exists
    const existingMerchantEmail = await Merchant.findOne({ email: body.email });
    if (existingMerchantEmail) {
      return response.status(400).send({ status: "error", message: "Email Address Already Exists" });
    }

    // Hash the password before saving
    const hashedPassword = await request.hashPassword(body.password);
    body.password = hashedPassword;

    // Create a new merchant instance and save it to the database
    const newMerchant = new Merchant(body);
    await newMerchant.save();

    // Send a success response with the created merchant
    response.send({ status: "success", merchant: newMerchant });
  } catch (error) {
    // Log the error and send a generic error response
    request.log.error(error);
    response.status(500).send({ status: "error", message: "Internal Server Error" });
  }
}

// Define the route options including schema and handler
export const createMerchantRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: merchantRouteSchema,
  handler: createMerchantHandler,
};
