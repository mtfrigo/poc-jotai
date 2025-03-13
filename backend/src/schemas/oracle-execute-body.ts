export const executeOracleBodySchema = {
  type: "object",
  properties: {
    resourceId: { type: "string" },
    statement: { type: "string" },
  },
  required: ["resourceId", "statement"],
};
