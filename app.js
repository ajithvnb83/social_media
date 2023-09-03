import express from "express";
import mongoose from 'mongoose';
import router from "./routes/user_routes.js";

const app = express();
app.use(express.json())
app.use("/api/user",router);

var url = "mongodb+srv://ajithvnb83:12345@cluster0.5tld60e.mongodb.net/Blog?retryWrites=true&w=majority";

mongoose.connect(url).then(() =>
    app.listen(5000)
).then(() =>
    console.log("Connected port")
).catch((e) => console.log(e));

// app.use("/api", (req, res, next) => {
//     console.log("Port running on the 5000");
//     res.send("Hello world");
// });

