import express from 'express'
import { pollResultController, PollUploadController } from '../controllers/PostUploadController.js'
const router = express.Router()

import { onArticleLikes, onLikes, onVideoLikes, getAllComments, getAllVideoComments, getAllArticleComments, updatePost, deletePost } from '../controllers/UpdatePostController.js'

//update a Post
router.put("/updatePost/:id", updatePost)

//delete a post
router.delete("/deletePost/:id", deletePost)

//handle Likes
router.put("/onLikes/:id", onLikes)
router.put("/onArticleLikes/:id", onArticleLikes)
router.put("/onVideoLikes/:id", onVideoLikes)

router.post('/allComments', getAllComments)
router.post('/allVideoComments', getAllVideoComments)
router.post('/allArticleComments', getAllArticleComments)

router.put("/pollResult/:id", pollResultController)


export default router