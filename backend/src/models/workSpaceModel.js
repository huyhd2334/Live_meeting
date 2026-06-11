export const createWorkSpace = async(client, {workspace_name, owner_id, description}) => {
    const query = `INSERT INTO workspace (workspace_name, owner_id, description)
                    VALUES ($1, $2, $3)
                    RETURNING *`
    const values = [workspace_name, owner_id, description]
        
    console.log('Executing query:', query)
    console.log('With values:', values)
        
    const result = await client.query(query, values)
    console.log('Query result:', result.rows[0])    
    return result.rows[0]
}

export const deleteWorkSpace = async(client, {workspace_id, owner_id}) => {
    const result = await client.query(`DELETE FROM workspace 
                                     WHERE workspace_id = $1 AND owner_id = $2
                                     RETURNING *`, [workspace_id, owner_id])
    return result.rows[0]
}

export const findByWorkSpaceId = async(client, workspace_id) => {
    console.log("workspace_id", workspace_id)
    const result = await client.query(`SELECT * FROM workspace WHERE workspace_id=$1`, [workspace_id])
    return result.rows[0]
}


export const findByWorkSpaceName = async(client, workspace_name) => {
    const result = await client.query(`SELECT * FROM workspace WHERE workspace_name=$1 `, [workspace_name])
    return result.rows
}


export const addMemberWorkSpace = async (client, { workspace_id, user_id, role }) => {
    const query = `INSERT INTO workspacemembers (workspace_id, user_id, role)
                   VALUES ($1, $2, $3)
                   RETURNING *`

    const values = [workspace_id, user_id, role]
    const result = await client.query(query, values)
    return result.rows[0]
}

export const findWorkSpaceByUserId = async (client, user_id) => {
  const result = await client.query(
    `SELECT DISTINCT ON (m.workspace_id) 
        m.workspace_id,
        w.workspace_name,
        m.role
     FROM workspacemembers m
     JOIN workspace w 
        ON m.workspace_id = w.workspace_id
     WHERE m.user_id = $1`,
    [user_id]
  )
  return result.rows
}

export const getWorkSpaceProject = async(client, workspace_id) => {
    const result = await client.query(`SELECT * from projects where workspace_id = $1 `, [workspace_id])
    return result.rows
}

export const checkMember = async(client, {workspace_id, user_id}) => {
   const result = await client.query(`SELECT * FROM workspacemembers WHERE workspace_id = $1 AND user_id = $2`,[workspace_id, user_id])
   return result.rows
}

export const getFull = async (client, workspace_id) => {
    const result = await client.query(`
        SELECT 
            p.project_id,
            p.project_name,
            p.description AS project_description,
            p.status AS project_status,

            t.task_id,
            t.title AS task_title,
            t.description AS task_description,
            t.status AS task_status,
            t.priority,
            t.deadline,
            t.assigned_to,

            st.subtask_id,
            st.title AS subtask_title,
            st.status AS subtask_status,

            c.comment_id,
            c.content AS comment_content,
            c.user_id AS comment_user_id,
            c.created_at AS comment_created_at,

            a.attachment_id,
            a.file_name,
            a.file_url,
            a.uploaded_by

        FROM projects p
        LEFT JOIN tasks t 
            ON t.project_id = p.project_id
        LEFT JOIN subtasks st 
            ON st.task_id = t.task_id
        LEFT JOIN taskcomments c 
            ON c.task_id = t.task_id
        LEFT JOIN projectattachments a 
            ON a.project_id = p.project_id

        WHERE p.workspace_id = $1
        ORDER BY p.project_id, t.task_id
    `, [workspace_id])

    return result.rows
}