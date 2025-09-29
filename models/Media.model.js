// Import mongoose for MongoDB interactions
import mongoose from "mongoose";

// ---------------------
// Media Schema Definition
// ---------------------
const mediaSchema = new mongoose.Schema({
    asset_id: {
        type: String,           
        required: true,           
        trim: true
    },
    public_id: {
        type: String,           
        required: true,           
        trim: true
    },
    path: {
        type: String,           
        required: true,           
        trim: true
    },
    thumbnail_url: {
        type: String,           
        required: true,           
        trim: true
    },
    alt: {
        type: String,           
        trim: true
    },
    title: {
        type: String,           
        trim: true
    },
    deletedAt: {
        type: Date,           
        default: null,
        index: true
    },
    
}, { timestamps: true })       
// ---------------------
// Create Media Model
// ---------------------
// Prevents model overwrite during hot-reload (like in Next.js)
const MediaModel = mongoose.models.Media || mongoose.model('Media', mediaSchema, 'medias')

// Export the Media model to use in controllers
export default MediaModel;
