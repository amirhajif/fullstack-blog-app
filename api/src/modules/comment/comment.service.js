import autoBind from "auto-bind";
import commentModel from './comment.model.js'
class CommentService {
    #model
    constructor() {
        autoBind(this)
        this.#model = commentModel
    }
}

export default new CommentService()