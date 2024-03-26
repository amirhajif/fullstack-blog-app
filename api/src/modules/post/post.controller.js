import autoBind from "auto-bind"
import postService from "./post.service.js"
import postMessage from "./post.message.js"

class PostController {
    #service
    constructor() {
        autoBind(this)
        this.#service = postService
    }
    async createPost(req, res, next) {
        try {
            const createdPost = await this.#service.createPost(req)
            res.status(201).json({
                message: postMessage.PostCreated,
                post: createdPost
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new PostController()