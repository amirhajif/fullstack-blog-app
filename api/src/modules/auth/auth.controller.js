import autoBind from "auto-bind"
import authService from "./auth.service"


class AuthController {
    #service
    constructor() {
        autoBind(this)
        this.#service = authService
    }

    async signup(rq, res) {
        const { username, password, email } = req.body

    }

}

export default new AuthController()