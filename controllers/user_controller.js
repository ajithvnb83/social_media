import userModel from "../models/user_model.js";

export const getAllUser = async (req, res, next) => {
    let user;
    try {
        user = await userModel.find({});
    } catch (e) {
        console.log(e);
    }
    // console.log(user);
    if (!user) {
        return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ user: user })
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await userModel.findOne({ email })
    } catch (e) {
        console.log(e)
    }
    if (existingUser) {
        return res.status(400).json({ message: "user alredy registered" + existingUser.email })
    }
    const user = new userModel({
        name, email, password
    })

    try{
        user.save();
    }catch(e){
        console.log(e);
    }
    return res.status(201).json({user});
}