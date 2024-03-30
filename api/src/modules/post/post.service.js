import autoBind from "auto-bind";
import createHttpError from "http-errors";
import postMessage from "./post.message.js";
import Post from "./post.model.js";
class PostService {
    #postModel
    constructor() {
        autoBind(this)
        this.#postModel = Post
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
    async getPosts(startIndex, limit, order, userId, category, slug, postId, searchTerm) {
        const posts = await this.#postModel.find({
            ...(userId && { userId: userId }),
            ...(category && { category: category }),
            ...(slug && { slug: slug }),
            ...(postId && { _id: postId }),
            ...(searchTerm && {
                $or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        }).sort({ updatedAt: order }).skip(startIndex).limit(limit)
        const totalPosts = await this.#postModel.countDocuments({})

        const now = new Date()

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDay()
        )
        const lastMonthPosts = await this.#postModel.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        })


        return { posts, totalPosts, lastMonthPosts }
    }
    async delete(user, postId, userId) {
        if (!user.isAdmin || user.id !== userId) {
            throw new createHttpError.Forbidden(postMessage.CantDelete)
        }
        await this.#postModel.findByIdAndDelete(postId)
        return postMessage.DeleteSuccessfully
    }
    async update(user, postId, userId, title, content, category, image) {
        if (!user.isAdmin || user.id !== userId) {
            throw new createHttpError.Forbidden(postMessage.CantDelete)
        }
        const updatedPost = await this.#postModel.findByIdAndUpdate(postId, {
            $set: {
                title,
                content,
                category,
                image
            }
        }, { new: true })

        return updatedPost

    }
}

export default new PostService()