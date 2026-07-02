import React, { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";

const MainAuth = () => {
  const [userName, setUserName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [passW, setPassW] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const { login, signup } = useAuth();

  const handleLogin = () => {
    login(accountName, passW);
  };

  const handleSignup = () => {
    signup(userName, accountName, passW);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[450px] overflow-hidden rounded-3xl shadow-2xl">
      
          {/* Form */}
          <div className={`flex flex-col relative w-full lg:w-1/2 justify-center items-center p-8 bg-white relative `}>
            <div className={`flex flex-col ${showSignup?"translate-y-10":"translate-y-[150vw]"} transition-all duration-700 absolute inset-0 p-12 w-full gap-6`}>
              <h1 className="text-xl font-semibold self-center"> Sign Up </h1>
              <input
                type="text"
                placeholder="User Name"
                className="w-full h-11 rounded-lg  px-3 border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                  type="password"
                  placeholder="Password"
                  className="w-full h-11 rounded-lg  px-3 border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                  value={passW}
                  onChange={(e) => setPassW(e.target.value)}
                />
              <Button onClick={() => handleSignup()} className="bg-blue-700"> 
                  Sign Up !
              </Button>
            </div>       

            <div className={`flex flex-col ${!showSignup?"translate-y-5":"translate-y-[150vw]"} transition-all duration-700 absolute inset-0 p-12 w-full gap-6`}>
                <h1 className="text-xl font-semibold self-center"> Welcome Back! </h1>
                <span> Please enter your information to log in.</span>
                <input
                  type="text"
                  placeholder="User Account"
                  className="w-full h-11 rounded-lg  px-3 border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full h-11 rounded-lg  px-3 border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                  value={passW}
                  onChange={(e) => setPassW(e.target.value)}
                />

              <Button onClick={() => handleLogin()} className="bg-blue-700"> 
                  Login !
              </Button>
            </div>
          </div>

      {/* RIGHT PANEL */}
      <div
        className={`relative w-full lg:w-1/2 min-h-[280px] lg:min-h-full bg-cover bg-center position`}
        style={{
          backgroundImage: "url('/bg_login.jpg')",
        }}
      >
        <div className={`absolute inset-0 flex flex-col justify-center items-center text-white px-6`}>
            <AnimatePresence mode="wait">
                <motion.div
                  key={showSignup ? "signup" : "login"}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center gap-6"
                >
                  <h1 className="text-5xl font-bold">
                    {showSignup ? "HELLO" : "WELCOME"}
                  </h1>

                  <p className="mt-2 text-center">
                    {showSignup
                      ? "Already have an account?"
                      : "Is this your first time visiting my website?"}
                  </p>

                  <Button onClick={() => setShowSignup(pre => !pre)} className="bg-white opacity-70 text-black">
                     {showSignup? "LOGIN":"SIGN UP"}
                  </Button>
                </motion.div>
              </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MainAuth;