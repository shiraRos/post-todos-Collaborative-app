import express from 'express'
import { getTodos, getTodo, postTodo, updateTodo, deleteTodo, getTodoByUserId } from '../database/todosdb.js'

const route = express.Router();
//החזרת המשימות מבסיס הנתונים
route.get('/', async (req, res) => {
    try {
        const todos = await getTodos();
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ messege: error.messege })
       
      }
});

//החזרת משימה לפי מספר זהות
route.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const todos = await getTodoByUserId(userId);
        // Check if the post exists
        if (!todos) {
            return res.status(404).json({ message: 'Todo not found.' });
        }
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ messege: error.messege })
    }
});

//הכנסת משימה 
route.post('/', async (req, res) => {
    try {
        const { userId, title, completed } = req.body;
        const todo = await postTodo(userId, title, completed);
        res.json({ todo, message: 'todo added successfully' });
    }
    catch (error) {
        res.status(201).json({ messege: error.messege })
    }
});

//עדכון פרטי משימה
route.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body)
        const todo = await updateTodo(id, req.body);
        res.json({ todo, message: 'todo updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// מחיקת משימה לפי מספר זיהוי
route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await deleteTodo(id);
        res.json({ todo, message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default route;