import pool from "../../config/db.js";
import { createProject, deleteProject, findByProjectId, findByProjectName, getProjectAndTask, roleCheck } from "../models/projectModel.js";
import { checkMember } from "../models/workSpaceModel.js";

export const createProjectService = async (data) => {
    const client = await pool.connect()
    try {
        const {workspace_id, project_name, description, status} = data.body
        
        console.log("workspace_id, project_name, description, status")
        console.log(workspace_id)
        console.log(project_name)
        console.log(description)
        console.log(status)

        const user = data.user.user_id
        console.log("user_id", user)
        await client.query("BEGIN")
        console.log("checking member")
        const check = await checkMember(client,{workspace_id, user_id: user})
        console.log("check:", check.length)

        if (check.length === 0) {
           throw new Error("You are not in this workspace")}
        const newProject = await createProject(client, {workspace_id, project_name, description, created_by: user, status})
        await client.query("COMMIT")

        console.log({success: true, message: "created project", project: newProject})
        return {success: true, message: "created project", project: newProject}
    } catch (err) {
        await client.query("ROLLBACK")
        throw err
    } finally {
        client.release()
    }
}

export const deleteProjectService = async(data) => {
    const client = await pool.connect()
    try {
        await client.query("BEGIN")
        const project_id = data.params.id
        const created_by = data.user.user_id

        const project = await findByProjectId(client, project_id)
        
        const getRole = await roleCheck(client, {project_id, created_by})
        const role = getRole[0].role

        if(!["admin", "manager"].includes(role) && project.created_by != created_by){
                throw new Error("No permission")
        }
        const deleProject = await deleteProject(client, project_id)
        await client.query("COMMIT")
        return {success: true, message: "Deleted project", project: deleProject}
    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    }finally{
        client.release()
    }
}

export const findByProjectIdService = async(data) => {
    const client = await pool.connect()
    try {
        const project_id = data.params.id
        const project = await findByProjectId(client, project_id)
        return {success: true, message: "Found Project successfully", project: project}

    } catch (error) {
        throw error
    }finally{
        client.release()
    }
}

export const findByProjectNameService = async(data) => {
    const client = await pool.connect()
    try {
        const project_name = data.body.project_name
        const project = await findByProjectName(client, project_name)
        return {success: true, message: "Found Projects successfully", project: project}

    } catch (error) {
        throw error
    }finally{
        client.release()
    }
}

export const getProjectAndTaskService = async(data) => {
    const client = await pool.connect()
    try {
        const project_id = data.params.id
        const user = data.user.user_id
        
        await client.query("BEGIN")
       
        console.log("project id", project_id)
        const project = await findByProjectId(client, project_id)
        
        console.log("project", project)

        const workspace_id = project.workspace_id
    
        console.log("check member", user)
        const check = await checkMember(client,{workspace_id, user})

        if(check.length === 0){
           throw new Error("You are not in this workspace")
        }

        console.log("fetching...")
        const result = await getProjectAndTask(client, project_id)
        console.log("fetch done !")
        console.log("result", result)
        
        await client.query("COMMIT")
        return {success: true, message: "fetch done", project_task: result}
    } catch (error) {
        throw error
    }finally{
        client.release()
    }
}