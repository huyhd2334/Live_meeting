import styles from '../homePage.module.css'
import CenterContentControler from './CenterContentControler.jsx'
import SideBar from '../sideBar/MainSideBar.jsx'
import { useUIContext } from '@/context/UIContext.jsx'

const MainCenter = ({userAccount}) => {
  const {setOption, option} = useUIContext()
  return (
    <div className={`${styles.layOut} ${option === "dashboard" ? "" : styles.expandMain}`}>
        <SideBar userAccount = {userAccount}/>
        <CenterContentControler userAccount = {userAccount}/>
    </div>
  )
}

export default MainCenter
