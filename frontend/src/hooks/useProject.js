import { createProjectService } from "@/service/projectService.js";
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
  return { createProject }
}