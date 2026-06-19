import { createSubTaskService, getSubTaskService } from "@/service/subTaskService.js"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export const useSubTask = () => {

  // FETCH
  // const fetchSubTask = useQuery({
  //   queryKey: [ "subtasks", workspace_id, project_id],
  //   queryFn: () => getSubTaskService({workspace_id, project_id}),
  //   enabled: !!workspace_id && !!project_id
  // })

  // CREATE
  const createSubTask = useMutation({
    mutationFn: createSubTaskService,
    onSuccess: (data) => {
      toast.success(data.message)
      console.log(data)
      return data.subTask
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Error when create subtask"
      )
      console.log(error)
    }
  })
  return {createSubTask}
}