import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        requied:true,
        minLength:6
    }
});

export default mongoose.model("User",userSchema);