// Import required modules
import mongoose from 'mongoose';      // For MongoDB interactions
import bcrypt from 'bcryptjs';        // For hashing passwords

// ---------------------
// User Schema Definition
// ---------------------
const userSchema = new mongoose.Schema({
    role: {
        type: String,                 // Role of the user (user/admin)
        required: true,               // Must always have a role
        enum: ['user', 'admin'],      // Can only be 'user' or 'admin'
        default: 'user'               // Default role is 'user'
    },
    name: {
        type: String,                 // User's full name
        required: true,               // Must always have a name
        trim: true                    // Removes extra spaces at start/end
    },
    email: {
        type: String,                 // User's email address
        required: true,               // Must always have an email
        trim: true,                   // Removes extra spaces
        unique: true                  // No duplicate emails allowed
    },
    password: {
        type: String,                 // User's password (hashed)
        required: true,               // Mandatory field
        trim: true,                   // Remove extra spaces
        select: false                 // Hide password by default when querying
    },
    avatar: {                           // User profile image info
        url: {
            type: String,              // URL of the image (e.g., Cloudinary)
            trim: true
        },
        public_id: {
            type: String,              // Public ID from hosting service
            trim: true
        },
    },
    isEmailVerified: {
        type: Boolean,                // Email verification status
        default: false                // Defaults to false (not verified)
    },
    phone: {
        type: String,                 // Optional phone number
        trim: true
    },
    address: {
        type: String,                 // Optional address
        trim: true
    },
    deletedAt: {
        type: Date,                   // Soft delete timestamp
        default: null,                // Null if not deleted
        index: true                   // Indexed for faster queries
    },
}, { timestamps: true })               // Automatically adds createdAt & updatedAt

// ---------------------
// Password Hashing Middleware
// ---------------------
// Uncomment this block if you want passwords to be automatically hashed before saving
/*
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified
    if (!this.isModified('password')) return next();

    // Hash the password with salt rounds = 10
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
*/

// ---------------------
// Custom Schema Methods
// ---------------------
userSchema.methods = {
    // Method to compare input password with hashed password in DB
    comparePassword: async function(password) {
        return await bcrypt.compare(password, this.password);
    }
}

// ---------------------
// Create Model
// ---------------------
// Prevents model overwrite in hot-reload (like in Next.js)
const UserModel = mongoose.models.User || mongoose.model('User', userSchema, 'users');

// Export model to use in other parts of the project
export default UserModel;