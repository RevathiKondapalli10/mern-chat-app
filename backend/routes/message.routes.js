const express = require("express");
const { sendMessage, getMessages } = require("../controllers/message.controller.js");  // Correct import
const protectRoute = require("../middleware/protectRoute.js");

const router = express.Router();

// Ensure that each route handler is correctly passed to the route
router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessages);

module.exports = router;
