
import React, { useState } from 'react';

const CommentWithPosts = ({ comment, deleteComment, updateComment }) => {

    const [isUpdateComment, setIsUpdateComment] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(comment.body);
    const activeUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;

    const handleUpdateButton = () => {
        setIsUpdateComment(true);
    };

    //שמירת ההערה המעודכנת
    const handleSaveButton = () => {
        updateComment({ ...comment, body: updatedTitle });
        setIsUpdateComment(false);
    };

    //ביטול עדכון הערה
    const handleCancelUpdate = () => {
        setUpdatedTitle(comment.body);
        setIsUpdateComment(false);
    };

    return (
        <>
            <li className='todo-item'>
                <div className='comment-container'>
                    <span >
                        {!isUpdateComment ? (
                            <p className='p-comment'>{comment.body}</p>
                        ) : (
                            <>
                                {/*  אם עורכת הערה -שיציג בתור קלט ויוסיף כפתורים של ביטול ושמירה */}
                                <input
                                    type='text'
                                    value={updatedTitle}
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                />
                                <button onClick={handleSaveButton}>Save</button>
                                <button onClick={handleCancelUpdate}>Cancel</button>
                            </>
                        )}
                    </span>
                    <div>
                        {activeUserEmail == comment.email && (
                            <>
                                {/*  מצב ברירת מחדל-אין עריכת הערה */}
                                <button className="btncomment" onClick={deleteComment}>Delete</button>
                                <button className="btncomment" onClick={handleUpdateButton}>Update</button>
                            </>
                        )}
                    </div>
                </div>
            </li>
        </>
    );
};

export default CommentWithPosts;

