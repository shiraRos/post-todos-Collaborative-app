import React, { useState } from 'react';
import { FaTrash, FaRegEdit } from 'react-icons/fa';

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
    const [isEditing, setEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);

    const handleCheckbox = () => {
        updateTodo({ ...todo, completed: !todo.completed });
    };

    const handleUpdateButton = () => {
        setEditing(true);
    };

    const handleSaveButton = () => {
        updateTodo({ ...todo, title: updatedTitle });
        setEditing(false);
    };

    const handleCancelUpdate = () => {
        setUpdatedTitle(todo.title);
        setEditing(false);
    };

    return (
        <li className='todo-item'>
            <div className='containerTodo'>
                <span className='spanTodo'>
                    <input
                        type='checkbox'
                        className='checkboxTodo'
                        checked={todo.completed}
                        onChange={handleCheckbox}
                        disabled={!isEditing} 
                    />
                    <span className="todo-id">{todo.id + '.'}</span>
                    {!isEditing ? (
                        <>
                            <span>{todo.title}</span>
                            <button className="update-button" onClick={handleUpdateButton}>
                                <FaRegEdit />
                                update
                            </button>
                            <button className="delete-button" onClick={deleteTodo}><FaTrash />delete</button>
                        </>
                    ) : (
                        <>
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
            </div>
        </li>
    );
};

export default TodoItem;
