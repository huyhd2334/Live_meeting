import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { findByUserAccount, findByUserEmail, deleteUserAccount, updateUserAccount, addAccount } from "../models/userModel.js"
import { addSession, findSessionByRefreshToken } from "../models/sessionModel.js"
import { error } from "console"

const ACCESS_TOKEN_TTL = '30m'
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000 // 14 DAYS

export const registerService = async(data) => {
    try{        
        
        const { user_name, user_account, email, password, avatar_url} = data;
        const checkExisUser = await findByUserAccount(user_account)
        
        console.log(user_account, user_name, password, email)

        if(!checkExisUser){
            const hashPassW = await bcrypt.hash(password, 10)
            
            const newAccount = await addAccount({user_account, user_name, email, password_hash: hashPassW, avatar_url})
            return newAccount
        }else{
            throw new Error("Account Name invalid!")
        }
    }catch(error){
        throw error
    }
}
export const loginService = async (data) => {
    try {
        const {user_account, password} = data;
        if(!user_account || !password) {
            throw new error("!user_account || !password")
        }

        const checkExisUser = await findByUserAccount(user_account)
        console.log("account: ", checkExisUser)

        if (!checkExisUser){
            throw new Error("User doesn't exist", 404)
        }

        // check
        const isPasswCorrect = await bcrypt.compare(password, checkExisUser.password_hash)
        console.log("password: ", isPasswCorrect)

        if(!isPasswCorrect){
            throw new Error("PassWord is not correct!")
        }

        // access token
        const accessToken = jwt.sign({user_id: checkExisUser.user_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_TTL})
        
        // generate refresh token
        const refresh_token = crypto.randomBytes(64).toString("hex")
        
        // new session
        await addSession({user_id: checkExisUser.user_id, refresh_token, expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),})
        
        return {user_account: user_account, user_name: checkExisUser.user_name, accessToken: accessToken , refresh_token: refresh_token}
    } catch (error) {
        throw new Error("ERROR login:" + error.message);
    }
};

export const refreshTokenService = async (data) => {
  try {

    let refresh_token
    // Web → cookie
    if (data.cookies?.refreshToken) {
      refresh_token = data.cookies.refreshToken;
    } 
    // Mobile → body
    else if (data.body?.refreshToken) {
      refresh_token = data.body.refreshToken;
    }

    if (!refresh_token) {
        throw new error("Refresh token datauired")
    }

    const session = await findSessionByRefreshToken(refresh_token);

    if (!session || session.expires_at < new Date()) {
        throw new error("Invalid refresh token")
    }

    const newAccessToken = jwt.sign(
      { user_id: session.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    return newAccessToken
    
  } catch (error) {
    throw new Error("Refresh token error:", error)
  }
}

// export const logoutService = async(data, res) => {
//     try {
//         // get refresh token from cookie
//         const token = req.cookies?.refresh_token;
//         if(token){
//         // delete refresh token in session
//            await Session.deleteOne({refresh_token: token});
//         // delete cookie
//         res.clearCookie("refresh_token", {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//         });
//         }

//         return res.sendStatus(204)
//     }catch(e){
//         console.error("error when signout", e)
//         return res.status(500).json({message: "internal errors"})
//     }
// }

