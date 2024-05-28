import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  orderId: Type.String(),
});

export const upiUpdateStatusSchema = {
  body: options,
};

export type UpiUpdateStatusSchema = Static<typeof options>;
