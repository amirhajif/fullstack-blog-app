import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const DBconnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("MongoDB is Connected")
        }).catch((err) => {
            console.log(err?.message ?? "Failed DB connection")
        })
}

export default DBconnect 