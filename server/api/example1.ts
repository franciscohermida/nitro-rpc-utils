import { yup } from "~~/shared/yup";

export type RouteExample1 = typeof e._type;

const e = defineRPCEventHandler(
  "/api/example1",
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

export default e.eventHandler;
