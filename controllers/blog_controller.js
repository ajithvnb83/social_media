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
        blog.save();
    } catch (e) {
        console.log(e);
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
        blog = await blogModel.findByIdAndRemove(blogId);
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