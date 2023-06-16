import mongoose from "mongoose";
const Shema = mongoose.Schema

const placementPostShema = new Shema({
    userId: {
        type: String,
        required: true
    },
    PlacementHeadLine: {
        type: String,
        require: true
    },
    PlacementContent: {
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
    postStatus: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const placementPost = mongoose.model("PlacementPosts", placementPostShema)
export default placementPost