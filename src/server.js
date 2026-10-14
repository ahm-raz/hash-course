
import express from "express";
import dotenv from "dotenv";


import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";



// Load environment variables
dotenv.config();



// Create Express application
const app = express();



// Middleware: convert incoming JSON into req.body
app.use(express.json());



// Home route
app.get("/", (req, res) => {
    res.send("Welcome to my Express Server!");
});

// User routes
app.use("/users", userRoutes);
// app.use("/todo", todoRoutes)


// Start server after connecting to MongoDB
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
