import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const MONGO_URI = process.env.MONGODB_URI;



export async function connectDB() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log(`Successfully connected to MongoDB: ${DB_NAME}`);
	} catch (err) {
		console.error("MongoDB connection FAILED:", err);
		throw err;
	}
}

export default mongoose;
