import { createProjectService, deleteProjectService } from "@/service/projectService.js";
import { useState } from "react";
import { toast } from 'sonner'
import { useMutation } from "@tanstack/react-query";

export const useProject = () => {
  const createProject = useMutation({
    mutationFn: createProjectService,
    onSuccess: (data) => {
      console.log("project", data)
      toast.success("Created project")
    },
    onError: (error) => {
      console.error(error)
      toast.error("Error when created project")
    }
  }) 

  const deleteProject = async(project_id) => {
      try{
        const data = await deleteProjectService(project_id)
 
        if(data.success){
          console.log("Deleted project", data.project)
          toast.success("Deleted project")
          return data.project
        }else{
          toast.error("Delete project error")
          return []
        }
      } catch (error) {
        toast.error("error when delete project")
        console.error(error)
  }}
  return { createProject, deleteProject }
}