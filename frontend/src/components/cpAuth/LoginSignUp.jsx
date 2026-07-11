import React, { useState, forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";

// Sử dụng forwardRef để nhận formRef truyền từ MainAuth xuống
const LoginSignUp = forwardRef((props, ref) => {
  const [userName, setUserName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [passW, setPassW] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const { login, signup, loading } = useAuth();

  const formVariants = {
    initial: { opacity: 0, x: showSignup ? 30 : -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: showSignup ? -30 : 30 },
  };

  return (
    <motion.div
      ref={ref} // Gắn ref nhận được vào đây để tính toán scroll-mt-12 chuẩn xác
      layout
      className="flex flex-col lg:flex-row w-full max-w-4xl rounded-2xl shadow-xl shadow-slate-200/60 bg-white scroll-mt-12 mb-16 overflow-hidden border border-[var(--line)]"
      style={{ touchAction: "pan-y" }} // Khóa chống đơ vuốt
    >
      {/* LEFT: FORM */}
      <div className="relative flex flex-col w-full lg:w-1/2 justify-center items-center p-8 md:p-12 min-h-[500px]">
        <AnimatePresence mode="wait" initial={false}>
          {showSignup ? (
            <motion.div
              key="signup"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="flex flex-col w-full gap-5"
            >
              <div>
                <p className="tf-mono text-[11px] text-[var(--cyan)] mb-1">
                  $ create-account
                </p>
                <h2 className="tf-display text-2xl font-semibold text-[var(--ink)]">
                  Create your account
                </h2>
                <p className="text-[var(--slate)] text-sm mt-1">
                  Join the teams already shipping on Tech Flow.
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  signup({
                    user_name: userName,
                    user_account: accountName,
                    email: email,
                    password: passW,
                  });
                }}
                className="flex flex-col gap-3"
              >
                <Field
                  label="Account name"
                  value={accountName}
                  onChange={setAccountName}
                  placeholder="Account name"
                />
                <Field
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="Email"
                />
                <Field
                  label="User name"
                  value={userName}
                  onChange={setUserName}
                  placeholder="User name"
                />
                <Field
                  label="Password"
                  type="password"
                  value={passW}
                  onChange={setPassW}
                  placeholder="Password"
                />
                <Button
                  disabled={loading}
                  type="submit"
                  className="bg-[var(--signal)] hover:bg-[var(--signal)]/90 text-white w-full mt-2 font-medium"
                >
                  {loading ? <Spinner label="Creating account…" /> : "Create account"}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="flex flex-col w-full gap-5"
            >
              <div>
                <p className="tf-mono text-[11px] text-[var(--cyan)] mb-1">
                  $ login
                </p>
                <h2 className="tf-display text-2xl font-semibold text-[var(--ink)]">
                  Welcome back
                </h2>
                <p className="text-[var(--slate)] text-sm mt-1">
                  Pick up your workspace where you left it.
                </p>
              </div>
              <form
                className="flex flex-col gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  login(accountName, passW);
                }}
              >
                <Field
                  label="Account name"
                  value={accountName}
                  onChange={setAccountName}
                  placeholder="User account"
                />
                <Field
                  label="Password"
                  type="password"
                  value={passW}
                  onChange={setPassW}
                  placeholder="Password"
                />
                <Button
                  disabled={loading}
                  type="submit"
                  className="bg-[var(--signal)] hover:bg-[var(--signal)]/90 text-white w-full mt-2 font-medium"
                >
                  {loading ? <Spinner label="Logging in…" /> : "Log in"}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT: PIPELINE SIGNATURE PANEL */}
      <div className="relative w-full lg:w-1/2 min-h-[360px] lg:min-h-full bg-[var(--ink)] flex flex-col items-center justify-center overflow-hidden px-8 py-12">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={showSignup ? "signup-txt" : "login-txt"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 text-center mb-10"
          >
            <h3 className="tf-display text-2xl font-semibold text-white">
              {showSignup ? "Already shipping with us?" : "New to Tech Flow?"}
            </h3>
            <p className="text-slate-300 text-sm mt-2 max-w-[260px] mx-auto leading-relaxed">
              {showSignup
                ? "Log back in and pick up your sprint."
                : "Create a workspace in under a minute."}
            </p>
            <Button
              type="button"
              onClick={() => setShowSignup((prev) => !prev)}
              className="mt-5 bg-white text-[var(--ink)] hover:bg-slate-100 font-medium px-7 rounded-full shadow-lg transition-transform active:scale-95"
            >
              {showSignup ? "Log in" : "Create account"}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

// Giữ nguyên các sub-component Helper
const Field = ({ label, value, onChange, placeholder, type = "text" }) => (
  <label className="flex flex-col gap-1">
    <span className="sr-only">{label}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-11 rounded-lg px-3 border border-[var(--line)] focus:outline-none focus:border-[var(--signal)] focus:ring-2 focus:ring-[var(--signal)]/15 transition-colors text-sm bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  </label>
);

const Spinner = ({ label }) => (
  <div className="flex justify-center items-center gap-2">
    <div className="border-2 rounded-full border-white/30 border-t-white animate-spin w-4 h-4" />
    <span>{label}</span>
  </div>
);

LoginSignUp.displayName = "LoginSignUp";
export default LoginSignUp;