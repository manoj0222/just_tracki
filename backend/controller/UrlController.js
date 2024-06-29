const express = require('express');
const urlService = require('../service/UrlServiceImpl');

// Controller to handle creating a new URL
exports.createURL = async (req, res) => {
    console.info("Inside the createURL method:",req.body);
    try {
        const result = await urlService.createURL(req.body);
        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};

// Controller to handle getting a URL by ID
exports.findUrlById = async (req, res) => {
    console.info("Inside the findUrlById method:",req.params._id);
    try {
        const result = await urlService.findUrlById(req.params._id);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};

// Controller to handle getting all URLs
exports.getAllURLs = async (req, res) => {
    console.info("Inside the getAllURLs method:");
    try {
        const result = await urlService.findAll();
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};

// Controller to handle updating a URL by ID
exports.updateURLById = async (req, res) => {
    console.info("Inside the updateURLById method:");
    try {
        const result = await urlService.updateUrl(req.params.id, req.body);
        if (result.success) {
            res.status(200).json(result);
        } else if (result.message === 'URL not found') {
            res.status(404).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};


//controller for handleAll the URL for particular user_id

exports.getUrlsByUserId = async (req, res) => {
    console.info("Inside the getUrlsByUserId method:",req.params.user_id);
    try {
        const result = await urlService.getUrlsByUserId(req.params.user_id);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};



exports.deleteUrlById = async (req, res) => {
    console.info("Inside the deleteUrlById method:",req.params._id);
    const urlId = req.params._id;
    try {
        const result = await urlService.findByIdAndDelete(urlId);
        if (!result) {
            return res.status(404).json({ success: false, message: 'URL not found' });
        }
        return res.status(200).json({ success: true, message: 'URL successfully deleted' });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Error deleting URL: ${error.message}` });
    }
};


// Controller to handle getting URLs by user_id and custom_url
exports.getUrlsByUserIdAndCustomUrl = async (req, res) => {
    const { user_id, custom_url } = req.params;
    console.info("Inside the getUrlsByUserIdAndCustomUrl method:", user_id, custom_url);
    try {
        const result = await urlService.findUrlByUserIdAndCustomUrl(user_id,custom_url);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};
