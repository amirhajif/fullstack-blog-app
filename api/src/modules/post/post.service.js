import autoBind from "auto-bind";
class PostService {
    constructor() {
        autoBind(this)
    }
}

export default new PostService()