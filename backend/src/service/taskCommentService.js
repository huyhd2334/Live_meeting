import pool from "../../config/db.js";
import { checkMember } from "../models/workSpaceModel.js";
import { createTaskComment, deleteTaskComment, findCommentById } from "../models/taskCommentModel.js";

export const createTaskCommentService = async (data) => {
    const client = await pool.connect()
    try {
        const {workspace_id, task_id, content} = data.body
        const created_by = data.user.user_id

        await client.query("BEGIN")
        const check = await checkMember(client,{workspace_id, user_id:created_by})
        
        if (check.length === 0) {
           throw new Error("You are not in this workspace")}
        
        const comment = await createTaskComment(client, {task_id, user_id:created_by, content})
        await client.query("COMMIT")

        console.log({success: true, message: "created comment", comment: comment})
        return {success: true, message: "created comment", comment: comment}
    } catch (err) {
        await client.query("ROLLBACK")
        throw err
    } finally {
        client.release()
    }
}

export const deleteTaskCommentService = async(data) => {
    const client = await pool.connect()
    try {
        await client.query("BEGIN")
        const comment_id = data.params.id
        const user_id = data.user.user_id

        const comment = await findCommentById(client, comment_id)
        
        let deleTaskComment
        if (comment.user_id === user_id){
            deleTaskComment = await deleteTaskComment(client, comment_id)
        }else{return {success: false, message: "This comment is not your's"}}
        console.log("deleTaskComment", deleTaskComment)
        await client.query("COMMIT")
        return {success: true, message: "Deleted TaskComment", taskComment: deleTaskComment}
    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    }finally{
        client.release()
    }
}
