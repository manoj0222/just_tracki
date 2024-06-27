const { createUserService, findUserByIdService } = require('../service/IUserServiceImpl');



const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    let message = 'Error creating user';
    if (error.code === 11000) {
      message = 'Username or email already exists';
    }
    else {
      message = error.message || message;
    }
    res.status(500).json({ message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserByIdService(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, getUserById };