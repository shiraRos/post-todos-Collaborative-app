import React, { useState } from 'react';
import { FaTrash, FaRegEdit } from 'react-icons/fa';
import { GrSelect } from "react-icons/gr";
import CommentWithPosts from '../Comments';
import AddComment from '../AddComment';
import axios from 'axios';

const PostItem = ({ post, deletePost, updatePost }) => {
    const [isEditing, setEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(post.title);
    const [isSelected, setSelected] = useState(false);
    //כל היוז סטייט שקשורים להערות
    const [comments, setComments] = useState([]);
    const [isComment, setIsComment] = useState(false);
    const [isAddingComment, setIsAddingComment] = useState(false);
    const userId = JSON.parse(localStorage.getItem("currentUser")).id;

    //עדכון פוסט
    const handleUpdateButton = () => {
        console.log("userId:", userId);
        console.log("post.userId", post.userId);
        if (userId == post.userId)
            setEditing(true);
        else {
            setEditing(false);
            alert("you cann't update this post!")
        }
    };

    //שמירת הפוסט המעודכן
    const handleSaveButton = () => {
        updatePost({ ...post, title: updatedTitle });
        setEditing(false);
    };

    //ביטול עדכון פוסט
    const handleCancelUpdate = () => {
        setUpdatedTitle(post.title);
        setEditing(false);
    };

    //אם הפוסט נבחר
    const handleSelect = () => {
        setSelected(!isSelected);
    };

    //מקבל את הערות אם הצגת הערות נבחרה
    const handleComment = () => {
        if (!isComment) {
            axios.get(`http://localhost:8080/comments/${post.id}`)
                .then((response) => {
                    console.log(response);
                    if (response.data.length > 0) {
                        setComments(response.data);
                        setIsComment(true);
                    }
                    else { alert('unexisting details'); }
                })
                .catch((error) => { console.error('Error fetching data:', error.message); })
        }
    };

    //עדכון הדגל של הוספת הערה
    const handleAddComment = () => {
        setIsAddingComment(true);
    }

    //מחיקת ההערה לפי מספר סידורי
    const deleteComment = (commentIdToDelete) => {
        axios.delete(`http://localhost:8080/comments/${commentIdToDelete}`)
            .then(() => {
                setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentIdToDelete));
                console.log(`Deleted comment with ID ${commentIdToDelete}`);
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            })
    };

    //עדכון גוף הערה 
    const updateComment = (commentToUpdate) => {
        axios.put(`http://localhost:8080/comments/${commentToUpdate.id}`, commentToUpdate).then(() => {
            setComments((prevcomment) => prevcomment.map((comment) => comment.id === commentToUpdate.id ? { ...commentToUpdate } : comment));
            console.log(`Updated post with ID ${commentToUpdate.id}`);
        }
        ).catch(error => {
            console.error('Error updating post:', error);
        });
    };

    //הוספת הערה למערך הערות שקיים והצגתו בזמן אמת
    const handleCommentAdded = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment.comment]);
        setIsAddingComment(false);
    };

    return (
        //מציג כל פריט בתור רשימה
        <li className={`todo-item ${isSelected ? 'completed' : ''}`}>
            <div className='containerTodo'>
                <span >
                    <span className={`${isSelected ? 'textBold' : ''}`}>{(post.id) + '.'}</span>
                    {!isEditing ? (
                        //הצגת פוסט באופן רגיל 
                        <span className={`${isSelected ? 'textBold' : ''}`}>{post.title}</span>
                    ) : (
                        //אם עורכת פוסט-שיציג בתור קלט
                        <input
                            type='text'
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                    )}
                </span>
                <div>
                    {!isEditing ? (
                        <>
                            {/* מצב ברירת מחדל-אין עריככת פוסט */}
                            <button className="actionsBtn" onClick={deletePost}><FaTrash />delete</button>
                            <button className="actionsBtn" onClick={handleUpdateButton}>< FaRegEdit />update</button>
                            <button onClick={handleSelect}><GrSelect />select</button>
                        </>
                    ) : (
                        <>
                            {/* ברגע שלחצתי על עריכת פוסט */}
                            <button onClick={handleSaveButton}>Save</button>
                            <button onClick={handleCancelUpdate}>Cancel</button>
                        </>
                    )}
                    {/*אם הפוסט נבחר מציג את גוף הפוסט*/}
                    {isSelected && (
                        <div>
                            <p className="note-text">{post.body}</p>
                            {/* ברגע שלוחצים על בחירת פוסט */}
                            <button onClick={handleComment}>Comments</button>
                        </div>
                    )}
                    {/* במקרה שהפוסט נבחר וגם ההערות */}
                    {isSelected && isComment && (
                        <ul>
                            <div className="col-md-9">
                                <button onClick={handleAddComment}>Add Comment</button>
                                {isAddingComment && (
                                    <>
                                        <AddComment onCommentAdded={handleCommentAdded} postId={post.id} />
                                    </>
                                )}
                                {comments.map((comment) => (
                                    <CommentWithPosts
                                        key={comment.id}
                                        comment={{ ...comment }}
                                        deleteComment={() => deleteComment(comment.id)}
                                        updateComment={updateComment}
                                    />
                                ))}
                            </div>
                        </ul>
                    )}
                </div>
            </div>
        </li>
    );
};

export default PostItem;