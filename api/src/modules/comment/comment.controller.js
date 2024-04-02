import autoBind from "auto-bind";
import commentService from "./comment.service.js";
class CommentController {
    #service
    constructor() {
        autoBind(this)
        this.#service = commentService
    }

    async create(req, res, next) {
        try {
            const { content, postId, userId } = req.body
            const { user } = req
            const newComment = await this.#service.create(user, content, postId, userId)
            res.json(newComment)
        } catch (err) {
            next(err)
        }
    }

}

export default new CommentController()