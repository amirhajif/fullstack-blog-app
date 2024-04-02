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
            res.json("hello")
        } catch (err) {
            next(err)
        }
    }

}

export default new CommentController()