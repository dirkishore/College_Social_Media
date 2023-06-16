import PostUpload from "../models/UploadPost.js";
import UploadVideo from '../models/UploadVideo.js'
import ArticleUploadModel from "../models/UploadArticleModel.js";
import fs from 'fs'
import pollUpload from "../models/UploadPoll.js";
import { ObjectId } from "mongodb";
import CollegeEventUploadModel from "../models/UploadCollegeEventPostModel.js";

let UploadPhoto = (req, res, next) => {
    new PostUpload({
        userId: req.body.userId,
        Photo: {
            data: fs.readFileSync('./public/assets/post/photo/' + req.file.filename),
            contentType: 'image/png'
        },
        Caption: req.body.Caption,
        Likes: req.body.Likes,
        Comment: req.body.Comment,
        Share: req.body.Share
    }).save().then(() => res.json({ message: "Post Upload sucessfully" }))
        .catch((err) => res.status(500).json({ err: err }))
}

let UploadVideoController = (req, res, next) => {
    new UploadVideo({
        userId: req.body.userId,
        Video: {
            data: fs.readFileSync('./public/assets/post/video/' + req.file.filename),
            contentType: 'video/mp4'
        },
        Caption: req.body.Caption,
        Likes: req.body.Likes,
        Comment: req.body.Comment,
        Share: req.body.Share
    }).save().then(() => res.json({ message: "Video Upload sucessfully" }))
        .catch((err) => res.status(500).json({ err: err }))
}

let ArticleUpload = (req, res, next) => {
    new ArticleUploadModel({
        userId: req.body.userId,
        ArticleUploadedDate: req.body.ArticleUploadedDate,
        ArticleHeadLine: req.body.ArticleHeadLine,
        ArticleContent: req.body.ArticleContent
    }).save().then(() => res.status(200).json({ message: "article uploaded successfully" }))
        .catch((err) => res.status(500).json(err.message))
}

let CollegeEventsUpload = () => {
    new CollegeEventUploadModel({
        userId: req.body.userId,
        CollegeEvents: {
            data: fs.readFileSync('./public/assets/post/CollegeEvents/' + req.file.filename),
            contentType: 'image/png'
        },
        Caption: req.body.Caption,
        Likes: req.body.Likes,
        Comment: req.body.Comment,
        Share: req.body.Share
    }).save().then((result) => res.status(200).json("College Event Post uploaded")).catch((error) => res.status(500).json(error))
}

let PollUploadController = (req, res, next) => {
    new pollUpload({
        userId: req.body.userId,
        pollQuestion: req.body.pollQuestion,
        pollChoice: req.body.pollChoice
    }).save().then(() => res.status(200).json("poll uploaded successfully")).catch((err) => res.status(500).json(err.message))
}

const pollResultController = (req, res, next) => {
    pollUpload.updateOne({ _id: ObjectId(req.params.id) }, {
        $push: {
            pollResult: req.body
        }
    }).then((result) => res.json("poll vote updated result")).catch((err) => res.json(err))
}

export { UploadPhoto, UploadVideoController, ArticleUpload, PollUploadController, pollResultController, CollegeEventsUpload }