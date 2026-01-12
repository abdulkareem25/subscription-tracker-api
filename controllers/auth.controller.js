import { startSession } from "mongoose";
import User from "../models/user.model";
import bcrypt from bcrypt;


export const signUp = async (req, res, next) => {
    const session = await startSession();
    session.startTransaction();

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('User Already Exists') 
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email, password: hashedPassword });

        await session.commitTransaction();
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: "error while signUp" })
        await session.abortTransaction();
        session.endSession()
    }

};

export const signIn = async (req, res, next) => {

};

export const signOut = async (req, res, next) => {

};