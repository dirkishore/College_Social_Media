import UploadPost from '../models/UploadPost.js'
import UploadVideo from '../models/UploadVideo.js'
import ArticleUpload from '../models/UploadArticleModel.js'
import pollUpload from '../models/UploadPoll.js'

let NotPermittedPost = (req, res, next) => {
    UploadPost.find({ PostStatus: false }).then((result) => res.json({ result })).catch((err) => res.json({ err: err }))
}

let NotPermittedVideos = (req, res, next) => {
    UploadVideo.find({ PostStatus: false }).then((result) => res.json({ result })).catch((err) => res.json({ err: err }))
}

let NotPermittedArticle = (req, res, next) => {
    ArticleUpload.find({ ArticleStatus: false }).then((result) => res.json({ result })).catch((err) => res.json({ err: err }))
}

const getNotPermittedPost = async (req, res) => {
    try {
        const post = await UploadPost.find({ PostStatus: false })
        const video = await UploadVideo.find({ PostVideoStatus: false })
        const poll = await pollUpload.find({ pollStatus: false })
        const article = await ArticleUpload.find({ ArticleStatus: false })

        res.json(post.concat(...video).concat(...poll).concat(...article))
    } catch (error) {
        res.status(500).json(error)
    }
}

export { NotPermittedPost, NotPermittedVideos, NotPermittedArticle, getNotPermittedPost }