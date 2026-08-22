require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3001;

// database connection
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// Custom middleware to catch invalid JSON body parsing errors cleanly
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ 
            message: "Invalid JSON format in request body. Please ensure your JSON payload is formatted correctly without extra quotes around it." 
        });
    }
    next(err);
});

// api routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

