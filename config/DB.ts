import mongoose from "mongoose"
import env from "dotenv"
env.config()

const MongoString = process.env.STRING!
export const DB = () => {
    mongoose.connect(MongoString).then(() => {
        console.log("Evian Database for Plutomanians is connected")
    })
}