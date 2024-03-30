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
    async getPosts(req, res, next) {
        try {
            const startIndex = parseInt(req.query.startIndex) || 0
            const limit = parseInt(req.query.limit) || 9
            const order = req.query.order === 'asc' ? 1 : -1
            const { userId, category, slug, postId, searchTerm } = req.query
            const { posts, totalPosts, lastMonthPosts } = await this.#service.getPosts(startIndex, limit, order, userId, category, slug, postId, searchTerm)
            res.status(200).json({
                posts,
                totalPosts,
                lastMonthPosts
            })

        } catch (err) {
            next(err)
        }
    }
    async delete(req, res, next) {
        try {
            const { user } = req
            const { postId, userId } = req.params
            const message = await this.#service.delete(user, postId, userId)
            res.json(message)

        } catch (err) {
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            const { user } = req
            const { postId, userId } = req.params
            const { title, content, category, image } = req.body
            const updatedPost = await this.#service.update(user, postId, userId, title, content, category, image)
            res.status(200).json(updatedPost)

        } catch (err) {
            next(err)
        }
    }
}

export default new PostController()