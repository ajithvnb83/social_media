import express from "express";
import mongoose from 'mongoose';
import userRouter from "./routes/user_routes.js";
import commonUrls from "./config/db_config.js";
import blogRouter from "./routes/blog_routes.js";

const app = express();


app.use(express.json())
app.use("/api/user",userRouter);
app.use("/api/blog",blogRouter);


mongoose.connect(commonUrls.mongoUrl).then(() =>
    app.listen(5000)
).then(() =>
    console.log("Connected port")
).catch((e) => console.log(e));

// app.use("/api", (req, res, next) => {
//     console.log("Port running on the 5000");
//     res.send("Hello world");
// });

