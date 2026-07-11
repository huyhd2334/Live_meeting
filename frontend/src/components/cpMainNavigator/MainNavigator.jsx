import React, { useState } from 'react';
import { Search, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const MainNavigator = ({ page }) => {
  const navigate = useNavigate();
  const [searchContent, setSearchContent] = useState("");
   
  const handleSearch = () => {
    toast.info(searchContent);
  };

  const handleBack = () => {
    navigate("/homepage");
  };

  return (
    <header className="w-full bg-white border-b border-slate-150 px-6 py-4 flex items-center justify-between sticky top-0 z-50 h-20">
      <div className="flex flex-row space-x-12 items-center">
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={handleBack}>
          <Zap className="w-8 h-8 text-indigo-500 fill-indigo-500" /> 
          <span className="font-bold tracking-wider text-slate-800 text-3xl">TECHFLOW</span>
        </div>
        
        {page !== "login" && (
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <Search className="w-4 h-4 text-slate-400" /> 
            <input 
              type="text" 
              placeholder="Search project..." 
              className="border-none outline-none focus:outline-none focus:ring-0 bg-transparent text-sm w-48"
              value={searchContent} 
              onChange={(e) => setSearchContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                   handleSearch();
                }
              }}
            />
          </div>
        )}
      </div>

      {/* BUTTON BACK */}
      <button
        disabled={false}
        className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors border border-slate-200 hover:border-indigo-200 rounded-full px-4 py-1.5 bg-slate-50 hover:bg-indigo-50/50" 
        onClick={handleBack}
      >
        Back to HomePage
      </button>
    </header>
  );
};

export default MainNavigator;