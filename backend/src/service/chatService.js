import pool from "../../config/db.js"
import { getConverstions, getMessages, saveMessage } from "../models/chatModel.js"
import { checkMember } from "../models/workSpaceModel.js"

export const getMessagesService = async(data) => {
    const client = await pool.connect()
    try {
        const user = data.user.user_id 
        const conversation_id = data.params.conversation_id
        const workspace_id = data.params.workspace_id

        await client.query("BEGIN")

        const check = await checkMember(client,{workspace_id, user_id: user})
    
        if (check.length === 0) {
           throw new Error("You are not in this workspace")}

        const messages = await getMessages( client, {conversation_id})        
                
        console.log({success: true, message: "got message", messages: messages})
        
        await client.query("COMMIT")

        return {success: true, message: "got message", messages: messages}

        } catch (err) {
            console.error("SERVICE ERROR:", err);
            await client.query("ROLLBACK");
            throw err;
        }finally {
        client.release()
    }
}

export const getConversationsService = async(data) => {
    const client = await pool.connect()
    try {
        const user_id = data.user.user_id 
        const workspace_id = data.params.workspace_id

        await client.query("BEGIN")

        const check = await checkMember(client,{workspace_id, user_id})
    
        if (check.length === 0) {
           throw new Error("You are not in this workspace")}

        const conversations = await getConverstions( client, {user_id})        
                
        console.log({success: true, message: "got conversations", conversations: conversations})
        
        await client.query("COMMIT")

        return {success: true, message: "got conversations", conversations: conversations}

        } catch (err) {
            console.error("SERVICE ERROR:", err);
            await client.query("ROLLBACK");
            throw err;
        }finally {
        client.release()
    }
}

export const saveMessagesService = async(data) => {
    const client = await pool.connect()
    try {
        const {workspace_id, role, content, token_count, model_name, prompt, retrieval_latency_ms, top_k, retrieved_chunks} = data.body
        
        const user_id = data.user.user_id

        await client.query("BEGIN")

        const check = await checkMember(client,{workspace_id, user_id})
    
        if (check.length === 0) {
           throw new Error("You are not in this workspace")}

        const message = await saveMessage( client, {role, content, token_count: content.length() , model_name, prompt, retrieval_latency_ms, top_k, retrieved_chunks})        
                
        console.log({success: true, message: "Saved message", messages: message})
        
        await client.query("COMMIT")

        return {success: true, message: "Saved message", messages: message}

        } catch (err) {
            console.error("SERVICE ERROR:", err);
            await client.query("ROLLBACK");
            throw err;
        }finally {
        client.release()
    }
}