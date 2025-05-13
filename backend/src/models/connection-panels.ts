import mongoose from "mongoose";



 const PanelTabSchema = new mongoose.Schema({
    label: {
      type: String,
      required: true,
    }
  }, {
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
  });

  
const ConnectionPanelsSchema = new mongoose.Schema(
  {
    connectionId: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    panels: [PanelTabSchema],
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

export const PanelTabs = mongoose.model("PanelTab", PanelTabSchema);
export const ConnectionPanels = mongoose.model("ConnectionPanels", ConnectionPanelsSchema);
