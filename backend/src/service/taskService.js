import pool from "../../config/db.js";
import { createTask, deleteTask, findByTaskId, findByUserId } from "../models/taskModel.js";
import { checkMember } from "../models/workSpaceModel.js";
import { roleCheck } from "../models/projectModel.js";

export const createTaskService = async (data) => {
    const client = await pool.connect()
    try {
        const {workspace_id, project_id, title, description, status, priority, deadline, assigned_to} = data.body
        const created_by = data.user.user_id
        console.log(workspace_id, project_id, title, description, status)
        await client.query("BEGIN")
        const check = await checkMember(client,{workspace_id, user_id: created_by})
        
        if (check.length === 0) {
           throw new Error("You are not in this workspace")}
        
        const newTask = await createTask(client, {project_id, title, description, status, priority, deadline, created_by, assigned_to})
        await client.query("COMMIT")

        console.log({success: true, message: "created task", task: newTask})
        return {success: true, message: "created task", task: newTask}
    } catch (err) {
        await client.query("ROLLBACK")
        throw err
    } finally {
        client.release()
    }
}

export const deleteTaskService = async(data) => {
    const client = await pool.connect()
    try {
        await client.query("BEGIN")
        const task_id = data.params.id
        const user_id = data.user.user_id

        const task = await findByTaskId(client, task_id)
        console.log("task", task)

        const project_id = task.project_id

        const getRole = await roleCheck(client, {project_id, created_by:user_id})
        const role = getRole[0].role

        if(!["admin", "manager"].includes(role) && task.created_by != user_id){
                throw new Error("No permission")
        }
        const deleTask = await deleteTask(client, task_id)
        console.log("deleTask", deleTask)
        await client.query("COMMIT")
        return {success: true, message: "Deleted task", task: deleTask}
    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    }finally{
        client.release()
    }
}

export const getUserTasks = async(data) => {
    const client = await pool.connect()
    try {
        await client.query("BEGIN")
        const user_id = data.user.user_id

        const tasks = await findByUserId(client, user_id)

        console.log("Got tasks", tasks)

        await client.query("COMMIT")

        const count_tasks = tasks.length
        const count_done = tasks.filter(task => task.status === "done").length
        const count_todo = tasks.filter(task => task.status === "todo").length
        const count_inprogress = tasks.filter(task => task.status === "in_progress").length

        const count_unComplete = count_tasks - count_done

        return { success: true, message: "Got task", tasks: tasks, 
                count_tasks, count_done, count_todo, 
                count_inprogress, count_unComplete }

    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    }finally{
        client.release()
    }
}