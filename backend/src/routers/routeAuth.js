import express from "express"
import {registerController, loginController, refreshTokenController, logOutController} from "../controller/authController.js"
import { protectedRouter } from "../middlewares/authMiddleware.js"
const router = express.Router()

router.post("/login", loginController)
router.post("/signup", registerController)
router.post("/refresh-accesstoken", refreshTokenController)
router.get("/me", protectedRouter, (req, res) => {
    return res.status(200).json({success: true, user: req.user })  
})
router.post("/logout", logOutController)

export default router