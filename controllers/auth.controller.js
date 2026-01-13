import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/env.js";


export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: "User with this email already exists" 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({ 
            name, 
            email, 
            password: hashedPassword 
        });

        // Generate JWT token
        const payload = {
            id: newUser._id,
            email: newUser.email
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7h' });

        res.status(201).json({ 
            message: "User registered successfully", 
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name
            }
        });

    } catch (err) {
        console.error('SignUp Error:', err.message);
        res.status(500).json({ 
            message: "An error occurred during registration. Please try again." 
        });
    }
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                message: "Invalid credentials" 
            });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ 
                message: "Invalid credentials" 
            });
        }

        // Generate JWT token
        const payload = {
            id: user._id,
            email: user.email
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7h' });

        res.status(200).json({ 
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });

    } catch (err) {
        console.error('SignIn Error:', err.message);
        res.status(500).json({ 
            message: "An error occurred during login. Please try again." 
        });
    }
};

export const signOut = async (req, res) => {

};