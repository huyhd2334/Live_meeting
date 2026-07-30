import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { findByUserAccount, addAccount } from "../models/userModel.js"
import { addSession, deleteSessionByToken, findSessionByRefreshToken } from "../models/sessionModel.js" 

const ACCESS_TOKEN_TTL = '30m'
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000 // 14 ngày

export const registerService = async (data) => {
    try {        
        const { user_name, user_account, email, password, avatar_url } = data;
        const checkExisUser = await findByUserAccount(user_account)
        
        if (!checkExisUser) {
            const hashPassW = await bcrypt.hash(password, 10)
            const newAccount = await addAccount({ user_account, user_name, email, password_hash: hashPassW, avatar_url })
            return newAccount
        } else {
            throw new Error("Account Name invalid!")
        }
    } catch (error) {
        throw error
    }
}

export const loginService = async (data) => {
    try {
        const { user_account, password } = data;
        if (!user_account || !password) {
            throw new Error("Missing user_account or password")
        }

        const checkExisUser = await findByUserAccount(user_account)

        if (!checkExisUser) {
            throw new Error("User doesn't exist")
        }

        const isPasswCorrect = await bcrypt.compare(password, checkExisUser.password_hash)

        if (!isPasswCorrect) {
            throw new Error("Password is not correct!")
        }

        // Create access token
        const accessToken = jwt.sign(
            { user_id: checkExisUser.user_id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: ACCESS_TOKEN_TTL }
        )
        
        // Create refresh token
        const refresh_token = crypto.randomBytes(64).toString("hex")
        
        // Lưu session vào DB
        await addSession({ 
            user_id: checkExisUser.user_id, 
            refresh_token, 
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL) 
        })
        
        return { 
            user_account: user_account, 
            user_name: checkExisUser.user_name,
            message: "Loged in successfully !",
            accessToken, 
            refresh_token 
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const refreshTokenService = async (req) => {
    try {
        let refresh_token = req.cookies?.refreshToken || req.body?.refreshToken;

        if (!refresh_token) {
            throw new Error("Refresh token required")
        }

        const session = await findSessionByRefreshToken(refresh_token);

        if (!session || new Date(session.expires_at) < new Date()) {
            throw new Error("Invalid or expired refresh token")
        }

        const newAccessToken = jwt.sign(
            { user_id: session.user_id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_TTL }
        );

        return newAccessToken
    } catch (error) {
        throw new Error(error.message)
    }
}

// SERVICE LOGOUT
export const logoutService = async (req) => {
    try {
        const token = req.cookies?.refreshToken || req.body?.refreshToken;
        if (token) {
            await deleteSessionByToken({ refresh_token: token });
            console.log("Deleted Session!");
        }
        return true;
    } catch (error) {
        throw new Error("Logout service error: " + error.message)
    }
}