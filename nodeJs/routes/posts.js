// export default route;
import express from 'express'
import { getPosts, getPost, deletePost, postPost, updatePost, getPostByUserId } from '../database/postsdb.js'

const route = express.Router();

//החזרת הפוסטים מבסיס הנתונים
route.get('/', async (req, res) => {
    try {
        const { start, finish } = req.query;
        const posts = await getPosts(parseInt(start), parseInt(finish));
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//החזרת פוסט לפי מספר זהות
route.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await getPostByUserId(userId);
        // בדיקה אם קיים פוסא
        if (!posts) {
            return res.status(404).json({ message: 'Todo not found.' });
        }
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ messege: error.messege })
    }
});

//הוספת פוסט  
route.post('/', async (req, res) => {
    try {
        const { userId, title, body } = req.body;
        const post = await postPost(userId, title, body);
        res.json({ post, message: "post added successfully" });
    }
    catch (error) {
        res.status(201).json({ messege: error.messege })
    }
});

//עדכון פרטי פוסט
route.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body)
        const post = await updatePost(id, req.body);
        res.json({ post, message: "post updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// מחיקת פוסט
route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await deletePost(id);
        res.json({ post, message: 'Post and related comments deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default route;