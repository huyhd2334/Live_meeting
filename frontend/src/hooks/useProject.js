import { createProjectService } from "@/service/projectService.js";
import { useState } from "react";
import { toast } from 'sonner'

export const useProject = () => {
  const [loading, setLoading] = useState(false)
  const createProject = async ({workspace_id, project_name, description, status}) => {
    try {
      setLoading(true)
      const data = await createProjectService({ workspace_id, project_name, description, status })
      console.log(data)
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error("Error when create project 'useProject frontend' ")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  return { createProject, loading }
}