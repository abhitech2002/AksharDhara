import express from 'express';
import { configDotenv } from 'dotenv';
import connectDB from './config/db.js';
import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from "./routes/userRoutes.js"
import cors from 'cors';
import "./utils/cronJobs/deleteExpiredBlogs.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
});