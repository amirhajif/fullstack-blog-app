import autoBind from "auto-bind"
import userService from "./user.service"

class UserController {
    #service
    constructor() {
        autoBind(this)
        this.#service = userService
    }

}

export default new UserController()