const URL = require("../models/URLmodel");

exports.createURL = async (urlData) => {
    try {
        // Check if a URL with the given custom URL already exists
        const existingUrl = await URL.findOne({ custom_url: urlData.custom_url });
        if (existingUrl) {
            return { success: false, message: 'Custom URL already exists' };
        }
        // If it doesn't exist, proceed to create and save the new URL
        const url = new URL(urlData);
        await url.save();
        console.log("Object Saved")
        return { success: true, data: url, message: 'URL successfully created' };
    } catch (error) {
        return { success: false, message: `Error creating URL: ${error.message}` };
    }
};



// Get a URL by its ID
exports.findUrlById = async (id) => {
    try {
        const url = await URL.findById(id);
        if (!url) {
            return { success: false, message: 'URL not found' };
        }
        return { success: true, data: url };
    } catch (error) {
        return { success: false, message: `Error fetching URL: ${error.message}` };
    }
};

// Get all URLs
exports.findAll = async () => {
    try {
        const urls = await URL.find();
        return { success: true, data: urls };
    } catch (error) {
        return { success: false, message: `Error fetching URLs: ${error.message}` };
    }
};


exports.updateUrl = async (id, updateData) => {
    try {
        const url = await URL.findByIdAndUpdate(id, updateData, { new: true });
        if (!url) {
            return { success: false, message: 'URL not found' };
        }
        return { success: true, data: url, message: 'URL successfully updated' };
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate custom URL error
            return { success: false, message: 'Custom URL already exists' };
        }
        return { success: false, message: `Error updating URL: ${error.message}` };
    }
};

//Get all the URL Based on the user_id
exports.getUrlsByUserId = async (userId) => {
    try {
        const urls = await URL.find({ user_id: userId });
        console.log("URLS", urls)
        if (urls.length === 0) {
            return { success: false, message: 'No URLs found for this user' };
        }
        return { success: true, data: urls, message: 'URLs fetched successfully' };
    } catch (error) {
        return { success: false, message: `Error fetching URLs: ${error.message}` };
    }
};



exports.findByIdAndDelete = async (urlId) => {
    try {
        const result = await URL.findByIdAndDelete(urlId);
        console.info("Inisde findByIdAndDelete service Layer", result)
        if (!result) {
            return { success: false, message: 'URL not found' };
        }
        return { success: true, message: 'URL successfully deleted' };
    } catch (error) {
        return { success: false, message: `Error deleting URL: ${error.message}` };
    }
};

// Get URL by user_id and custom_url
exports.findUrlByUserIdAndCustomUrl = async (userId, customUrl) => {
    try {
        userId = userId.trim();
        customUrl = customUrl.trim();
        const url = await URL.findOne({ user_id: userId, custom_url: customUrl}).select('originalurl');
        console.info("Inside findUrlByUserIdAndCustomUrl:",url,customUrl,userId);
        if (!url) {
            return { success: false, message: 'URL not found for this user with the provided custom URL' };
        }
        return { success: true, data: url, message: 'URL fetched successfully' };
    } catch (error) {
        return { success: false, message: `Error fetching URL: ${error.message}` };
    }
};
