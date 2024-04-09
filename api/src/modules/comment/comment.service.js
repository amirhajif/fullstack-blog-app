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

    async commentEdit(user, commentId, content) {
        const comment = await this.#model.findById(commentId)
        if (!comment) {
            throw new createHttpError.NotFound(commentMessage.CommentNotAvailable)
        }
        if (comment.userId != user.id && !user.isAdmin) {
            throw new createHttpError.Unauthorized(commentMessage.CheckRoleAndAuth)
        }

        const editedComment = await this.#model.findByIdAndUpdate(commentId, {
            content
        }, {
            new: true
        })

        return editedComment
    }
    async commentDelete(user, commentId) {
        const comment = await this.#model.findById(commentId)
        if (!comment) {
            throw new createHttpError.NotFound(commentMessage.CommentNotAvailable)
        }
        if (comment.userId != user.id && !user.isAdmin) {
            throw new createHttpError.Unauthorized(commentMessage.CheckRoleAndAuth)
        }
        await this.#model.findByIdAndDelete(commentId)


        return commentMessage.CommentDeleted
    }

    async getComments(startIndex, limit, order, user) {
        if (!user.isAdmin) {
            throw new createHttpError.Forbidden(commentMessage.CheckRoleAndAuth)
        }
        const comments = await this.#model.find()
            .sort({ createdAt: order })
            .skip(startIndex)
            .limit(limit);

        const totalComments = await this.#model.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthComments = await this.#model.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        return { comments, totalComments, lastMonthComments }
    }
}

export default new CommentService()