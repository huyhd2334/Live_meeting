import express from "express"
import {registerControler, loginController, refreshTokenControler} from "../controller/authController.js"
import { protectedRouter } from "../middlewares/authMiddleware.js"
const router = express.Router()

router.post("/login", loginController)
router.post("/signup", registerControler)
router.post("/refresh-accesstoken", refreshTokenControler)
router.get("/me", protectedRouter, (req, res) => {
    return res.status(200).json({success: true, user: req.user })  
})
// router.post("/logout", logoutAccount)

export default router