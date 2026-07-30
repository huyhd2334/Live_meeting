import pool from "../../config/db.js"

export const findSessionByRefreshToken = async ({refresh_token}) => {
    const result = await pool.query(`SELECT * FROM sessions WHERE refresh_token = $1`, [refresh_token]) 
    return result.rows[0]
}    

export const addSession = async ({ user_id, refresh_token, expiresAt }) => {
    const result = await pool.query(
        `INSERT INTO sessions (user_id, refresh_token, expires_at)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [user_id, refresh_token, expiresAt]
    );

    return result.rows[0];
};

export const deleteSessionByToken = async ({refresh_token}) => {
    const result = await pool.query(
        `DELETE From sessions WHERE refresh_token = $1
         RETURNING *`,
        [refresh_token]
    );

    return result.rows[0];
};