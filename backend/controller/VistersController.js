const visitedUsersService = require('../service/VisitedUsersImpl');


exports.getAllVisitedUsersForUrl = async (req, res) => {
    const { _id } = req.params; // Assuming the URL ID is passed in the request parameters
    try {
      const result = await visitedUsersService.getAllVisitedUsersByUrlId(_id);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};


exports.createVisitedUser = async (req, res) => {
    const visitData = req.body; // Assuming the data is passed in the request body
    try {
      const result = await visitedUsersService.createVisitedUser(visitData);
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
  };