const User = require("../models/user.model.js");

const getUsersForSidebar = async (req, res) => {
    try {
        // Check if req.user is valid
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const loggedInUserId = req.user._id;

        // Fetch users excluding the logged-in user
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);

        // Differentiate error types
        if (error.name === "CastError") {
            res.status(400).json({ error: "Invalid user ID" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
module.exports={getUsersForSidebar};