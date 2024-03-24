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

    async delete(req, res, next) {
        try {
            const { userId: id } = req.params
            const message = await this.#service.delete(id, req.user.id)
            res.status(200).json({
                message
            })
        } catch (err) {
            next(err)
        }
    }
    async signout(req, res, next) {
        try {
            res.clearCookie('access_token').status(200).json(userMessage.UserSignout)
        } catch (err) {
            next(err)
        }
    }

}

export default new UserController()