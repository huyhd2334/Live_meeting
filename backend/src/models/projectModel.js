
export const createProject = async(client, {workspace_id, project_name, description, created_by, status}) => {
    const query = `INSERT INTO projects (workspace_id,project_name, description, created_by, status)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *`
    const value = [workspace_id, project_name, description, created_by, status]
    const result = await client.query(query, value)
    return result.rows[0]
}

export const deleteProject = async(client, project_id) => {
    const result = await client.query(`DELETE FROM projects 
                                     WHERE project_id = $1 
                                     RETURNING *`, [project_id])
    return result.rows[0]
}

export const findByProjectId = async(client, project_id) => {
    const result = await client.query(`SELECT * FROM projects WHERE project_id=$1`, [project_id])
    return result.rows[0]
}


export const findByProjectName = async(client, project_name) => {
    const result = await client.query(`SELECT * FROM projects WHERE project_name=$1 `, [project_name])
    return result.rows
}

export const roleCheck = async(client, {project_id, created_by}) => {
    const result = await client.query(`
                                      SELECT role FROM workspacemembers m
                                      JOIN projects p ON m.workspace_id = p.workspace_id
                                      WHERE p.project_id = $1 AND m.user_id = $2`, [project_id, created_by]);
    
    console.log(result.rows)
    return result.rows
}

export const getProjectAndTask = async (client, project_id) => {
    const result = await client.query(
        `
        SELECT 
            p.project_id,
            p.project_name,
            t.task_id,
            t.title AS task_title,
            t.description AS task_description,
            t.assigned_to AS assigned_to
        FROM projects p
        LEFT JOIN tasks t
            ON p.project_id = t.project_id
        WHERE p.project_id = $1
        `,
        [project_id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    const project = {
        project_id: result.rows[0].project_id,
        project_name: result.rows[0].project_name,
        tasks: []
    };

    result.rows.forEach(row => {
        if (row.task_id) {
            project.tasks.push({
                task_id: row.task_id,
                title: row.task_title,
                description: row.task_description,
                assigned_to: row.assigned_to
            });
        }
    });

    return project;
};

export const getProject = async(client, user_id) => {
    const result = await client.query(`SELECT
                                    p.project_id,
                                    p.project_name,
                                    p.updated_at,
                                    p.status,
                                    p.created_at
                                FROM workspacemembers wm
                                JOIN projects p
                                    ON wm.workspace_id = p.workspace_id
                                WHERE wm.user_id = $1`, [user_id])
    return result.rows
}