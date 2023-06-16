import mongoose from "mongoose";
const Schema = mongoose.Schema

const ArticleShema = new Schema({
    userId: {
        type: String,
        required: true
    },
    ArticleHeadLine: {
        type: String,
        require: true
    },
    ArticleContent: {
        type: String,
        require: true
    },
    Likes: {
        type: Array
    },
    Comments: {
        type: Array
    },
    Share: {
        type: Array
    },
    ArticleStatus: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const ArticleUpload = mongoose.model("UploadedArticles", ArticleShema)
export default ArticleUpload
