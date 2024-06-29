const mongoose = require("mongoose");

const VisitedUsers =  new mongoose.Schema({
  vistied_at: {
    type: Date,
    default: new Date().toISOString(),
  },
  url_id: {
    type: String,
    required:true
  },
  city: {
    type: String,
    required:true
  },
  device: {
    type: String,
    required:true
  },
  country: {
    type: String,
    required:true
  },
});

const Visiters = mongoose.model("VisitedUsers", VisitedUsers);

module.exports=Visiters;