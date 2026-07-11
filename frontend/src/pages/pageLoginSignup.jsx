import React from "react";
import MainAuth from "@/components/cpAuth/mainAuth.jsx";

export default function PageLoginSignup() {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col overflow-y-auto">
      <div className="w-full flex flex-col items-center px-4 py-6 md:py-12">
        <div className="w-full max-w-6xl flex flex-col items-center mx-auto">
          <MainAuth />
        </div>
      </div>

      <footer className="w-full py-8 text-center text-xs text-slate-400">
        <p>© 2026 Tech Flow. All rights reserved.</p>
      </footer>
    </div>
  );
}