import { yup } from "~~/shared/yup";

export type RouteExample = typeof e._type;

const e = defineRPCEventHandler(
  "/api/example",
  yup
    .object({
      data: yup.string().required(),
    })
    .required(),

  async (event, { input }) => {
    console.log("/api/example input", input);
    return { msg: input.data, date: new Date() };
  }
);

export default e.handler;
