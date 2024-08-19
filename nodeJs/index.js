import express from "express"
import users from './routes/users.js'
import posts from './routes/posts.js'
import todos from './routes/todos.js'
import comments from './routes/comments.js'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

app.use('/users', users);
app.use('/todos', todos);
app.use('/posts', posts);
app.use('/comments', comments);

app.listen(PORT, () => {
    console.log(`listen on PORT ${PORT}`);
});
