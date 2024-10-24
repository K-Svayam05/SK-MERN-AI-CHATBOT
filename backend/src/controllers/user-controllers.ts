import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { compare, hash } from "bcrypt";                     //"hash" function imported to encrypt the user password
import { createToken } from "utils/token-manager";
import { COOKIE_NAME } from "utils/constants";

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
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");
    const hashedpassword = await hash(password, 10);                //encrypts the password entered by the user so that it's not visible in database
    const users = new User({ name, email, password: hashedpassword });
    await users.save();

    // create token and store cookie
    res.clearCookie(COOKIE_NAME,{
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(users._id.toString(), users.email, "7d");
    const expires = new Date();

    expires.setDate(expires.getDate() + 7)
    res.cookie(COOKIE_NAME, token, {
      path: "/", 
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    console.log(users);
    return res.status(201).json({ message: "OK", id: users._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user login
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) return res.status(403).send("Password is incorrect.");

    res.clearCookie(COOKIE_NAME,{
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();

    expires.setDate(expires.getDate() + 7)
    res.cookie(COOKIE_NAME, token, {
      path: "/", 
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({ message: "OK", id: user._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};