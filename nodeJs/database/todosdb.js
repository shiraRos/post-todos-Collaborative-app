import pool from './database.js'

//פונקציה המחזירה את כל המשימות
export async function getTodos() {
    const [todos] = await pool.query('select * from todos');
    return todos;
}

//פונקציה המחזירה מספר זהות של משתמש
export async function getTodoByUserId(userId) {
    const [todo] = await pool.query(`select * from todos where userId=?`, [userId]);
    return todo;
}

// פונקציה המחזירה משימה לפי מספר זהות של משימה
export async function getTodo(id) {
    const [[todo]] = await pool.query(`select * from todos where id=?`, [id]);
    return todo;
}

//פונקציה המוסיפה משימה חדשה
export async function postTodo(userId, title, completed) {
    const [ {insertId} ] = await pool.query(`insert into todos( userId, title, completed) VALUES (?,?,?)`, [userId, title, completed]);
    return await getTodo(insertId);
}

//פונקציה לעדכון פרטי משימה
export const updateTodo = async (todoID, todoData) => {
    const { userId, title, completed } = todoData;
    const query = 'UPDATE todos SET userId = ?, title = ?, completed = ? WHERE id = ?';
    await pool.query(query, [userId, title, completed, todoID]);
};

// פונקציה למחיקת משימה לפי מספר זיהוי
export async function deleteTodo(id) {
    await pool.query(`DELETE FROM todos WHERE id = ?`, [id]);
}