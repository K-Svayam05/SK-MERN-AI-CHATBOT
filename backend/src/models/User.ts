import mongoose from "mongoose";
import {randomUUID} from "crypto";
const chatSchema = new mongoose.Schema({
    id:{
        type: String,
        default: randomUUID(),
    },
    role:{
        type: String,
        required: true,  
    },
    content:{
        type: String,
        required: true,
    },
});
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (email: string) => {
            const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regEx.test(email);
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
    chats:[chatSchema],
});

export default mongoose.model("User",userSchema);