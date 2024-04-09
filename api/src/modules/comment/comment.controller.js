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
    async getComment(req, res, next) {
        try {
            const { postId } = req.params
            const commments = await this.#service.getPostComment(postId)
            res.status(200).json(commments)
        } catch (error) {
            next(err)
        }
    }

    async likeComment(req, res, next) {
        try {
            const { commentId } = req.params
            const { user } = req
            const comment = await this.#service.commentLike(user, commentId)
            res.status(200).json(comment)
        } catch (err) {
            next(err)
        }

    }

    async edit(req, res, next) {
        try {
            const { commentId } = req.params
            const { user } = req
            const { content } = req.body
            const editedComment = await this.#service.commentEdit(user, commentId, content)
            res.json(editedComment)
        } catch (err) {
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const { commentId } = req.params
            const { user } = req
            const message = await this.#service.commentDelete(user, commentId)
            res.json(message)
        } catch (err) {
            next(err)
        }
    }

    async getComments(req, res, next) {
        try {
            const startIndex = parseInt(req.query.startIndex) || 0
            const limit = parseInt(req.query.limit) || 9
            const order = req.query.order === 'asc' ? 1 : -1
            const { user } = req
            const { comments, totalComments, lastMonthComments } = await this.#service.getComments(startIndex, limit, order, user)

            res.json({
                comments, totalComments, lastMonthComments
            })
        } catch (err) {
            next(err)
        }
    }

}

export default new CommentController()