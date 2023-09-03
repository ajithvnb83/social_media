import blogModel from "../models/blog_model.js";

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
    const blog = blogModel({
        title,
        description,
        image,
        user,
    });
    try{
        blog.save();
    }catch(e){
        console.log(e);
    }
    return res.status(200).json({blog});
}

export const updateBlog = async(req,res,next)=>{
    const {title, description} = req.body;
    const blogId = req.params.id;
    try{
        const blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        });
    }catch(e){
        return res.status(500).json({message:"unable to update"})
    }
    res.status(200).json(blog);

}