import express, {Router} from "express"
import upload from "../config/multer"
import { registerUser } from "../controller/Authcontroller"


const router = express.Router()
router.route("/register").post(upload, registerUser)

export default router