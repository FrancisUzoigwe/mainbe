import express, {Router} from "express"
import { createProduct, deleteProduct, viewOneProducts, viewProducts } from "../controller/productsController"
import { image } from "../config/multer"

const router:Router= express.Router()
router.route("/:userID/create-product").post(image,createProduct)
router.route("/view-products").get(viewProducts)
router.route("/:userID/:productID/view-one-product").get(viewOneProducts)
router.route("/:productID/delete").delete(deleteProduct)

export default router