import express from 'express'
const router = express.Router()

import { newConversation, getConversation, getConversationBetweenTwoUsers } from '../controllers/ConversationController.js'

router.post('/newConversation', newConversation)
router.get('/getConversation/:userId', getConversation)
router.get('/getConversation/:firstUserId/:secondUserId', getConversationBetweenTwoUsers)

export default router