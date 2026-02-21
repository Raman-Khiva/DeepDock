import 'dotenv/config';
import { requireAuth } from "@clerk/express";

const clerkAuth = requireAuth();

export default clerkAuth;
