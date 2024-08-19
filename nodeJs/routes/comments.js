import express from 'express'
import { getComments, getComment, postComment, deleteComment,updateComment, getCommentByPostId } from '../database/commentsdb.js'

const route = express.Router();
//החזרת הערות מבסיס הנתונים
route.get('/', async (req, res) => {
    try {
        const comments = await getComments();
        res.json(comments);
    }
    catch (error) {
        res.status(500).json({ messege: error.messege })
    }
});

//החזרת הערה לפי מספר זהות
route.get('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const comment = await getCommentByPostId(postId);
        // Check if the post exists
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }
        res.json(comment);
    }
    catch (error) {
        res.status(500).json({ messege: error.messege })
    }
});

//הכנסת משימה 
route.post('/', async (req, res) => {
    try {
        const { postId, name, email, body } = req.body;
        const comment = await postComment(postId, name, email, body);
        res.json({ comment, message: 'comment added successfully' });
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
        await updateComment(id, req.body);
        res.json({ message: 'comment updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// מחיקת הערה לפי מספר זיהוי
route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await deleteComment(id);
        res.json({ comment, message: 'comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default route;