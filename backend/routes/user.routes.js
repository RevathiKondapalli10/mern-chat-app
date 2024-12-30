import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;










// const express=require("express");
// const router=express.Router();
// const { getUsersForSidebar }=require("../controllers/user.controller.js");
// const protectRoute=require("../middleware/protectRoute.js");

// router.get("/",protectRoute,getUsersForSidebar)


// module.exports=router;


