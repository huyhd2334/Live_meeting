import pool from "../../config/db.js"
import { checkOwner, createConversation, getConverstions, getMessages, saveMessage } from "../models/chatModel.js"
import { checkMember } from "../models/workSpaceModel.js"
import api from "../lib/axios.js";

export const getMessagesService = async(data) => {
    const client = await pool.connect()
    try {
        const user = data.user.user_id 
        const conversation_id = Number(data.params.conversation_id)
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

export const saveMessagesService = async (data) => {
    const client = await pool.connect();

    let userMessage = null;
    let ragMessage = null;

    try {
        const user_id = data.user.user_id;
        const conversation_id = data.params.conversation_id;
        const workspace_id = data.params.workspace_id;

        const { query, documents } = data.body;

        // ================= USER MESSAGE =================
        await client.query("BEGIN");

        const check1 = await checkMember(client, { workspace_id, user_id });
        const check2 = await checkOwner(client, { user_id, conversation_id });

        if (check1.length === 0 || check2.length === 0) {
            throw new Error("You do not have permission");
        }

        userMessage = await saveMessage(client, {
            conversation_id,
            role: "user",
            content: query,
            token_count: query.length,
            sources: null
        });

        await client.query("COMMIT");


        // ================= RAG CALL (NO DB HERE) =================
        console.log("Retrieving query and await RAG response .........");

        let RAG_res;
        try {
            RAG_res = await api.post("/rag-chat", { query, documents });
        } catch (err) {
            console.error("RAG API ERROR:", err);

            return {
                success: true,
                userMessage,
                ragMessage: null,
                ragError: "RAG request failed"
            };
        }

        const response = RAG_res.data?.response;

        if (!RAG_res.data?.success || !response?.answer) {

            console.log("Invalid RAG response");
            console.log("Invalid RAG response - success: ", RAG_res.data?.success)
            console.log("Invalid RAG response - answer ", response?.answer)
            console.log("RAG_res", RAG_res)

            // optional save fail message
            const failClient = await pool.connect();
            try {
                await failClient.query("BEGIN");

                ragMessage = await saveMessage(failClient, {
                    conversation_id,
                    role: "assistant",
                    content: "RAG failed",
                    token_count: 0,
                    sources: []
                });

                await failClient.query("COMMIT");
            } catch (e) {
                await failClient.query("ROLLBACK");
            } finally {
                failClient.release();
            }

            return {
                success: true,
                userMessage,
                ragMessage,
                ragError: "Invalid RAG response"
            };
        }

        // ================= RAG SAVE =================
        const ragClient = await pool.connect();

        try {
            await ragClient.query("BEGIN");

            ragMessage = await saveMessage(ragClient, {
                conversation_id,
                role: "assistant",
                content: response.answer,
                token_count: response.answer.length,
                sources: response.sources || []
            });

            await ragClient.query("COMMIT");

        } catch (err) {
            await ragClient.query("ROLLBACK");
            throw err;
        } finally {
            ragClient.release();
        }

        // ================= RETURN =================
        return {
            success: true,
            userMessage,
            ragMessage
        };

    } catch (err) {
        console.error("SERVICE ERROR:", err);

        try {
            await client.query("ROLLBACK");
        } catch (_) {}

        throw err;

    } finally {
        client.release();
    }
};

export const createConversationService = async(data) => {
    const client = await pool.connect()
    try {
        
        const workspace_id = data.params.workspace_id
        const user_id = data.user.user_id
        const title = data.body.title
        
        console.log("title", title)
        await client.query("BEGIN")
        const check = await checkMember(client, {workspace_id, user_id})

        if(check.length === 0){
            throw new Error("You do not have permission")
        }

        const newConversation = await createConversation(client, {user_id, title})

        console.log({success: true, message: "Created conversation", newConversation: newConversation})
        
        await client.query("COMMIT")

        return {success: true, message: "Created conversation", newConversation: newConversation}
        
        } catch (err) {
            console.error("SERVICE ERROR:", err);
            await client.query("ROLLBACK");
            throw err;

        }finally {
            
        client.release()
    }
}