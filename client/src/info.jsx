import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ImProfile } from "react-icons/im";


const Info = () => {

    const [userInformation, setUserInformation] = useState(null);
    const { state } = useLocation();

    useEffect(() => { handleInformation(); }, []);

    //פונקציה שעורכת את כל המידע של המשתמש מהסטייט
    const handleInformation = () => {
        if (state && state.user) {
            const userInfoFromState = state.user;
            setUserInformation(userInfoFromState);
        }
    };

    return (
        <div>
            {userInformation &&
                <div className='showInfo'>
                    <h1>  <ImProfile /> {userInformation.username} information</h1>
                    <p>ID: {userInformation.id}</p>
                    <p>Name: {userInformation.name}</p>
                    <p>userName: {userInformation.userName}</p>
                    <p>Email: {userInformation.email}</p>
                    <p>Address:{userInformation.address}</p>
                    <p>Phone: {userInformation.phone}</p>

                </div>
            }
        </div >
    );
};

export default Info;
