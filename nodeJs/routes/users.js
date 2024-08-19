import express from 'express'
import { getUsers, getUser, getUserByUsernameAndPassword, postUser, updateUser } from '../database/usersdb.js'

const route = express.Router();

// הוספת משתמש קיים
route.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await getUserByUsernameAndPassword(username, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//החזרת המשתמשים מבסיס הנתונים
route.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ messege: error.messege })
    }
});

//החזרת משתמש לפי מספר זהות
route.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUser(id);
        // Check if the post exists
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ messege: error.messege })
    }
});

//הכנסת משתמש חדש
route.post('/', async (req, res) => {
    try {
        const { name, userName, email, address, phone } = req.body;
        await postUser(name, userName, email, address, phone);
        res.json({ message: 'user added successfully' });
    }
    catch (error) {
        res.status(201).json({ messege: error.messege })
    }
});

//עדכון פרטי משתמש
route.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body)
        await updateUser(id, req.body);
        res.json({ message: 'user updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//עדכון פרטי משתמש
route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await deleteUser(id);
        res.json({ message: 'user delted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default route;