import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [formUserData, setFormUserData] = useState({
        username: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({});


    const handleSubmitLogin = (e) => {
        e.preventDefault();
        const errors = validate(formUserData);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            axios.post('http://localhost:8080/users/login', formUserData)
                .then((response) => {
                    if (response.data.id) {
                        localStorage.setItem('currentUser', JSON.stringify(response.data))
                        alert('Login successful');
                        navigate(`/home/${response.data.userName}`, { state: { user: response.data } });
                    } else {
                        // Clear form fields when user doesn't exist
                        setFormUserData({
                            username: '',
                            password: ''
                        });
                        alert('User doesn\'t exist');
                    }
                })
                .catch(error => {
                    // Clear form fields when login fails
                    setFormUserData({
                        username: '',
                        password: ''
                    });
                    alert('Invalid username or password');
                    console.error('Error in handleSubmit:', error);
                });
        }
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4 || values.password.length > 30) {
            errors.password = "Password must be between 4 and 30 characters";
        }
        return errors;
    };

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmitLogin}>
                    <h1>Login</h1>
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Username" value={formUserData.username} onChange={handleChange} />
                        <p>{formErrors.username}</p>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" value={formUserData.password} onChange={handleChange} />
                        <p>{formErrors.password}</p>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                        <br></br>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;



