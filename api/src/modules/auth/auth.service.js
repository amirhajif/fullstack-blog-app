import autoBind from "auto-bind"
import userModel from "../user/user.model.js"
import authMessage from "./auth.message.js"
import bcryptjs from "bcryptjs"

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
}

export default new AuthService()