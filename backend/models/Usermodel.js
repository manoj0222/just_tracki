
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


const User = mongoose.model("UserSchema", UserSchema);

module.exports=User;