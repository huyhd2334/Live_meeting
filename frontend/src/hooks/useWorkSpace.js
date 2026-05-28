import {addMemberService, createUserWorkSpaceService, deleteWorkSpaceService, findProjectByWorkspaceService, getAllService, getWorkSpaceByUserId } from "@/service/workSpaceService.js"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

export const useWorkSpace = (workspace_id) => {
    const[loadingW, setLoadingW] = useState(false)
    const getUserWorkSpace = async() =>{
      try {
        setLoadingW(true)
        const data = await getWorkSpaceByUserId()

        if(data.success){
          console.log("Got workspaces", data.workspaces)
          toast.success("Got workspaces")
          return data.workspaces
        }else{
          toast.error("get workspaces error")
          return []
        }
      } catch (error) {
        toast.error("error when get user workspaces")
        console.error(error)
      } finally {
        setLoadingW(false)
      }
    }
    
    const createUserWorkSpace = async({workspace_name, description}) => {
      try {
        setLoadingW(true)
        const data = await createUserWorkSpaceService({workspace_name, description})
        console.log(data)
        if(data.success){
          toast.success("Created WorkSpace")
          return data.success
        }else{
          toast.error("Created WorkSpace Error")
          return data.success   
        }
      } catch (error) {
        toast.error("error when create workSpace")
        console.error(error)
      } finally {
        setLoadingW(false)
      }
    }

    const deleteWorkSpace = async(workspace_id) => {
      try {
          setLoadingW(true)
          const data = await deleteWorkSpaceService(workspace_id)
          if(data.success){
            toast.success("Delete Done !")
          }
          else{toast.error("Delete Fail")}
      } catch (error) {
        toast.error("error when delete workSpace")
        console.error(error)
      } finally {
        setLoadingW(false)
      }
    }

    const addMemberWorkSpace = async({workspace_id, member_id, role}) => {
      try {
          setLoadingW(true)
          const data = await addMemberService({workspace_id, member_id, role})
          if(data.success){
            toast.success("Add Done !" + data.message)
          }
          else{toast.error("Add Fail" + data.message)}
      } catch (error) {
        toast.error("error when add member workSpace")
        console.error(error)
      } finally {
        setLoadingW(false)
      }
    }
    const getWorkSpaceProject = async(workspace_id) => {
      try {
          setLoadingW(true)
          const data = await findProjectByWorkspaceService(workspace_id)
          if(data.success){
            toast.success(data.message)
            return data.project
          }
          else{
            toast.error(data.message) 
            return []
          }
      } catch (error) {
        toast.error("error when get workSpace project")
        console.error(error)
      } finally {
        setLoadingW(false)
      }}
    
    
  // FETCH
    const getWorkspaceFull = useQuery({
      queryKey: [ "fullws", workspace_id],
      queryFn: () => getAllService(workspace_id),
      enabled: !!workspace_id
    })
    return {getUserWorkSpace, createUserWorkSpace, deleteWorkSpace, addMemberWorkSpace, getWorkSpaceProject, getWorkspaceFull, loadingW}
}
