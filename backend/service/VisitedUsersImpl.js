const VisitedUsers = require("../models/Vistiedusermodel");


exports.createVisitedUser = async (userData) => {
    try {
        const newVisitedUser = new VisitedUsers(userData);
        const savedUser = await newVisitedUser.save();
        return { success: true, data: savedUser, message: 'Visited user created successfully' };
    } catch (error) {
        return { success: false, message: `Error creating visited user: ${error.message}` };
    }
};


exports.getAllVisitedUsersByUrlId = async (urlId) => {
    try {
        const visitedUsers = await VisitedUsers.find({ url_id: urlId });
        return { success: true, data: visitedUsers };
    } catch (error) {
        return { success: false, message: `Error fetching visited users: ${error.message}` };
    }
};


