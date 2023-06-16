import StudentDetailsModel from "../models/StudentDetailsModel.js"
import StaffDetailsModel from '../models/StaffModule.js'
import ArticleUpload from "../models/UploadArticleModel.js"
import pollUpload from "../models/UploadPoll.js"
import PostUpload from "../models/UploadPost.js"
import videoUpload from "../models/UploadVideo.js"
import placementPost from "../models/uploadPlacementPost.js"
import CollegeEventUpload from "../models/UploadCollegeEventPostModel.js"


let DisplayAllPost = async (req, res) => {
    try {
        const currentUser = await StudentDetailsModel.findById(req.params.id)
        const userPost = await PostUpload.find({ userId: currentUser._id, PostStatus: true })
        const userVideo = await videoUpload.find({ userId: currentUser._id, PostStatus: true })
        const userPoll = await pollUpload.find({ userId: currentUser._id, pollStatus: true })
        const userArticle = await ArticleUpload.find({ userId: currentUser._id, PostStatus: true })
        res.json(userPost.concat(...userArticle).concat(...userVideo).concat(...userPoll))

    } catch (error) {
        console.log(error);
    }
}

const DisplayAllStaffPost = async (req, res) => {
    try {
        const currentUser = await StaffDetailsModel.findById(req.params.id)
        const userPost = await PostUpload.find({ userId: currentUser._id, PostStatus: true })
        const userVideo = await videoUpload.find({ userId: currentUser._id, PostStatus: true })
        const userPoll = await pollUpload.find({ userId: currentUser._id, pollStatus: true })
        const userArticle = await ArticleUpload.find({ userId: currentUser._id, PostStatus: true })
        res.json(userPost.concat(...userArticle).concat(...userVideo).concat(...userPoll))

    } catch (error) {
        console.log(error);
    }
}

const DisplayAllPlacementPost = async (req, res) => {
    try {
        const placementPosts = await placementPost.find()
        res.status(200).json(placementPosts)
    } catch (error) {
        res.status(500).json(error)
    }
}

const DisplayAllCollegeEventPost = async (req, res) => {
    try {
        const CollegeEventPosts = await CollegeEventUpload.find()
        res.status(200).json(CollegeEventPosts)
    } catch (error) {
        res.status(500).json(error)
    }
}

export { DisplayAllPost, DisplayAllStaffPost, DisplayAllPlacementPost, DisplayAllCollegeEventPost }