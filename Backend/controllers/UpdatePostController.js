import PostUpload from "../models/UploadPost.js";
import ArticleUpload from "../models/UploadArticleModel.js";
import videoUpload from "../models/UploadVideo.js";
import fs from 'fs'
import { ObjectId } from "mongodb";



const onLikes = async (req, res, next) => {
    try {
        const post = await PostUpload.findById(req.params.id)
        if (!post.Likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { Likes: req.body.userId } })
            res.status(200).json("post has been liked");
        } else {
            await post.updateOne({ $pull: { Likes: req.body.userId } })
            res.status(200).json("post has been unliked");
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const onArticleLikes = async (req, res, next) => {
    try {
        const article = await ArticleUpload.findById(req.params.id)
        if (!article.Likes.includes(req.body.userId)) {
            await article.updateOne({ $push: { Likes: req.body.userId } })
            res.status(200).json("article has been liked");
        } else {
            await article.updateOne({ $pull: { Likes: req.body.userId } })
            res.status(200).json("article has been unliked");
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const onVideoLikes = async (req, res, next) => {
    try {
        const video = await videoUpload.findById(req.params.id)
        if (!video.Likes.includes(req.body.userId)) {
            await video.updateOne({ $push: { Likes: req.body.userId } })
            res.status(200).json("video has been liked");
        } else {
            await video.updateOne({ $pull: { Likes: req.body.userId } })
            res.status(200).json("video has been unliked");
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const onPostComment = (req, res, next) => {
    let id = req.body.id


    PostUpload.updateOne({ _id: ObjectId(id) }, {
        $push: {
            Comments: {
                Profile: {
                    data: req.body.Profile,
                    contentType: 'image/png'
                },
                Name: req.body.Name,
                Comment: req.body.Comment
            }
        }
    }).then((result) => res.json({ result })).catch((err) => res.json({ err }))
}

const getAllComments = (req, res, next) => {
    let id = req.body.id
    PostUpload.findById(id).then((result) => res.json({ result: result.Comments }))
}

const onVideoComment = (req, res, next) => {
    let id = req.body.id


    videoUpload.updateOne({ _id: ObjectId(id) }, {
        $push: {
            Comments: {
                Profile: {
                    data: req.body.Profile,
                    contentType: 'image/png'
                },
                Name: req.body.Name,
                Comment: req.body.Comment
            }
        }
    }).then((result) => res.json({ result })).catch((err) => res.json({ err }))
}

const getAllVideoComments = (req, res, next) => {
    let id = req.body.id
    videoUpload.findById(id).then((result) => res.json({ result: result.Comments }))
}

const onArticleComment = (req, res, next) => {
    let id = req.body.id


    ArticleUpload.updateOne({ _id: ObjectId(id) }, {
        $push: {
            Comments: {
                Profile: {
                    data: req.body.Profile,
                    contentType: 'image/png'
                },
                Name: req.body.Name,
                Comment: req.body.Comment
            }
        }
    }).then((result) => res.json({ result })).catch((err) => res.json({ err }))
}

const getAllArticleComments = (req, res, next) => {
    let id = req.body.id
    ArticleUpload.findById(id).then((result) => res.json({ result: result.Comments }))
}

const updatePost = async (req, res, next) => {
    try {
        const post = await PostUpload.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("the post has been updated")
        } else {
            res.status(403).json("you can update only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const post = await PostUpload.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.deleteOne()
            res.status(200).json("the post has been deleted")
        } else {
            res.status(403).json("you can delete only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export { onLikes, onArticleLikes, onVideoLikes, onPostComment, getAllComments, onVideoComment, getAllVideoComments, onArticleComment, getAllArticleComments, updatePost, deletePost }