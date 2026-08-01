import { addProjectAttachments } from "../models/attachmentsModel.js";
import pool from "../../config/db.js";
import { checkMember } from "../models/workSpaceModel.js";
import { uploadFileToSupabase } from "./supabaseService.js";
import api from "../lib/axios.js";

export const addProjectAttachmentsService = async (data) => {
    const client = await pool.connect();
    const formData = new FormData();

    try {
        const file = data.file;
        const user = data.user.user_id;
        const project_id = data.body.project_id;
        const workspace_id = data.body.workspace_id;

        console.log("File:", file);

        const objectName = `${Date.now()}-${file.originalname}`;

        const fileUrl = await uploadFileToSupabase(
            "documents",
            objectName,
            file.buffer,
            file.mimetype
        );

        console.log("SUPABASE UPLOADED:", fileUrl);

        await client.query("BEGIN");

        const check = await checkMember(client, {
            workspace_id,
            user_id: user,
        });

        if (check.length === 0) {
            throw new Error("You are not in this workspace");
        }

        const newAttachment = await addProjectAttachments(client, {
            project_id,
            file_name: file.originalname,
            file_url: fileUrl,
            uploaded_by: user,
        });

        console.log({
            success: true,
            message: "add project attachment",
            attachment: newAttachment,
        });
        
        // send to NLP server
        formData.append(
            "file",
            new Blob([data.file.buffer]),
            data.file.originalname
        );

        formData.append("file_id", newAttachment.attachment_id);

        await api.post("/upload", formData, {headers: formData.headers?.()});

        await client.query("COMMIT");

        return {
            success: true,
            message: "add project attachment",
            attachment: newAttachment,
        };
    } catch (err) {
        await client.query("ROLLBACK");
        console.error(err);
        throw err;
    } finally {
        client.release();
    }
};