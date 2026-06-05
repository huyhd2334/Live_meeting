import { checkMember } from "../models/workSpaceModel.js"
import pool from "../../config/db.js"
import api from "../lib/axios.js"

export const nlpSuggestTaskService = async (req) => {
    const client = await pool.connect()
    try {
        const user_id = req.user.user_id
        const { workSpace_id, description } = req.body
        await client.query("BEGIN")
        const check = await checkMember(client, { workSpace_id, user_id })

        if (check === 0) {
            throw new Error("You are not in this workspace")
        }

        // call NLP server
        const res = await api.post("/generate-task", { description },
            {
                headers: {
                    Authorization: req.headers.authorization,
                    "x-user-id": user_id,
                    "x-user-name": req.user.name,
                    "Content-Type": "application/json"
                }
            }
        )

        await client.query("COMMIT")

        return { success: res.data.success, tasks: res.data.tasks || [] }

    } catch (error) {
        await client.query("ROLLBACK")
        console.log(error)
        throw new Error(error.message)
    } finally {
        client.release()
    }
}