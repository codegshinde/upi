import { Static, Type } from "@sinclair/typebox";

// Define the options object schema with optional properties
const options = Type.Object({
  merchantId: Type.String(),
  amount: Type.Number(),
  mobile: Type.String(),
});

// Define the transaction route schema
export const createUpiTransactionRouteSchema = {
  body: options,
};

// Define the type for the request body
export type CreateUpiRequestBody = Static<typeof options>;
