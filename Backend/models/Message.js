import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MessageShema = new Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String,

    },
    text: {
        type: String
    }
}, { timestamps: true })

const Message = mongoose.model("Message", MessageShema)
export { Message }
