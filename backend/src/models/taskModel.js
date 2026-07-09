export const createTask = async(client, {project_id, title, description, status, priority, deadline, created_by, assigned_to}) => {
    const query = `INSERT INTO tasks (project_id, title, description, status, priority, deadline, created_by, assigned_to)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    RETURNING *`
    const value = [project_id, title, description, status, priority, deadline, created_by, assigned_to]
    const result = await client.query(query, value)
    return result.rows[0]
}

export const deleteTask = async(client, task_id) => {
    const result = await client.query(`DELETE FROM tasks 
                                     WHERE task_id = $1 
                                     RETURNING *`, [task_id])
    return result.rows[0]
}

export const findByProjectId = async(client, project_id) => {
    const result = await client.query(`SELECT * FROM tasks WHERE project_id=$1`, [project_id])
    return result.rows
}

export const findByUserId = async(client, user_id) => {
    const result = await client.query(`SELECT * FROM tasks WHERE assigned_to=$1 ORDER BY updated_at DESC`, [user_id])
    return result.rows
}

export const findByTaskId = async(client, task_id) => {
    const result = await client.query(`SELECT * FROM tasks WHERE task_id=$1`, [task_id])
    return result.rows[0]
}


