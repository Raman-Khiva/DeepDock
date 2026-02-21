import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.routes.js';

const app = express();

// CORS — allow your frontend origin and support credentials (auth headers)
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse incoming JSON bodies
app.use(express.json());

app.use('/api/user', userRoutes);

app.listen(5000, () => {
    console.log("Server is live on http://localhost:5000");
});