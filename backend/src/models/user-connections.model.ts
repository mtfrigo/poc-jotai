import mongoose from "mongoose";



 const ConnectionSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    flavor: {
      type: String,
      enum: ["ORACLE", "MONGO", "KAFKA"],
      required: true,
    },
    favorite: {
      type: Boolean,
      required: false,
    },
  });

  
const UserConnectionsSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    connections: [ConnectionSchema],
  },
  {
    versionKey: false, // Removes the __v field
    toJSON: {
      virtuals: true, // Ensures virtual fields are included when calling toJSON()
      transform: (_, ret) => {
        ret.id = ret._id.toString(); // Convert _id to string
        delete ret._id; // Remove _id from the output
      },
    },
    toObject: {
      virtuals: true, // Ensures virtual fields are included when calling toObject()
      transform: (_, ret) => {
        ret.id = ret._id.toString(); // Convert _id to string
        delete ret._id; // Remove _id from the output
      },
    },
  }
);

export const Connections = mongoose.model("Connections", ConnectionSchema);
export const UserConnections = mongoose.model("UserConnections", UserConnectionsSchema);
