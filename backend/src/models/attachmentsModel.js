export const addProjectAttachments = async(client, {project_id, file_name, file_url, uploaded_by}) => {
    const query = `INSERT INTO projectattachments (project_id, file_name, file_url, uploaded_by)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *`
    const value = [project_id, file_name, file_url, uploaded_by]
    console.log("BEFORE INSERT");
    const result = await client.query(query, value);
    console.log("AFTER INSERT", result.rows[0]);    
    return result.rows[0]
}