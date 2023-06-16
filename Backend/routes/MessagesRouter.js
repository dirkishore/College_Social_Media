import express from 'express'
const router = express.Router()

import { getMessage, newMessage } from '../controllers/MessagesController.js'

router.post("/newMessage", newMessage)
router.get('/getMessage/:conversationId', getMessage)

export default router