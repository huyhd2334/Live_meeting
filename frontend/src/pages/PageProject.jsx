import MainNavigator from '@/components/cpMainNavigator/MainNavigator.jsx'
import MainProject from '@/components/cpProjectPage/projectUI/MainProject.jsx'
import { useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'

const PageProject = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const location = useLocation()
  const workspace_name = location.state?.workspace_name || "Unknown Workspace"
  const workspaceId = Number(id)

  useEffect(() => {
    console.log("workspace_name pape project", workspace_name)
    if (!workspaceId) {
      navigate("/homepage")
    }
  }, [workspaceId, navigate])

  return (
    <div>
      <MainNavigator />
      <div>
        <MainProject
          id={workspaceId}
          workspace_name={workspace_name}
        />
      </div>
    </div>
  )
}

export default PageProject