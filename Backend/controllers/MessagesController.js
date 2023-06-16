import { Message } from "../models/Message.js";

const newMessage = async (req, res, next) => {
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json({ error })
    }
}

const getMessage = async (req, res, next) => {
    try {
        const getMessages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(getMessages)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export { newMessage, getMessage }