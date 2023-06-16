import mongoose from "mongoose"
const schema = mongoose.Schema

const UploadPollShema = new schema({
    userId: {
        type: String,
        required: true
    },
    pollStatus: {
        type: Boolean,
        default: false
    },
    pollQuestion: {
        type: String,
        required: true
    },
    pollChoice: {
        type: Array,
        required: true
    },
    pollResult: {
        type: Array,
        default: []
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

const pollUpload = mongoose.model("UploadedPoll", UploadPollShema)
export default pollUpload