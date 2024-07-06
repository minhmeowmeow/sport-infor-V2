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
        if (window.confirm('Are you sure you want to delete this user?')) {
        axios.delete(`http://localhost:3000/users/delete?id=${userId}`)
            .then(response => {
                console.log('User deleted:', response.data);
                // After deletion, fetch updated list of users
                fetchUsers();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
        }
    };

    return (
        <div className="container">
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <a href={`/users/detail?id=${user.id}`}>{user.username} - {user.email}</a>
                        <a href={`/users/update?id=${user.id}`}><button>Update</button></a>
                        <button type='button'onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;