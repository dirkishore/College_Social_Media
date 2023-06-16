import express from 'express'
const router = express.Router()

import { UpdatePollStatus, UpdatePostStatus } from '../controllers/UpdatePostStatusController.js'
import { UpdateVideoStatus } from '../controllers/UpdatePostStatusController.js'
import { UpdateArticleStatus } from '../controllers/UpdatePostStatusController.js'

router.put("/updateStatus", UpdatePostStatus)
router.put("/updateVideoStatus", UpdateVideoStatus)
router.put("/updateArticleStatus", UpdateArticleStatus)
router.put("/updatePollStatus", UpdatePollStatus)

export default router