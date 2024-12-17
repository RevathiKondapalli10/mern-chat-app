const express = require("express");
const connectToMongoDb = require("./db/connectToMongoDb");  // Correctly import the function\
const cookie=require("cookie-parser");

const authRoutes=require("./routes/auth.routes.js");
const messageRoutes=require("./routes/message.routes.js");
const userRoutes=require("./routes/user.routes.js");
const cookieParser = require("cookie-parser");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes)


// app.get("/",(req,res)=>{
//     res.send("hello world");
// });


app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`);
});
module.exports;
