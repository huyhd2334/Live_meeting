
export const getMessages = async(client,{conversation_id}) => {
   console.log("conversation_id =", conversation_id)
   console.log("type =", typeof conversation_id)
   const result = await client.query(`select * from messages where conversation_id = $1 ORDER BY created_at`, [conversation_id])
   return result.rows
}

export const getConverstions = async(client, {user_id}) => {
    const result = await client.query(`select * from conversations WHERE user_id = $1 ORDER BY created_at DESC`, [user_id])
    return result.rows
}

export const saveMessage = async (client,{conversation_id, role, content, token_count, sources}) => {
    const result = await client.query(
        `INSERT INTO messages (conversation_id, role, content, token_count, sources)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *
        `,[conversation_id, role, content, token_count, sources]
    )

    return result.rows[0]
}

export const createConversation = async(client, {user_id, title}) => {
    const result = await client.query(`INSERT INTO conversations (user_id, title) VALUES ($1,$2) RETURNING *`, [user_id, title])
    return result.rows[0]
}

export const checkOwner = async(client,{user_id, conversation_id}) => {
    const result = await client.query(`SELECT * FROM conversations WHERE user_id=$1 AND conversation_id=$2`, [user_id, conversation_id])
    return result.rows
}