export const fetchExeuctionBodySchema = {
  type: "object",
  properties: {
    executionId: { type: "string" },
  },
  required: ["executionId"],
};
