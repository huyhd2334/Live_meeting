import styles from '../homePage.module.css'
import { CircleUser, ClipboardList, LayoutDashboard, LogOut, Settings, Users, Video } from 'lucide-react'
import { toast } from 'sonner'
import { useUIContext } from '@/context/UIContext.jsx'
import { useAuthContext } from '@/context/AuthContext'

const MainSideBar = ({userAccount}) => {
  const {setOption, option} = useUIContext()
  const {logoutContex} = useAuthContext()

  return (
    <div className={`${styles.SideBar}`}>
      <div
        className={`${styles.sideBarOption} ${option === "dashboard" ? styles.activate : ""}`}
        onClick={() => setOption("dashboard")}
      >
        <LayoutDashboard size={30}/> <span> Dash Board</span>
      </div>

      <div
        className={`${styles.sideBarOption} ${option === "workspace" ? styles.activate : ""}`}
        onClick={() => setOption("workspace")}
      >
        <Users size={30}/> <span>WorkSpace</span>
      </div>

      <div
        className={`${styles.sideBarOption} ${option === "setting" ? styles.activate : ""}`}
        onClick={() => setOption("setting")}
      >
        <Settings size={30}/> <span>Setting</span>
      </div>

    <div className={`${styles.profileContainer} ${option === "user" ? "" : ""}` }>
       <div>
          <CircleUser size={36} />
       </div>
       <div className='flex flex-col'>
            <a className='text-lg font-semibold'>{userAccount.user_name}</a>
            <a className='text-sm'>Account: {userAccount.user_account}</a>
       </div>
       <div className={styles.buttonLogOut} onClick={()=>logoutContex()}>
          <LogOut />
       </div>
    </div>
    </div>
  )
}

export default MainSideBar