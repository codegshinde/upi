import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  name: Type.String(),
  displayName: Type.String(),
  email: Type.String(),
  mobile: Type.String(),
  password: Type.String(),
  city: Type.String(),
});

export const merchantRouteSchema = {
  body: options,
};

export type MerchantRouteRequestBody = Static<typeof options>;
