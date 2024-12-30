import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};



















// const User = require("../models/user.model.js");
// const bcrypt = require("bcryptjs");
// const generateTokenAndSetCookie = require("../utils/generateToken.js");

// const signup = async (req, res) => {
// 	try {
// 		const { fullName, username, password, confirmPassword, gender } = req.body;

// 		// Validate input fields
// 		if (!fullName || !username || !password || !confirmPassword || !gender) {
// 			return res.status(400).json({ error: "All fields are required" });
// 		}

// 		if (password !== confirmPassword) {
// 			return res.status(400).json({ error: "Passwords do not match" });
// 		}

// 		// Check if username already exists
// 		const existingUser = await User.findOne({ username });
// 		if (existingUser) {
// 			return res.status(400).json({ error: "Username already exists" });
// 		}

// 		// Hash the password
// 		const salt = await bcrypt.genSalt(10);
// 		const hashedPassword = await bcrypt.hash(password, salt);

// 		// Generate profile picture URL
// 		const profilePicBaseUrl = "https://avatar.iran.liara.run/public";
// 		const profilePic = gender === "male"
// 			? `${profilePicBaseUrl}/boy?username=${username}`
// 			: `${profilePicBaseUrl}/girl?username=${username}`;

// 		// Create a new user
// 		const newUser = new User({
// 			fullName,
// 			username,
// 			password: hashedPassword,
// 			gender,
// 			profilePic,
// 		});

// 		await newUser.save();

// 		// Generate JWT token and set it in a cookie
// 		generateTokenAndSetCookie(newUser._id, res);

// 		res.status(201).json({
// 			_id: newUser._id,
// 			fullName: newUser.fullName,
// 			username: newUser.username,
// 			profilePic: newUser.profilePic,
// 		});
// 	} catch (error) {
// 		console.error("Error in signup controller:", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };

// const login = async (req, res) => {
// 	try {
// 		const { username, password } = req.body;

// 		// Validate input fields
// 		if (!username || !password) {
// 			return res.status(400).json({ error: "Username and password are required" });
// 		}

// 		// Find the user in the database
// 		const user = await User.findOne({ username });

// 		if (!user) {
// 			return res.status(400).json({ error: "Invalid username or password" });
// 		}

// 		// Compare the password
// 		const isPasswordCorrect = await bcrypt.compare(password, user.password);
// 		if (!isPasswordCorrect) {
// 			return res.status(400).json({ error: "Invalid username or password" });
// 		}

// 		// Generate JWT token and set it in a cookie
// 		generateTokenAndSetCookie(user._id, res);

// 		res.status(200).json({
// 			_id: user._id,
// 			fullName: user.fullName,
// 			username: user.username,
// 			profilePic: user.profilePic,
// 		});
// 	} catch (error) {
// 		console.error("Error in login controller:", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };

// const logout = async (req, res) => {
// 	try {
// 		// Clear the JWT cookie
// 		res.cookie("jwt", "", {
// 			maxAge: 0,
// 			httpOnly: true,
// 			secure: process.env.NODE_ENV === "production", // Set secure cookie in production
// 			sameSite: "strict",
// 		});
// 		res.status(200).json({ message: "Logged out successfully" });
// 	} catch (error) {
// 		console.error("Error in logout controller:", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };

// module.exports = { signup, login, logout };
