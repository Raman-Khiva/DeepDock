import express from 'express'
import cors from 'cors'
import userRoutes from './routes/users.routes.js';

const app = express();

app.use(cors());

app.use('/api/user', userRoutes);




app.listen(5000, () => {
    console.log("Server is live on http://localhost:5000")
})