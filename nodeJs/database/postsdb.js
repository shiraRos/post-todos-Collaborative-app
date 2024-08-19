import pool from './database.js'

export async function getPosts(start = 0, finish = 10) {
    const query = `SELECT * FROM posts LIMIT ${start}, ${finish - start}`;
    const [posts] = await pool.query(query);
    return posts;
}

//פונקציה המחזירה מספר זהות של משתמש
export async function getPostByUserId(userId) {
    const [post] = await pool.query(`select * from posts where userId=?`, [userId]);
    return post;
}

//פונקציה המחזירה פןסט לפי מספר זהות
export async function getPost(id) {
    const [[post]] = await pool.query(`select * from posts where id=?`, [id]);
    return post;
}

//פונקציה המוסיפה פוסט חדש
export async function postPost(userId, title, body) {
    const [{ insertId }] = await pool.query(`insert into posts(userId, title, body) VALUES (?,?,?)`, [userId, title, body]);
    return await getPost(insertId);
}

//פונקציה לעדכון פרטי משתמש
export const updatePost = async (postID, postData) => {
    const { userId, title, body } = postData;
    const query = 'UPDATE posts SET userId = ?, title = ?, body = ? WHERE id = ?';
    await pool.query(query, [userId, title, body, postID]);
};

// Function to delete comments related to a post
export async function deleteCommentsByPostId(postId) {
    await pool.query('DELETE FROM comments WHERE postId = ?', [postId]);
}

// Function to delete a post by its ID
export async function deletePost(postId) {
    await deleteCommentsByPostId(postId);
    await pool.query('DELETE FROM posts WHERE id = ?', [postId]);
}