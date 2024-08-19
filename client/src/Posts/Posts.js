import React, { useState, useEffect } from 'react'
import axios from 'axios';
import PostsList from './PostsList';
import { AiFillFileAdd } from "react-icons/ai";

const Posts = ({ user }) => {
  //קבלת כל הפוסטים עם טעינת הדף
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(10);
  const [isFinished, setIsFinish] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get(`http://localhost:8080/posts?start=${start}&finish=${finish}`)
      .then((response) => {
        if (response.data.length > 0) {
          setPosts([...posts, ...response.data]);
          setStart(finish);
          console.log("start", start);
          setFinish(finish + 10);
          console.log("finish", finish);
        } else {
          setIsFinish(true);
          alert('No more posts available.');
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  //פונקציה לקבלת כותרת להוספת פוסט
  const handleInputChange = (e) => {
    setPostTitle(e.target.value);
  };

  //הוספת פוסט
  const addPost = () => {
    console.log("userId:", user.id);
    if (!user.id) {
      alert('User ID is not available');
      return;
    }
    if (!postTitle) {
      alert('you must insert title');
      return;
    }
    const newPost = {
      userId: user.id,
      title: postTitle,
    };
    axios.post('http://localhost:8080/posts', newPost)
      .then((response) => {
        console.log('Post added successfully');
        setPosts((prevPosts) => [...prevPosts, response.data.post]);
        setPostTitle('');
      })
      .catch((error) => {
        console.error('Error adding post:', error);
      })
  };

  //מחיקת משימה לפי מספר משימה
  const deletePost = (postIdToDelete) => {
    console.log("postId", postIdToDelete);
    const postToDelete = posts.find(post => post.id === postIdToDelete);
    if (!postToDelete) {
      console.error('Post not found');
      alert('post not found');
      return;
    }
    if (user.id !== postToDelete.userId) {
      alert("you can not delete this post because you are not own it")
      console.error('You are not authorized to delete this post');
      return;
    }
    axios.delete(`http://localhost:8080/posts/${postIdToDelete}`)
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postIdToDelete));
        console.log(`Deleted post with ID ${postIdToDelete}`);
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      })
  }

  //עדכון כותרת משימה קיימת
  const updatePost = (postToUpdate) => {
    axios.put(`http://localhost:8080/posts/${postToUpdate.id}`, postToUpdate).then(() => {
      setPosts((prevPosts) => prevPosts.map((post) => post.id === postToUpdate.id ? { ...postToUpdate } : post));
      console.log(`Updated post with ID ${postToUpdate.id}`);
    }
    ).catch(error => {
      console.error('Error updating post:', error);
      alert('Error updating todo ');
    });
  };

  return (
    <div className="container mt-3">
      <label>Enter new Post:</label>
      <div className="addPost">
        <input
          type="text"
          className="form-control"
          placeholder="Enter post title"
          value={postTitle}
          onChange={handleInputChange}
        />
        <button className='addBtn' onClick={addPost}> <AiFillFileAdd /></button>
      </div>
      <PostsList posts={posts} deletePost={deletePost} updatePost={updatePost} />
      {!isFinished && <button onClick={fetchPosts}>Load More Posts</button>}
    </div >
  );
}

export default Posts