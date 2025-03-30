import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connect() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
            useUnifiedTopology: true
        });
        console.log("✅ Connected to the database");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1);
    }
}

export default connect;
