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

// api routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

