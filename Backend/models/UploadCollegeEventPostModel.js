import mongoose from "mongoose";
const Shema = mongoose.Schema

const CollegeEventPostShema = Shema({
    userId: {
        type: String,
        required: true
    },
    PostStatus: {
        type: Boolean,
        default: true
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

const CollegeEventUploadModel = mongoose.model("CollegeEvents", CollegeEventPostShema)
export default CollegeEventUploadModel