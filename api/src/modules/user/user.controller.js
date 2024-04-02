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
            const { user } = req
            const message = await this.#service.delete(id, user)
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

    async getUsers(req, res, next) {
        try {
            const { user } = req
            const startIndex = parseInt(req.query.startIndex) || 0
            const limit = parseInt(req.query.limit) || 9
            const sortDirection = req.query.sort === 'asc' ? 1 : -1

            const { users, totalUsers, lastMonthUsers } = await this.#service.getUsers(user, startIndex, limit, sortDirection)

            res.json({ users, totalUsers, lastMonthUsers })
        } catch (err) {
            next(err)
        }
    }

    async getUser(req, res, next) {
        try {
            const { userId } = req.params
            const { user } = await this.#service.getUser(userId)
            res.json(user)
        } catch (err) {
            next(err)
        }
    }

}

export default new UserController()