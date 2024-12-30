

import express from "express";
import generateTokenAndSetCookie from "./utils/generateTokenAndSetCookie"; // Adjust path as necessary

const app = express();

app.post("/login", (req, res) => {
  const { userId } = req.body; // Assuming the userId is passed in the request body
  
  // Generate token and set the cookie
  generateTokenAndSetCookie(userId, res);
  
  return res.status(200).json({ message: "Logged in successfully!" });
});

// import jwt from "jsonwebtoken";

// const generateTokenAndSetCookie = (userId, res) => {
// 	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
// 		expiresIn: "15d",
// 	});

// 	res.cookie("jwt", token, {
// 		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
// 		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
// 		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
// 		secure: process.env.NODE_ENV !== "development",
// 	});
// };

// export default generateTokenAndSetCookie;














// // const jwt=require("jsonwebtoken");


// // const generateTokenAndSetCookie = (userId, res) => {
// // 	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
// // 		expiresIn: "15d",
// // 	});

// // 	res.cookie("jwt", token, {
// // 		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
// // 		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
// // 		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
// // 		secure: process.env.NODE_ENV !== "development",
// // 	});

// // };

// // module.exports=generateTokenAndSetCookie;