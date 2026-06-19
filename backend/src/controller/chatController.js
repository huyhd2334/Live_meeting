import { createConversationService, getConversationsService, getMessagesService, saveMessagesService } from "../service/chatService.js"

export const getMessagesController = async(req, res) => {
    try {
        const result = await getMessagesService(req)
        console.log("Get message success")
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getConversationsController = async(req, res) => {
    try {
        const result = await getConversationsService(req)
        console.log("Get conversations success")
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const saveMessagesController = async(req, res) => {
    try {
        const result = await saveMessagesService(req)
        console.log("Saved message success")
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const createConversationController = async(req, res) => {
    try {
        const result = await createConversationService(req)
        console.log("Created conversation successfully")
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}