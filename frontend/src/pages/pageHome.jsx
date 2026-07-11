import MainHomePage from '@/components/cpHomePage/center/MainCenter.jsx'
import HeaderHomePage from '@/components/cpMainNavigator/MainNavigator.jsx'
import React from 'react'

const PageHome = () => {
  const [userAccount, setUserAccount] = React.useState({ name: "guest" });

  React.useEffect(() => {
    const str = localStorage.getItem("userAccount") || JSON.stringify({ name: "guest" });
    setUserAccount(JSON.parse(str));
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen m-0 p-0">
      
      <HeaderHomePage/>
      
      <div className="flex-1 h-0 w-full min-h-0">
        <MainHomePage userAccount={userAccount}/>
      </div>

    </div>
  )
}

export default PageHome