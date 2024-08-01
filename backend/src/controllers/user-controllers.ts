import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import {hash} from "bcrypt";                     //"hash" function imported to encrypt the user password

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get all users
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user signup
    const {name, email, password}=req.body;
    const hashedpassword= await hash(password,10);                //encrypts the password entered by the user so that it's not visible in database
    const users = new User({name, email, password:hashedpassword});
    await users.save();
    return res.status(200).json({ message: "OK",id: users._id.toString()});
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};