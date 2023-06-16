import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ConversationShema = new Schema({
    members: {
        type: Array
    }
}, { timestamps: true })

const Conversation = mongoose.model("Conversations", ConversationShema)
export { Conversation }
