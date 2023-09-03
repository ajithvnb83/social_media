import mongoose from "mongoose";

const schema = mongoose.Schema;

const blogSchema = schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    }
});

export default mongoose.model("Blog", blogSchema);