import React, { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";

const MainAuth = () => {
  const [userName, setUserName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");

  const [passW, setPassW] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  
  const { login, signup, loading, } = useAuth();

  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[500px] overflow-hidden rounded-3xl shadow-2xl bg-white">
      
      <div className="relative flex flex-col w-full lg:w-1/2 justify-center items-center p-12 min-h-[400px]">
        <AnimatePresence mode="wait">
          {showSignup ? (
            /* ---- FORM SIGN UP ---- */
            <motion.div
              key="signup"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col w-full gap-5"
            >
              <h1 className="text-2xl font-semibold text-center">Sign Up</h1>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  signup({user_name: userName, user_account: accountName, email: email, password: passW});
                }}
                className="flex flex-col gap-2">

                <input
                  type="text"
                  placeholder="Account Name"
                  className="w-full h-11 rounded-lg px-3 border-2 border-gray-200 focus:outline-none focus:border-blue-500"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full h-11 rounded-lg px-3 border-2 border-gray-200 focus:outline-none focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="User Name"
                  className="w-full h-11 rounded-lg px-3 border-2 border-gray-200 focus:outline-none focus:border-blue-500"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full h-11 rounded-lg px-3 border-2 border-gray-200 focus:outline-none focus:border-blue-500"
                  value={passW}
                  onChange={(e) => setPassW(e.target.value)}
                />
                <Button 
                    disabled={loading}
                    onClick={() => signup({user_name: userName, user_account: accountName, email: email, password: passW})}
                    className={`bg-blue-700 w-full ${loading?"disabled":""}`}>
                    {loading?(
                    <div className="flex justify-center items-center gap-2">
                      <div className="border-2 rounded-full border-white border-t-blue-700 animate-spin w-5 h-5"></div>
                      <span>Processing...</span>
                    </div>
                    ):"Sign Up!"}              
                </Button>
              </form>
            </motion.div>
          ) : (
            /* ---- FORM LOGIN ---- */
            <motion.div
              key="login"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col w-full gap-5"
            >

              <h1 className="text-2xl font-semibold text-center">Welcome Back!</h1>
              <p className="text-gray-500 text-sm text-center">Please enter your information to log in.</p>
              <form className="flex flex-col gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      login(accountName, passW)
                    }}>
              <input
                type="text"
                placeholder="User Account"
                className="w-full h-11 rounded-lg px-3 border-2 border-gray-200 focus:outline-none focus:border-blue-500"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full h-11 rounded-lg px-3 border-2 border-gray-200 focus:outline-none focus:border-blue-500"
                value={passW}
                onChange={(e) => setPassW(e.target.value)}
              />
              <Button onClick={() => login(accountName, passW)} className="bg-blue-700 w-full"
                  disabled={loading}>
                {loading?(
                <div className="flex justify-center items-center gap-2">
                  <div className="border-2 rounded-full border-white border-t-blue-700 animate-spin w-5 h-5"></div>
                  <span>Processing...</span>
                </div>
                ):"Login!"}
              </Button>
            </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT PANEL: BACKGROUND & TEXT */}
      <div
        className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/bg_login.jpg')" }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={showSignup ? "signup-txt" : "login-txt"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              <h1 className="text-5xl font-bold">
                {showSignup ? "HELLO" : "WELCOME"}
              </h1>
              <p className="mt-2 text-center max-w-[300px]">
                {showSignup
                  ? "Already have an account?"
                  : "Is this your first time visiting my website?"}
              </p>
              <Button onClick={() => setShowSignup(prev => !prev)} className="bg-white text-black hover:bg-gray-100">
                {showSignup ? "LOGIN" : "SIGN UP"}
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default MainAuth;