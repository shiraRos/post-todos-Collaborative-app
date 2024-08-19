import pool from './database.js'

//פונקציה המחזירה את כל הערות
export async function getComments() {
    const [comments] = await pool.query('select * from comments');
    return comments;
}

//פונקציה המחזירה מספר זהות של משתמש
export async function getCommentByPostId(postId) {
    const [comment] = await pool.query(`select * from comments where postId=?`, [postId]);
    return comment;
}

//פונקציה המחזירה הערה לפי מספר זהות
export async function getComment(id) {
    const [[comment]] = await pool.query(`select * from comments where id=?`, [id]);
    return comment;
}

//פונקציה המוסיפה הערה חדשה
export async function postComment(postId, name, email, body) {
    const [{ insertId }] = await pool.query(`insert into comments( postId, name ,email , body) VALUES (?,?,?,?)`, [postId, name, email, body]);
    return await getComment(insertId);
}


// פונקציה למחיקת משימה לפי מספר זיהוי
export async function deleteComment(id) {
    await pool.query(`DELETE FROM comments WHERE id = ?`, [id]);
}

//פונקציה לעדכון פרטי הערה
export const updateComment = async (commentID, commentData) => {
    const { postId, name, email, body } = commentData;
    const query = 'UPDATE comments SET postId = ?, name = ?, email = ?,body = ? WHERE id = ?';
    await pool.query(query, [postId, name, email, body, commentID]);
};

