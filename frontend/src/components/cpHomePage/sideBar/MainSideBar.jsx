import styles from '../homePage.module.css'
import { CircleUser, LayoutDashboard, LogOut, Settings, Users } from 'lucide-react'
import { useUIContext } from '@/context/UIContext.jsx'
import { useAuthContext } from '@/context/AuthContext'

const MainSideBar = ({ userAccount = { user_name: "User", user_account: "N/A" } }) => {
  const { setOption, option } = useUIContext()
  const { logoutContex } = useAuthContext()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "workspace", label: "Workspace", icon: Users },
    { id: "setting", label: "Setting", icon: Settings },
  ]

  return (
    <div className={styles.SideBar}>
      <div className="w-full flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = option === item.id
          return (
            <div
              key={item.id}
              className={`${styles.sideBarOption} ${isActive ? styles.activate : ""}`}
              onClick={() => setOption(item.id)}
            >
              <Icon size={20} className={isActive ? "text-[var(--signal)]" : "text-slate-500"} />
              <span>{item.label}</span>
            </div>
          )
        })}
      </div>

      <div className={styles.profileContainer}>
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <CircleUser size={38} className="text-slate-400 flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-800 truncate">
              {userAccount.user_name}
            </span>
            <span className="text-xs text-slate-500 truncate">
              @{userAccount.user_account}
            </span>
          </div>
        </div>
        
        <button 
          type="button"
          className={styles.buttonLogOut} 
          onClick={() => logoutContex()}
          title="Log out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  )
}

export default MainSideBar