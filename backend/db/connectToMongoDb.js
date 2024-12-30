



import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        // Connect to MongoDB Atlas using the URI from the .env file
        await mongoose.connect(process.env.MONGO_DB_URL);

        console.log("MongoDB URI:", process.env.MONGO_DB_URL); // Debugging (optional)
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message); // Log the error
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectToMongoDB;


// import mongoose from "mongoose";
// const connectToMongoDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_DB_URL);
//         console.log("MongoDB URI:", process.env.MONGO_DB_URL);

//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.log("Error connecting to MongoDB:", error.message);
//     }
// };

// // Use module.exports to export the function in CommonJS style

// export default connectToMongoDB;


