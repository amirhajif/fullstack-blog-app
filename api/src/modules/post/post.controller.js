import autoBind from "auto-bind"
import postService from "./post.service.js"

class PostController {
    #service
    constructor() {
        autoBind(this)
        this.#service = postService
    }
}