import autoBind from "auto-bind"
import userModel from "../user/user.model.js"
import authMessage from "./auth.message.js"
import bcryptjs from "bcryptjs"
import createHttpError from "http-errors"
import jwt from "jsonwebtoken"

class AuthService {
    #userModel;
    constructor() {
        autoBind(this)
        this.#userModel = userModel
    }
    async signup(username, password, email) {
        if (!username || !password || !email || username === "" || email === "" || password === "") {
            throw new Error(authMessage.EmptyField)
        }
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()
        return newUser
    }
    async signin(email, password) {
        if (!email || email == "" || !password || password == "") {
            throw new Error(authMessage.EmptyField)
        }
        const user = await this.#userModel.findOne({ email })
        if (!user) {
            throw new createHttpError.NotFound(authMessage.EmailError)
        }
        const checkPassword = bcryptjs.compareSync(password, user.password)
        if (!checkPassword) {
            throw new createHttpError.Unauthorized(authMessage.InvalidPassword)
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        )

        const { password: pass, ...rest } = user._doc
        return { token, user: rest }
    }
}

export default new AuthService()