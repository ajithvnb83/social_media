import mongoose from "mongoose";
import blogModel from "../models/blog_model.js";
import userModel from "../models/user_model.js";

export const getAllBlogs = async (req, res, next) => {
    let blog;
    try {
        blog = await blogModel.find();
    } catch (e) {
        console.log(e);
    }
    if (!blog) {
        res.status(400).json({ message: "no blogs found" });
    }
    res.status(200).json({ blog })
}

export const createBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await userModel.findById(user);
    } catch (e) {
        console.log;
    }
    if (!existingUser) {
        res.status(400).json({ message: "user does't exist" });
    }
    const blog = blogModel({
        title,
        description,
        image,
        user,
    });
    try {
        /// directly save the only the blog into the db
        // blog.save(); 

        //save the blog with user
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        session.commitTransaction();
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e });
    }
    return res.status(200).json({ blog });
}

export const updateBlog = async (req, res, next) => {
    console.log(req.body);
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await blogModel.findByIdAndUpdate(blogId, {
            title,
            description
        });
    } catch (e) {
        console.log(e);
    }
    if (!blog) {
        return res.status(500).json({ message: "unable to update" })
    }
    res.status(200).json(blog);
}

export const getBlogById = async (req, res, next) => {
    const blogId = req.params.id;
    console.log(blogId);
    let blog;
    try {
        blog = await blogModel.findById(blogId);
    } catch (e) {
        console.log(e);
    }
    if (!blog) {
        res.status(400).json({ message: "no blogs found" });
    }
    res.status(200).json({ blog: blog });
}

export const deleteBlogById = async (req, res, next) => {
    const blogId = req.params.id;
    console.log(blogId);
    let blog;
    try {
        blog = await blogModel.findByIdAndRemove(blogId).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (e) {
        console.log(e);
    }
    if (!blog) {
        res.status(400).json({ message: "no blogs found" });
    }
    res.status(200).json({
        message: "successfully deleted the blog",
        blog: blog
    });
}

export const getBlogsByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await userModel.findOne({}, undefined,)
        userBlogs = await userModel.findById(userId).populate("blogs");
        console.log(userBlogs);
    }catch(e){
        console.log(e);
    }
    if(!userBlogs){
        res.status(400).json({message:"No blogs posted this user"});
    }
    res.status(200).json({blogs:userBlogs.blogs});
}