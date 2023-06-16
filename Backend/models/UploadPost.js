import mongoose from "mongoose"
const schema = mongoose.Schema

const UploadPhotoSchema = new schema({
    userId: {
        type: String,
        required: true
    },
    PostStatus: {
        type: Boolean,
        default: false
    },
    Photo: {
        data: Buffer,
        contentType: String,
        default: ""
    },
    Caption: {
        type: String
    },
    Likes: {
        type: Array,
    },
    Comments: {
        type: Array,
    },
    Share: {
        type: Array,
    }
}, { timestamps: true })

const PostUpload = mongoose.model("UploadedPhoto", UploadPhotoSchema)
export default PostUpload 