import autoBind from "auto-bind";
import commentModel from './comment.model.js'
import createHttpError from "http-errors";
import commentMessage from "./comment.message.js";
class CommentService {
    #model
    constructor() {
        autoBind(this)
        this.#model = commentModel
    }

    async create(user, content, postId, userId) {
        if (user.id !== userId) {
            throw new createHttpError.Unauthorized(commentMessage.UnAthorized)
        }
        const newComment = {
            content,
            postId,
            userId
        }
        const createdComment = await this.#model.create(newComment)
        return createdComment
    }

    async getPostComment(postId) {
        const comments = await this.#model.find({ postId: postId }).sort({ createdAt: -1 })
        return comments
    }
}

export default new CommentService()