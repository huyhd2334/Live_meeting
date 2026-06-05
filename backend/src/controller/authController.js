import { registerService, loginService, refreshTokenService } from "../service/authService.js"

// constance
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000
const ACCESS_TOKEN_TTL = '30m'

export const registerControler = async(req, res) => {
    try {
        const result = await registerService(req.body) 
        res.status(200).json({success: true, message: result.message})
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const loginController = async (req, res) => {
    try {
        console.log("LOGIN CONTROLLER RUNNING")
        const result = await loginService(req.body)
        const device = req.body.device
        const user = {user_account: result.user_account, user_name: result.user_name}
        console.log("logged in", device)
        console.log("logged in", user)
        console.log("access_token: ", result.accessToken)
        
        // set cookies
        if(device==="web"){
            res
            .cookie("accessToken", result.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 30 * 60 * 1000,
            })
            .cookie("refreshToken", result.refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: REFRESH_TOKEN_TTL,
            })
            .status(200)
            .json({
                success: true,
                user: user,
                message: `User ${result.user_account} logged in!`,
            }); 
        }else{
            res.status(200).json({
            success: true,
            accessToken: result.accessToken,
            refreshToken: result.refresh_token,
            message: `User ${result.user_account} logged in!`,
            });
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const refreshTokenControler = async(req, res) => {
  try {
    const newAccessToken = await refreshTokenService(req)    
    // Web → cookie
    if (req.cookies?.refreshToken) {
      return res
        .cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: ACCESS_TOKEN_TTL,
        })
        .json({ message: true });
    }

    // Mobile → trả JSON
    return res.status(200).json({ accessToken: newAccessToken })} 
    
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message })
  }
}