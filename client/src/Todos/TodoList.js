import React, { useState } from 'react';
import TodoItem from './TodosItem';

const TodoList = (props) => {
    const [filter, setFilter] = useState('sequential');
    const [searchTodo, setSearchTodo] = useState({ id: '', title: '' });
    const [order, setOrder] = useState('sequential');

    //אפשרויות סדר לפי
    const orderOptions = [
        { value: 'sequential', label: 'Sequential' },
        { value: 'completed', label: 'Completed' },
        { value: 'uncompleted', label: 'Uncompleted' },
        { value: 'alphabetical', label: 'Alphabetical' },
        { value: 'random', label: 'Random' },
    ];

    //פונקציה לניהול חיפוש ערך
    const handleSearchChange = (e) => {
        setSearchTodo({
            ...searchTodo,
            [e.target.name]: e.target.value,
        });
    };

    //מיון משימות לפי סדר מסוים
    const sortTodos = (todos, order) => {
        switch (order) {
            case 'sequential':
                return todos;
            case 'completed':
                return todos.sort((a, b) => (a.completed ? -1 : 1));
            case 'uncompleted':
                return todos.sort((a, b) => (a.completed ? 1 : -1));
            case 'alphabetical':
                return todos.sort((a, b) => a.title.localeCompare(b.title));
            case 'random':
                return todos.sort(() => Math.random() - 0.5);
            default:
                return todos;
        }
    };

    //סינון משימות לפי סינון קיים
    const filterTodos = (todos) => {
        switch (filter) {
            case 'sequential':
                return todos;
            case 'completed':
                return todos.filter((todo) => todo.completed);
            case 'uncompleted':
                return todos.filter((todo) => !todo.completed);
            default:
                return todos;
        }
    };

    const searchTodos = (todos) => {
        return todos.filter((todo) => {
            return (
                todo.id.toString().includes(searchTodo.id) &&
                todo.title.toLowerCase().includes(searchTodo.title.toLowerCase())
            );
        });
    };

    //משימות מסוננות שעטופות בחיפוש
    const filteredTodos = searchTodos(filterTodos(props.todos));
    //משימות ממוינות שמכילות מסימות מסוננות לפי סדר
    const orderedTodos = sortTodos(filteredTodos, order);
    return (
        <div>
            <div className="container mt-3">
                <div className="col-md-3">
                    <label >
                        Filter by:
                        <select
                            className="form-select"
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="sequential">Sequential</option>
                            <option value="completed">Completed</option>
                            <option value="uncompleted">Uncompleted</option>
                        </select>
                    </label>
                    <label htmlFor="orderSelect">
                        Order by:
                        <select
                            className="form-select"
                            onChange={(e) => setOrder(e.target.value)}
                            value={order}
                            id="orderSelect"
                        >
                            {orderOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className="mb-3">
                        <label htmlFor="searchId">Search by id:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by id"
                            value={searchTodo.id}
                            onChange={handleSearchChange}
                            name="id"
                            id="searchId"
                        />
                    </div>
                    <label className="mb-2" htmlFor="searchTitle">Search by title:</label>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTodo.title}
                            onChange={handleSearchChange}
                            name="title"
                            id="searchTitle"
                        />
                    </div>
                </div>
                <ul className="todo-list">
                    <div className="col-md-9">
                        {orderedTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={{ ...todo }}
                                deleteTodo={() => props.deleteTodo(todo.id)}
                                updateTodo={props.updateTodo}
                            />
                        ))}
                    </div>
                </ul>
            </div>
        </div >
    );
};

export default TodoList;