import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;






// const express = require("express");
// const { sendMessage, getMessages } = require("../controllers/message.controller.js");  // Correct import
// const protectRoute = require("../middleware/protectRoute.js");

// const router = express.Router();

// // Ensure that each route handler is correctly passed to the route
// router.post("/send/:id", protectRoute, sendMessage);
// router.get("/:id", protectRoute, getMessages);

// module.exports = router;
