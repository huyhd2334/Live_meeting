import { addProjectAttachmentsService } from "../service/attachmentsService.js"

export const addProjectAttachmentsController = async(req, res) => {
    try {
        const result = await addProjectAttachmentsService(req)
        console.log("Created success", result.attachment)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}