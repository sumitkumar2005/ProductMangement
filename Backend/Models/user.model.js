import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        name: {
            type: String,
            trim: true,
            minlength: [3, 'Name must be at least 3 characters'],
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },

    },
    {
        timestamps: true,
    }
);

UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};
UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, role: this.role }, JWT_SECRET, { expiresIn: '24h' });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', UserSchema);