import autoBind from "auto-bind";
import createHttpError from "http-errors";
import postMessage from "./post.message.js";
import Post from "./post.model.js";
class PostService {

    constructor() {
        autoBind(this)
    }
    async createPost(req) {
        if (!req.user.isAdmin) {
            throw new createHttpError.Forbidden(postMessage.NotAdmin)
        }
        if (!req.body.title || !req.body.content) {
            throw new createHttpError.BadRequest(postMessage.AllFieldsComplete)
        }
        const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')
        const newPost = new Post({
            ...req.body,
            slug,
            userId: req.user.id
        })
        const createdPost = await newPost.save()
        return createdPost
    }
}

export default new PostService()