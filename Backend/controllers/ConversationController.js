import { Conversation } from '../models/Conversation.js'

const newConversation = async (req, res, next) => {
    let convo = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })
    try {
        const savedConversation = await convo.save()
        res.status(200).json({ result: savedConversation })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const getConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json(conversation)

    } catch (error) {
        res.status(500).json({ error })
    }
}

const getConversationBetweenTwoUsers = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] }
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
}

export { newConversation, getConversation, getConversationBetweenTwoUsers }