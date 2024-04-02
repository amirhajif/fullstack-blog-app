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
        await this.#model.create(newComment)
        return newComment
    }
}

export default new CommentService()