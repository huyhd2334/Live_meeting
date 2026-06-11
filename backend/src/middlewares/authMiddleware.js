import jwt from "jsonwebtoken"
import { findByUserId } from "../models/userModel.js"

export const protectedRouter = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || (req.headers.authorization && req.headers.authorization.split(" ")[1])
    
    if (!token) {
      return res.status(401).json({ message: "Access token is required" })
    }
    
    
    let decodedUser

    try {
      decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    } catch (err) {
      console.log(err)
      return res.status(403).json({ message: "Invalid or expired token!" })
    }

    const user = await findByUserId(decodedUser.user_id)
    if (!user) {
      return res.status(404).json({ message: "User not found!" })
    }

    req.user = user
    next();
  } catch (error) {
    console.error("Error in protectedRouter:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
