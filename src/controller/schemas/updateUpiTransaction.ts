import { Static, Type } from "@sinclair/typebox";

// Define the options object schema with optional properties
const options = Type.Object({
  packageName: Type.String(),
  title: Type.String(),
  text: Type.String(),
});

// Define the transaction route schema
export const updateUpiTransactionRouteSchema = {
  body: options,
};

// Define the type for the request body
export type UpdateUpiRequestBody = Static<typeof options>;
