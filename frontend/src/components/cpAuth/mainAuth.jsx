import React, { useRef } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import LoginSignUp from "./LoginSignUp.jsx";

const FEATURES = [
  {
    cmd: "$ create-workspace",
    title: "Smart workspaces",
    copy: "Spin up a hub, lay out an agile roadmap, and watch your team's velocity update in real time.",
  },
  {
    cmd: "$ ask-copilot",
    title: "AI RAG ",
    copy: "Ask questions in plain language and get answers pulled straight from your docs, codebase, and project history.",
  },
  {
    cmd: "$ suggest-next",
    title: "Predictive tasks",
    copy: "Get the next step suggested automatically, tuned to what your sprint actually needs right now.",
  },
];

const MainAuth = () => {
  const formRef = useRef(null); // Quản lý ref tại file cha

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div
      className="w-full flex flex-col items-center bg-[var(--paper)]"
      style={{
        "--ink": "#10152B",
        "--paper": "#FAFAFC",
        "--signal": "#4C6FFF",
        "--cyan": "#23D3C3",
        "--amber": "#FFB020",
        "--slate": "#5B6478",
        "--line": "#E4E7F2",
        fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
        touchAction: "pan-y", 
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .tf-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .tf-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      `}</style>

      {/* ---- HERO ---- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: false }}
        className="text-center max-w-4xl my-14 md:my-24 flex flex-col items-center gap-7 px-6"
      >
        <motion.span
          variants={itemVariants}
          className="tf-mono text-xs tracking-[0.2em] text-[var(--signal)] uppercase border border-[var(--line)] rounded-full px-3 py-1"
        >
          workspace os for fast-moving teams
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="tf-display text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-[var(--signal)] to-[var(--cyan)] bg-clip-text text-transparent"
        >
          Tech Flow
        </motion.h1>
        <motion.div variants={itemVariants}>
          <Button
            onClick={scrollToForm}
            className="mt-3 bg-[var(--ink)] hover:bg-[var(--ink)]/90 text-white font-medium rounded-full px-7 py-6 text-sm tracking-wide transition-all hover:scale-[1.03] active:scale-95 group"
          >
            Jump into a workspace
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Button>
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-[var(--slate)] max-w-xl leading-relaxed"
        >
          Plan, build, and ship together — without leaving the thread of what
          your team already knows.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4 text-left w-full"
        >
          {FEATURES.map((f) => (
            <div
              key={f.cmd}
              className="p-6 bg-white rounded-xl border border-[var(--line)] transition-all hover:border-[var(--signal)]/40 hover:-translate-y-0.5"
            >
              <p className="tf-mono text-[11px] text-[var(--cyan)] mb-3">
                {f.cmd}
              </p>
              <h3 className="font-semibold text-[var(--ink)] text-base mb-2">
                {f.title}
              </h3>
              <p className="text-[var(--slate)] text-sm leading-relaxed">
                {f.copy}
              </p>
            </div>
          ))}
        </motion.div>

      </motion.div>

      {/* ---- AUTH CARD ---- */}
      <div className="w-full flex justify-center px-4">
        {/* Truyền Ref xuống component con nhận forwardRef */}
        <LoginSignUp ref={formRef} />
      </div>
    </div>
  );
};

export default MainAuth;