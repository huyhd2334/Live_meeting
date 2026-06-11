import pool from "../../config/db.js";
import { findByUserIdTx } from "../models/userModel.js";
import { createWorkSpace, addMemberWorkSpace, findWorkSpaceByUserId, deleteWorkSpace, findByWorkSpaceId, checkMember, getWorkSpaceProject, getFull} from "../models/workSpaceModel.js";

export const createWorkSpaceService = async (data) => {
    const client = await pool.connect()
    try {
        const {workspace_name, description} = data.body
        console.log(workspace_name)
        console.log(description)

        const owner_id = data.user.user_id
        console.log("user_id", owner_id)

        await client.query("BEGIN")
        
        console.log('Calling createWorkSpace...')
        const workspace = await createWorkSpace(client, {workspace_name, owner_id, description})
        console.log(workspace)
        
        console.log('Adding admin...')
        await addMemberWorkSpace(client, {workspace_id: workspace.workspace_id, user_id: owner_id, role: "admin"})
        await client.query("COMMIT")

        console.log("workspace", workspace)

        console.log({success: true, message: "created workspace", workSpace: workspace})
        return {success: true, message: "created workspace", workSpace: workspace}
    } catch (err) {
        await client.query("ROLLBACK")
        throw err
    } finally {
        client.release()
    }
}

export const addMemberWorkSpaceService = async (data) => {
    const client = await pool.connect()
    try {
        const user_id = data.user.user_id

        const workspace_id = data.body.workspace_id
        const member_id = data.body.member_id
        const role = data.body.role
        
        console.log("workspace_id", workspace_id)
        console.log("member_id", member_id)
        console.log("role", role)

        await client.query("BEGIN")

        const wordSpace = await findByWorkSpaceId(client, workspace_id)
        console.log("wordSpace: ", wordSpace)

        if (!wordSpace) {
            await client.query("ROLLBACK")
            return { success: false, message: "Workspace not found" }
        }

        const checkUser = await findByUserIdTx(client, member_id)
        console.log("user", checkUser)
        if (!checkUser) {
            await client.query("ROLLBACK")
            return { success: false, message: "User doesn't exist" }
        }

        if (wordSpace.owner_id !== user_id) {
            await client.query("ROLLBACK")
            return { success: false, message: "Not permitted" }
        }

        const existing = await checkMember(client, {workspace_id, user_id:member_id})
        console.log("existing", existing)
        if (existing.rowCount > 0) {
            await client.query("ROLLBACK")
            return { success: false, message: "Member already exists" }
        }

        const newMember = await addMemberWorkSpace(client, {
            workspace_id,
            user_id:member_id,
            role
        })

        console.log("new member: ", newMember)

        await client.query("COMMIT")

        return { success: true, message: "Added member", member: newMember }

    } catch (err) {
        await client.query("ROLLBACK")
        throw err
    } finally {
        client.release()
    }
}

export const getUserWorkSpaceService = async(data) => {
    const client = await pool.connect()
    try {
        console.log("GetUserWorkSpaceService...............")
        await client.query("BEGIN")
        const user_id = data.user.user_id
        console.log("user_id get:", user_id)
        const workSpaces = await findWorkSpaceByUserId(client, user_id)
        await client.query("COMMIT")
        return {success: true, message: "Got workspaces", workspaces: workSpaces}

    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    }finally{
        client.release()
    }
}

export const deleteUserWorkSpaceService = async(data) => {
    const client = await pool.connect()
    try {
        await client.query("BEGIN")
        
        const workspace_id = data.params.id
        console.log("workspace_id", workspace_id)

        const user_id = data.user.user_id
        console.log(user_id)
        console.log("loading workspace.....")
        const workSpace = await findByWorkSpaceId(client, workspace_id)
        console.log("loading workspace Done .....")
        
        let deleWorkSpace
        if(workSpace.owner_id === user_id){
            deleWorkSpace=await deleteWorkSpace(client, {workspace_id, owner_id:user_id})
        }

        await client.query("COMMIT")
        return {success: true, message: "Deleted workspaces", workspace: deleWorkSpace}

    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    }finally{
        client.release()
    }
}

export const getProjectService = async(data) => {
    const client = await pool.connect()
    try {
        await client.query("BEGIN")
        
        const workspace_id = data.params.id
        console.log("workspace_id", workspace_id)
        console.log("loading projects.....")
        const project = await getWorkSpaceProject(client, workspace_id)
        console.log("loading projects Done .....")
        await client.query("COMMIT")
        return {success: true, message: "Got projects", project: project}

    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    }finally{
        client.release()
    }
}

export const getFullService = async(data) => {
    const client = await pool.connect()
    try {
        const workspace_id = data.params.id
        const user_id = Number(data.user.user_id)
        console.log("workspace_id", workspace_id)
        console.log("user_id", user_id)

        await client.query("BEGIN")
        const check = await checkMember(client,{workspace_id, user_id})
        
        if (check.length === 0) {
            const err = new Error("You are not in this workspace")
            err.status = 403
            throw err
        }        
        const fullData = await getFull(client, workspace_id)
        console.log("fullData", fullData)
        await client.query("COMMIT")

        return {success: true, message: "got full workspace", data: fullData}
    } catch (err) {
        await client.query("ROLLBACK")
        throw err
    } finally {
        client.release()
    }
}