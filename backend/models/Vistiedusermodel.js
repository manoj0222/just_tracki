import mongoose from "mongoose";

const VisitedUsers = new mongoose.Schema({
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
  url_id: {
    type: String,
  },
  city: {
    type: String,
  },
  device: {
    type: String,
  },
  country: {
    type: String,
  },
});

export const Visiters = mongoose.model("VisitedUsers", VisitedUsers);
