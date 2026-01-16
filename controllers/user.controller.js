import User from "../models/user.model";

export const getAllUsers = (req, res) => {
    try {
        const users = User.find();
        res.status(200).json({
            message: "Users fetched successfully",
            users
        });
    } catch (err) {
        console.error('GetAllUsers Error:', err.message);
        res.status(500).json({
            message: "An error occurred while fetching users. Please try again."
        });
    }
};

export const getUserById = (req, res) => {
    try {
        const userId = req.params.id;
        const user = User.findById(userId);
        res.status(200).json({
            message: "User details fetched successfully",
            user
        });
    } catch (err) {
        console.error('GetAllUsers Error:', err.message);
        res.status(500).json({
            message: "An error occurred while fetching users. Please try again."
        });
    }
};

export const createUser = (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = new User({
            name,
            email,
            password
        });

        newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    } catch (err) {
        console.error('GetAllUsers Error:', err.message);
        res.status(500).json({
            message: "An error occurred while fetching users. Please try again."
        });
    }
};

export const updateUser = (req, res) => {
    try {

    } catch (err) {
        console.error('GetAllUsers Error:', err.message);
        res.status(500).json({
            message: "An error occurred while fetching users. Please try again."
        });
    }
};

export const deleteUser = (req, res) => {
    try {

    } catch (err) {
        console.error('GetAllUsers Error:', err.message);
        res.status(500).json({
            message: "An error occurred while fetching users. Please try again."
        });
    }
};