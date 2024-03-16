import autoBind from "auto-bind"
import authService from "./auth.service.js"
import authMessage from "./auth.message.js"


class AuthController {
    #service
    constructor() {
        autoBind(this)
        this.#service = authService
    }

    async signup(req, res, next) {
        try {
            const { username, password, email } = req.body
            const newUser = await this.#service.signup(username, password, email)
            res.json({
                message: authMessage.CreateUser,
                data: {
                    username: newUser.username,
                    email: newUser.email
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async signin(req, res, next) {
        try {
            const { email, password } = req.body
            const { token, user } = await this.#service.signin(email, password)
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(user)
        } catch (err) {
            next(err)
        }
    }



}

export default new AuthController()