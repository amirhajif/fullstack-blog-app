import autoBind from "auto-bind"
import userModel from "../user/user.model"

class AuthService {
    #userModel;
    constructor() {
        autoBind(this)
        this.#userModel = userModel
    }
    async signup(username, password, email) {

    }
}

export default new AuthService()