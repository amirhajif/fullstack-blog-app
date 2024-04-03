import autoBind from "auto-bind";
import commentModel from './comment.model.js'
import createHttpError from "http-errors";
import commentMessage from "./comment.message.js";
import Comment from "./comment.model.js";
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
    async commentLike(user, commentId) {
        const comment = await this.#model.findById(commentId)
        if (!comment) {
            throw new createHttpError.NotFound(commentMessage.CommentNotAvailable)
        }

        const userIndex = comment.likes.indexOf(user.id)
        if (userIndex === -1) {
            comment.likes.push(user.id)
            comment.numberOfLikes += 1
        } else {
            comment.likes.splice(userIndex, 1)
            comment.numberOfLikes -= 1
        }
        await comment.save()
        return comment
    }
}

export default new CommentService()