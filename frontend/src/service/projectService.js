import api from "@/lib/axios"

export const createProjectService = async({workspace_id, project_name, description, status}) => {
   if(project_name === "" | status === ""){
      return {success: false, message: "project name or status is empty"}
   }
   const result =  await api.post("project/create", {workspace_id, project_name, description, status}, { withCredentials: true })
   console.log(result.data)
   return result.data
}


export const deleteProjectService = async(project_id) => {
    const id = project_id
    const result = await api.delete(`project/delete/${id}`, { withCredentials: true})
    return result.data
}
