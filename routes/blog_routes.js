import expres from "express";
import { createBlog, deleteBlogById, getAllBlogs, getBlogById, getBlogsByUserId, updateBlog } from "../controllers/blog_controller.js";

const blogRouter = expres.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/createblog",createBlog);
blogRouter.put("/updateblog/:id",updateBlog)
blogRouter.get("/getblog/:id",getBlogById)
blogRouter.delete("/deleteblog/:id",deleteBlogById)
blogRouter.get("/blogbyuser/:id", getBlogsByUserId)

export default blogRouter; 