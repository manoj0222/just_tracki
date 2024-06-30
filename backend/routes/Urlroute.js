const express = require('express');
const router = express.Router();
const urlController = require("../controller/UrlController");



router.post('/urls', urlController.createURL);
router.get('/urls', urlController.getAllURLs);
router.get("/urls/:_id",urlController.findUrlById)
router.put('/urls/:_id', urlController.updateURLById);
router.get("/urls/user/:user_id",urlController.getUrlsByUserId)
router.delete('/urls/:_id', urlController.deleteUrlById);
router.get('/urls/user/:user_id/custom/:custom_url', urlController.getUrlsByUserIdAndCustomUrl);

module.exports = router;