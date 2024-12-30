import mongoose from "mongoose";
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("MongoDB URI:", process.env.MONGO_DB_URL);

        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
    }
};

// Use module.exports to export the function in CommonJS style

export default connectToMongoDB;
