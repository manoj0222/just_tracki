const User = require("../models/Usermodel");


const createUserService = async (userData) => {
  const { userId,password } = userData;
  console.log("Inside the createUserService")
  const existingUser = await User.findOne({userId:userId});
  if (existingUser) {
    throw new Error("User with the same username or email already exists");
  }
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

const findUserByIdService = async (userId) => {
  console.log("Inside the Method findUserByIdService")
  try {
    const user = await User.findOne({userId:userId});
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error finding user: ${error.message}`);
  }
}


module.exports = {createUserService,findUserByIdService};
