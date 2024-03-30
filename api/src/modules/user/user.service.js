import autoBind from "auto-bind"
import UserModel from "./user.model.js"
import createHttpError from "http-errors";
import userMessage from "./user.message.js";
import bcryptjs from 'bcryptjs'

class UserService {
    #model;
    constructor() {
        autoBind(this)
        this.#model = UserModel
    }
    async update(user, params, body) {
        if (user.id !== params.userId) {
            throw new createHttpError.Unauthorized(userMessage.UnAuthorized)
        }
        if (body.password) {
            if (body.password.length < 6) {
                console.log("come")
                throw new createHttpError.BadRequest(userMessage.PasswordLength)
            }
            body.password = bcryptjs.hashSync(body.password, 10)
        }
        if (body.username) {
            if (body.username.length < 7 || body.username.length > 20) {
                throw new createHttpError.BadRequest(userMessage.UsernameLength)
            }
            if (body.username.includes(' ')) {
                throw new createHttpError.BadRequest(userMessage.UsernameIncludeSpace)
            }
            if (body.username !== body.username.toLowerCase()) {
                throw new createHttpError.BadRequest(userMessage.UsernameLowercase)
            }
            if (!body.username.match(/^[a-z0-9]+$/)) {
                throw new createHttpError.BadRequest(userMessage.UsernameLetters)
            }
        }
        const updatedUser = await this.#model.findByIdAndUpdate(params.userId, {
            $set: {
                username: body.username,
                email: body.email,
                profilePicture: body.profilePicture,
                password: body.password
            }
        }, { new: true })
        const { password, ...rest } = updatedUser._doc
        return { user: rest }
    }

    async delete(id, reqId) {
        if (id !== reqId) {
            throw new createHttpError.Unauthorized(userMessage.UnAuthorized)
        }
        const foundedUser = await this.#model.findByIdAndDelete(id)
        if (!foundedUser) {
            throw new createHttpError.NotFound(userMessage.NotFoundUser)
        }
        return userMessage.UserDeleted
    }

    async getUsers(user, startIndex, limit, sortDirection) {
        if (!user.isAdmin) {
            throw new createHttpError.Forbidden(userMessage.ShouldBeAdmin)
        }
        const users = await this.#model.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit)
        const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });

        const totalUsers = await this.#model.countDocuments({})

        const now = new Date()

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDay()
        )

        const lastMonthUsers = await this.#model.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        })

        return { users: usersWithoutPassword, totalUsers, lastMonthUsers }
    }
}

export default new UserService()