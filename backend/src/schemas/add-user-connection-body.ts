export const addUserConnectionSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    flavor: { type: "string" },
    favorite: { type: "boolean" },
  },
  required: ["name", "flavor"],
};
