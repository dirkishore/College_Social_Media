import PostUpload from "../models/UploadPost.js";
import VideoUpload from "../models/UploadVideo.js";
import UploadArticleModel from '../models/UploadArticleModel.js'
import pollUpload from "../models/UploadPoll.js";

let UpdatePostStatus = (req, res, next) => {
    let PostStatus = req.body.PostStatus
    let id = req.body.id
    PostUpload.findById(id).updateOne({ PostStatus }).then((result) => res.status(200).json({ result })).catch((err) => res.status(500).json({ err }))
}

let UpdateVideoStatus = (req, res, next) => {
    let PostStatus = req.body.PostStatus
    let id = req.body.id
    VideoUpload.findById(id).updateOne({ PostVideoStatus: PostStatus }).then((result) => res.status(200).json({ result })).catch((err) => res.status(500).json({ err }))
}

let UpdateArticleStatus = (req, res, next) => {
    let PostStatus = req.body.PostStatus
    let id = req.body.id
    UploadArticleModel.findById(id).updateOne({ ArticleStatus: PostStatus }).then((result) => res.status(200).json({ result })).catch((err) => res.status(500).json({ err }))
}

let UpdatePollStatus = (req, res, next) => {
    let PostStatus = req.body.PostStatus
    let id = req.body.id
    pollUpload.findById(id).updateOne({ pollStatus: PostStatus }).then((result) => res.status(200).json({ result })).catch((err) => res.status(500).json({ err }))
}

export { UpdatePostStatus, UpdateVideoStatus, UpdateArticleStatus, UpdatePollStatus }