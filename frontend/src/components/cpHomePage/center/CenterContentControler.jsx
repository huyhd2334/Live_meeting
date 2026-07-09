import React from 'react'
import styles from '../homePage.module.css'
import DashBoard from '../sideBar/DashBoard';
import WorkSpace from '../sideBar/workSpace/WorkSpace.jsx';
import Setting from '../sideBar/Setting';
import { useUIContext } from '@/context/UIContext.jsx';

const CenterContentControler = ({ userAccount }) => {
  const { option } = useUIContext()

  const renderContent = () => {
    switch (option) {
      case "workspace":
        return <WorkSpace userAccount={userAccount}/>;
      case "task":
        return <div className="p-6 text-slate-500">Loading task...</div>;
      case "setting":
        return <Setting />;
      default:
        return <DashBoard userAccount={userAccount} />;
    }
  };

  return (
    <div className={styles.MainContent}>
      {renderContent()}
    </div>
  );
};

export default CenterContentControler;