import autoBind from "auto-bind"
import userService from "./user.service.js"
import userMessage from "./user.message.js"

class UserController {
    #service
    constructor() {
        autoBind(this)
        this.#service = userService
    }

    async update(req, res, next) {
        try {
            const { user } = await this.#service.update(req.user, req.params, req.body)
            res.status(200).json({
                message: userMessage.UserUpdated,
                user
            })
        } catch (err) {
            next(err)
        }
    }

}

export default new UserController()