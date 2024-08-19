import React, { useState, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import Info from './info';
import Todos from './Todos/Todos';
import Posts from './Posts/Posts';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(storedUser);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home/:userid" element={<Home />} >
          <Route path="info" element={<Info />} />
          <Route path="todos" element={<Todos user={user} />} />
          <Route path="posts" element={<Posts user={user} />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;




