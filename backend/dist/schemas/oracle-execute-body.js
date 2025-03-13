"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeOracleBodySchema = void 0;
exports.executeOracleBodySchema = {
    type: "object",
    properties: {
        resourceId: { type: "string" },
        statement: { type: "string" },
    },
    required: ["resourceId", "statement"],
};
