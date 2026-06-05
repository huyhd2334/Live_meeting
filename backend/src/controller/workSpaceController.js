import { addMemberWorkSpaceService, createWorkSpaceService, deleteUserWorkSpaceService, getFullService, getProjectService, getUserWorkSpaceService } from "../service/workSpaceService.js"

export const createWorkSpaceControler = async(req, res) => {
    try {
        const result = await createWorkSpaceService(req)
        console.log("Created success", result.workSpace)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteWorkSpaceControler = async(req, res) => {
    try {
        const result = await deleteUserWorkSpaceService(req)
        console.log("Deleted success", result.workspace)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const addWorkSpaceMemberControler = async(req, res) => {
    try {
        const result = await addMemberWorkSpaceService(req)
        console.log(result.message)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getUserWorkSpaceControler = async(req, res) => {
    try {
        const result = await getUserWorkSpaceService(req)
        console.log("workspaces:", result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

export const getWorkSpaceProjectControler = async(req, res) => {
    try {
        const result = await getProjectService(req)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

export const getFullControler = async(req, res) => {
    try {
        const result = await getFullService(req)
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}