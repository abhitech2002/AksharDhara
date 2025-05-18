import express from 'express';
import { configDotenv } from 'dotenv';
import connectDB from './config/db.js';
import blogRoutes from './routes/blogRoutes.js';

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/blogs', blogRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
});