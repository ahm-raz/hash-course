
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
    try {
        // Get data from request body

        const { name, email, password } = req.body;
        
        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Send response
        return res.status(201).json({
            message: "User created successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to create user",
            error: error.message
        });
    }
};



export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            message: "Users fetched successfully",
            users
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch users",
            error: error.message
        });
    }
};

