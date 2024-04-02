import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String({ format: "email" }),
  mobile: Type.String({ pattern: "^[0-9]{10}$" }),
  password: Type.RegExp(`^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$`),
  address: Type.Object({
    district: Type.String(),
    subDistrict: Type.String(),
    village: Type.Optional(Type.String()),
    postalCode: Type.String({ pattern: "^[0-9]{6}$" }),
  }),
});

export const registerRouteSchema = {
  body: options,
};

export type RegisterRouteBody = Static<typeof options>;
