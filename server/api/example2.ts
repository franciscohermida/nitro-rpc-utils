export type RouteExample2 = typeof e._type;

const e = defineRPCEventHandler(
  "/api/example2",
  undefined,

  async (event) => {
    const users = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
      { name: "Bob", age: 35 },
    ];
    return users;
  }
);

export default e.eventHandler;
