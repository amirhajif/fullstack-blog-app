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
}

export default new UserService()