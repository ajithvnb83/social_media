import expres from "express";
import { createBlog, getAllBlogs, updateBlog } from "../controllers/blog_controller.js";

const blogRouter = expres.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/createblog",createBlog);
blogRouter.put("/updateblog:id",updateBlog)

export default blogRouter;