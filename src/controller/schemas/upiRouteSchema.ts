import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  packageName: Type.String(),
  title: Type.String(),
  text: Type.String(),
});

export const upiRouteSchema = {
  body: options,
};

export type UpiRouteRequestBody = Static<typeof options>;
