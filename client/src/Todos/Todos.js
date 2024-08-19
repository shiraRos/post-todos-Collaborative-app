import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import { MdAddTask } from "react-icons/md";

const Todos = ({ user }) => {
    console.log("user:", user);
    const [todos, setTodos] = useState([]);
    const [todoTitle, setTodoTitle] = useState('');

    //קבלת המשימות עם טעינת הדף
    useEffect(() => {
        axios.get(`http://localhost:8080/todos/${user.id}`)
            .then((response) => {
                if (response.data.length > 0) {
                    setTodos(response.data);
                }
                else { alert('unexisting details'); }
            })
            .catch((error) => { console.error('Error fetching data:', error.message); })
    }, []);

    //פונקציה לקבלת כותרת להוספת משימה
    const handleInputChange = (e) => {
        setTodoTitle(e.target.value);
    };

    //הוספת משימה
    const addTodo = () => {
        console.log("userId:", user.id);
        if (!user.id) {
            alert('User ID is not available');
            return;
        }
        if (!todoTitle) {
            alert('You must insert a title');
            return;
        }
        const newTodo = {
            userId: user.id,
            title: todoTitle,
            completed: false,
        };
        axios.post('http://localhost:8080/todos', newTodo)
            .then((response) => {
                console.log('Todo added successfully');
                setTodos((prevTodos) => [...prevTodos, response.data.todo]);
                setTodoTitle('');
            })
            .catch((error) => {
                console.error('Error adding todo:', error);
            });
    };

    //מחיקת משימה לפי מספר סידורי
    const deleteTodo = (todoIdToDelete) => {
        axios.delete(`http://localhost:8080/todos/${todoIdToDelete}`)
            .then(() => {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoIdToDelete));
                console.log(`Deleted todo with ID ${todoIdToDelete}`);
            })
            .catch(error => {
                console.error('Error deleting todo:', error);
            })
    };

    //עדכון כותרת משימה קיימת
    const updateTodo = (todoToUpdate) => {
        axios.put(`http://localhost:8080/todos/${todoToUpdate.id}`, todoToUpdate).then(() => {
            setTodos((prevTodos) => prevTodos.map((todo) => todo.id === todoToUpdate.id ? { ...todoToUpdate } : todo));
            console.log(`Updated todo with ID ${todoToUpdate.id}`);
        }
        ).catch(error => {
            console.error('Error updating todo:', error);
            alert('Error updating todo ');
        });
    };

    return (
        <div className="container mt-3">
            <label>Enter new todo:</label>
            <div className="addTodo">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter todo title"
                    value={todoTitle}
                    onChange={handleInputChange}
                    required
                />
                <button className='addBtn' onClick={addTodo}> <MdAddTask /></button>
            </div>
            <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        </div >
    );
};

export default Todos;