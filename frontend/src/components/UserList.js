import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    
    const fetchUsers = () => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    const deleteUser = (userId) => {
        axios.delete(`http://localhost:3000/users/${userId}`)
            .then(response => {
                console.log('User deleted:', response.data);
                // After deletion, fetch updated list of users
                fetchUsers();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <div className="container">
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.email}
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;