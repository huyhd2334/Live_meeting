import { loginService, logoutService, signupService } from "@/service/authService.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import { useAuthContext } from "@/context/AuthContext"

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const {loginContex} = useAuthContext()
  const login = async (accountName, passW) => {
    try {
      setLoading(true)
      const data = await loginService({ accountName, passW })

      if (data.success) {
        localStorage.setItem("userAccount", JSON.stringify(data.user))
        loginContex(data.user)
        toast.success(data.message)
        navigate("/homepage")
      } else {
        toast.error("invalid password or account name")
      }
    } catch (err) {
      toast.error(err.response.data.message)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const signup = async ({user_name, user_account, email, password, avatar_url = "null"}) => {
    try {
      if (!user_name || !user_account || !password) {
        return toast.error("information is empty");
      }
      setLoading(true)
      const data = await signupService({ user_name, user_account, email, password, avatar_url })

      if (data.success) {
        toast.success("signup successful")
        toast.info("login now!")
      } else {
        toast.error("Account Name invalid!")
      }
    } catch (err) {
      toast.error(err.response.data.message)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try{
      setLoading(true)
      const data = await logoutService()
      localStorage.clear()
      if (data.success) {
        toast.success("Loged Out successful")
      } else {
        toast.error("LogOut Error")
      }
    } catch (err) {
      toast.error(err.response.data.message)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return { login, signup, logout, loading }
}