import { addProjectAttachments } from "../models/attachmentsModel.js"
import pool from "../../config/db.js";
import { checkMember } from "../models/workSpaceModel.js";
import { uploadFileToMinio } from "./minioService.js"

export const addProjectAttachmentsService = async(data) => {
    const client = await pool.connect()
    try {
        const file = data.file
        const user = data.user.user_id 
        const project_id = data.body.project_id
        const workspace_id = data.body.workspace_id
        
        console.log("ACCESS:", process.env.ACCESSKEYMINIO);
        console.log("SECRET:", process.env.SECRETKEYMINIO);

        console.log("file: ", file)

        const objectName = Date.now() + "-" + file.originalname
        await uploadFileToMinio("documents-rag", objectName, file.buffer)
        console.log("MINIO UPLOADED:", objectName)

        await client.query("BEGIN")

        const check = await checkMember(client,{workspace_id, user_id: user})
        if (check.length === 0) {
           throw new Error("You are not in this workspace")}

        const newAttachment = await addProjectAttachments( client, {project_id, file_name: file.originalname, file_url: objectName, uploaded_by: user})        
        
        console.log("newAttachment: ", newAttachment)
        
        await client.query("COMMIT")

        console.log({success: true, message: "add project attachment", attachment: newAttachment})
        return {success: true, message: "add project attachment", attachment: newAttachment}
        } catch (err) {
            console.error("SERVICE ERROR:", err);

            await client.query("ROLLBACK");
            throw err;
        }finally {
        client.release()
    }
}