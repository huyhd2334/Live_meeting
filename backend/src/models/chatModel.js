
export const getMessages = async(client,{conversation_id}) => {
   const result = await client.query(`select * from messages where conversation_id = $1 ORDER BY created_at`, [conversation_id])
   return result.rows
}

export const getConverstions = async(client, {user_id}) => {
    const result = await client.query(`select * from conversations WHERE user_id = $1`, [user_id])
    return result.rows
}

export const saveMessage = async (client,{conversation_id, role, content, token_count, model_name, prompt, retrieval_latency_ms, top_k, retrieved_chunks}) => {
    const result = await client.query(
        `INSERT INTO messages (conversation_id,role,content,token_count, model_name, prompt, retrieval_latency_ms, top_k, retrieved_chunks)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING *
        `,[conversation_id, role, content, token_count, model_name, prompt, retrieval_latency_ms, top_k, retrieved_chunks]
    )

    return result.rows[0]
}

