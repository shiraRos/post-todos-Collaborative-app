import React, { useState } from 'react';
import axios from 'axios';

const AddComment = ({ onCommentAdded, postId }) => {
  const [commentBody, setCommentBody] = useState('');

  const userEmail = JSON.parse(localStorage.getItem("currentUser")).email;
  const userName = JSON.parse(localStorage.getItem("currentUser")).name;

  const onSubmitAddComment = (event) => {
    event.preventDefault();
    if (!commentBody) {
      alert('You must have a valid email and fill in the body field.');
      return;
    }
    const newComment = {
      postId: postId,
      name:userName,
      email: userEmail,
      body: commentBody,
    };

    axios.post('http://localhost:8080/comments', newComment)
      .then((response) => {
        console.log('Comment added successfully');
        onCommentAdded(response.data);
        setCommentBody('');
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
        console.log('Detailed error response:', error.response);
      });
  };

  return (
    <form onSubmit={onSubmitAddComment} className='formAddAlbum'>
      <h2>Add Comment</h2>
      <label>your comment..
        <input required value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
      </label>
      <button type='submit'>Add Comment</button>
    </form>
  );
};

export default AddComment;