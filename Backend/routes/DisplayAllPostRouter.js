import express from 'express'
const router = express.Router()
import multer from 'multer'
import fs from 'fs'

import { DisplayAllCollegeEventPost, DisplayAllPlacementPost, DisplayAllPost, DisplayAllStaffPost } from '../controllers/PostDisplayController.js'

import { ArticleUpload, PollUploadController } from '../controllers/PostUploadController.js'
import { getNotPermittedPost, NotPermittedPost } from '../controllers/GetNotPermittedPosts.js'
import { NotPermittedVideos } from '../controllers/GetNotPermittedPosts.js'
import { NotPermittedArticle } from '../controllers/GetNotPermittedPosts.js'
import StudentDetailsModel from '../models/StudentDetailsModel.js'
import PostUpload from '../models/UploadPost.js'
import videoUpload from '../models/UploadVideo.js'
import ArticleUploadModdel from '../models/UploadArticleModel.js'
import pollUpload from '../models/UploadPoll.js'
import StaffDetailsModel from '../models/StaffModule.js'
import PlacementOfficerModel from '../models/PlacementOfficerModel.js'
import placementPost from '../models/uploadPlacementPost.js'
import { ObjectId } from 'mongodb'


router.get('/displayAllUserPost/:id', DisplayAllPost)
router.get("/displayAllStaffpost/:id", DisplayAllStaffPost)

router.post('/uploadArticle', ArticleUpload)
router.post("/uploadPoll", PollUploadController)

router.get('/notPermittedPost', getNotPermittedPost)

router.get('/placementPost', DisplayAllPlacementPost)

router.get('/CollegeEventsPost', DisplayAllCollegeEventPost)

//timeline post
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await StudentDetailsModel.findById(req.params.userId)
        const userPost = await PostUpload.find({ userId: currentUser._id, PostStatus: true })
        const userVideoPost = await videoUpload.find({ userId: currentUser._id, PostVideoStatus: true })
        const userPoll = await pollUpload.find({ userId: currentUser._id, pollStatus: true })
        const userArticlePost = await ArticleUploadModdel.find({ userId: currentUser._id, ArticleStatus: true })

        const placementOfficers = await PlacementOfficerModel.find()


        const friendPost = await Promise.all(
            currentUser.following.map((friendId) => {
                return PostUpload.find({ userId: friendId, PostStatus: true })
            })
        )

        const friendVideoPost = await Promise.all(
            currentUser.following.map((friendId) => {
                return videoUpload.find({ userId: friendId, PostVideoStatus: true })
            })
        )

        const friendPoll = await Promise.all(
            currentUser.following.map((friendId) => {
                return pollUpload.find({ userId: friendId, pollStatus: true })
            })
        )

        const friendArticlePost = await Promise.all(
            currentUser.following.map((friendId) => {
                return ArticleUploadModdel.find({ userId: friendId, ArticleStatus: true })
            })
        )

        const staffPost = await Promise.all(
            currentUser.Staffs.map((staffId) => {
                return PostUpload.find({ userId: staffId, PostStatus: true })
            })
        )

        const staffVideoPost = await Promise.all(
            currentUser.Staffs.map((staffId) => {
                return videoUpload.find({ userId: staffId, PostVideoStatus: true })
            })
        )

        const staffArticlePost = await Promise.all(
            currentUser.Staffs.map((staffId) => {
                return ArticleUploadModdel.find({ userId: staffId, ArticleStatus: true })
            })
        )

        const staffPoll = await Promise.all(
            currentUser.Staffs.map((staffId) => {
                return pollUpload.find({ userId: staffId, pollStatus: true })
            })
        )

        const placementPosts = await Promise.all(
            placementOfficers.map((id) => {
                const placementOfficerId = id._id
                return placementPost.find({ userId: placementOfficerId, postStatus: true })
            })
        )

        res.json(userPost.concat(...userVideoPost).concat(...userArticlePost).concat(...userPoll).concat(...friendPost).concat(...friendVideoPost).concat(...friendArticlePost).concat(...friendPoll).concat(...staffPost).concat(...staffVideoPost).concat(...staffArticlePost).concat(...staffPoll).concat(...placementPosts))

        // res.json(placementPosts)
    } catch (error) {
        res.status(500).json(error)
    }
})

//timeLine post of Staff
router.get("/stafftimeline/:userId", async (req, res) => {
    try {
        const currentUser = await StaffDetailsModel.findById(req.params.userId)
        const userPost = await PostUpload.find({ userId: currentUser._id, PostStatus: true })
        const userVideoPost = await videoUpload.find({ userId: currentUser._id, PostVideoStatus: true })
        const userPoll = await pollUpload.find({ userId: currentUser._id, pollStatus: true })
        const userArticlePost = await ArticleUploadModdel.find({ userId: currentUser._id, ArticleStatus: true })

        const placementOfficers = await PlacementOfficerModel.find()

        const friendPost = await Promise.all(
            currentUser.following.map((friendId) => {
                return PostUpload.find({ userId: friendId, PostStatus: true })
            })
        )

        const friendVideoPost = await Promise.all(
            currentUser.following.map((friendId) => {
                return videoUpload.find({ userId: friendId, PostVideoStatus: true })
            })
        )

        const friendPoll = await Promise.all(
            currentUser.following.map((friendId) => {
                return pollUpload.find({ userId: friendId, pollStatus: true })
            })
        )

        const friendArticlePost = await Promise.all(
            currentUser.following.map((friendId) => {
                return ArticleUploadModdel.find({ userId: friendId, ArticleStatus: true })
            })
        )

        const studentPost = await Promise.all(
            currentUser.students.map((studentId) => {
                return PostUpload.find({ userId: studentId, PostStatus: true })
            })
        )

        const studentVideoPost = await Promise.all(
            currentUser.students.map((studentId) => {
                return videoUpload.find({ userId: studentId, PostVideoStatus: true })
            })
        )

        const studentPoll = await Promise.all(
            currentUser.students.map((studentId) => {
                return pollUpload.find({ userId: studentId, pollStatus: true })
            })
        )

        const studentArticlePost = await Promise.all(
            currentUser.students.map((studentId) => {
                return ArticleUploadModdel.find({ userId: studentId, ArticleStatus: true })
            })
        )

        const placementPosts = await Promise.all(
            placementOfficers.map((id) => {
                const placementOfficerId = id._id
                return placementPost.find({ userId: placementOfficerId, postStatus: true })
            })
        )

        res.json(userPost.concat(...userVideoPost).concat(...userArticlePost).concat(...userPoll).concat(...friendPost).concat(...friendVideoPost).concat(...friendArticlePost).concat(...friendPoll).concat(...studentPost).concat(...studentVideoPost).concat(...studentPoll).concat(...studentArticlePost).concat(...placementPosts))

    } catch (error) {
        res.status(500).json(error)
    }
})


export default router