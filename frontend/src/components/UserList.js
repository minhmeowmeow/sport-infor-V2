import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                console.log(response.data); // Log the data received
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div className="container">
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;