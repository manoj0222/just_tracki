const VisitedUsers = require("../models/Vistiedusermodel");
const UrlService = require("./UrlServiceImpl");


exports.createVisitedUser = async (userData) => {
    console.debug("Inside createVisitedUser:",userData);
    try {
        const newVisitedUser = new VisitedUsers(userData);
        const savedUser = await newVisitedUser.save();
        console.log("SavedUser",savedUser);
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

exports.countVisitedUsers = async () => {
    try {
        const count = await VisitedUsers.countDocuments({});
        console.info("Inside the Count:",count);
        return { success: true, data: count, message: 'Count retrieved successfully' };
    } catch (error) {
        return { success: false, message: `Error counting visited users: ${error.message}` };
    }
};


