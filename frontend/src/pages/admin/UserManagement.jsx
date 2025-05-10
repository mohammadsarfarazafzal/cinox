import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/'); // Adjust the endpoint as per your backend
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  
  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">User Management</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users by name, username, or email..."
          className="w-full max-w-md p-2 border border-gray-300 rounded dark:text-white"
        />
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Full Name</th>
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id} className="border-b">
                  <td className="p-2 dark:text-white">{user.id}</td>
                  <td className="p-2 dark:text-white">{user.fullName}</td>
                  <td className="p-2 dark:text-white">{user.username}</td>
                  <td className="p-2 dark:text-white">{user.email}</td>
                  <td className="p-2 dark:text-white">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-2 text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;