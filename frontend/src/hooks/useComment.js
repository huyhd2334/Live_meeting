import { useMutation } from "@tanstack/react-query";
import { createCommentService } from "@/service/commentService.js";
import { toast } from "sonner";

export const useComment = () => {
    const createComment = useMutation({
        mutationFn: createCommentService,
        onSuccess: (data) => {
            toast.success("Created comment")
            console.log("Created comment", data.comment)
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Error when create comment"
            )
            console.log(error)
        }
    })

    return {createComment}
}