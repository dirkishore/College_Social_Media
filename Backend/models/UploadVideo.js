import mongoose from "mongoose";
const Schema = mongoose.Schema

const UploadVideoShema = new Schema({
    userId: {
        type: String,
        required: true
    },
    PostVideoStatus: {
        type: Boolean,
        default: false
    },
    Video: {
        data: Buffer,
        contentType: String
    },
    Caption: {
        type: String
    },
    Views: {
        type: Array,
    },
    Likes: {
        type: Array
    },
    Comments: {
        type: Array,
    },
    Share: {
        type: Array,
    }
}, { timestamps: true })

const videoUpload = mongoose.model("UploadedVideo", UploadVideoShema)
export default videoUpload