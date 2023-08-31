import express, {Router} from "express"
import upload from "../config/multer"
import { registerUser, signinUser, viewAll, viewOne } from "../controller/Authcontroller"


const router = express.Router()
router.route("/sign-up").post(upload, registerUser)
router.route("/sign-in").post(signinUser)
router.route("/:userID/view-one").get(viewOne)
router.route("/view").get(viewAll)
export default router  