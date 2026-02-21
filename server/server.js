
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/prisma.js";
import clerkAuth from "./middlewares/auth.middleware.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(express.json())

app.post('/api/user/sync', clerkAuth, async (req, res) => {
    console.log("userSync request recieved!");
    try {
        const { userId } = req.auth();
        console.log("req.auth()", req.auth());
        let user = await prisma.user.findUnique({
            where: {
                clerkId: userId
            }
        })
        const userStatus = user ? "existing user" : "new user";
        console.log("userStatus", userStatus);
        console.log("user before", user);
        if (!user) {
            user = await prisma.user.create({
                data: {
                    clerkId: userId
                }
            })
        }

        console.log("user after", user);

        res.json({
            message: userStatus,
        })

    } catch (error) {
        console.error("Error in /api/user/sync:", error);
        res.json({
            message: "Server error",
            error: error
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("secret_key", process.env.CLERK_SECRET_KEY);
    console.log("publishable_key", process.env.CLERK_PUBLISHABLE_KEY)
    console.log("DATABASE_URL", process.env.DATABASE_URL)
});