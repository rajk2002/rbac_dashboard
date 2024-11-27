// UserManagement.jsx
import React, { useState } from 'react';

export default function UserManagement({ users, roles, onAddUser, onUpdateUser, onDeleteUser }) {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [errors, setErrors] = useState({});

  const validateUser = () => {
    const newErrors = {};
    if (!newUser.name.trim()) newErrors.name = 'Name is required';
    if (!newUser.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newUser.email))
      newErrors.email = 'Invalid email format';
    if (!newUser.role) newErrors.role = 'Role is required';
    return newErrors;
  };

  const handleSubmitUser = () => {
    const validationErrors = validateUser();
    if (Object.keys(validationErrors).length === 0) {
      if (isEditMode) {
        onUpdateUser(editingUserId, newUser);
      } else {
        onAddUser(newUser);
      }
      resetForm();
    } else {
      setErrors(validationErrors);
    }
  };

  const resetForm = () => {
    setNewUser({ name: '', email: '', role: '' });
    setErrors({});
    setIsAddUserModalOpen(false);
    setIsEditMode(false);
    setEditingUserId(null);
  };

  const handleEditUser = (user) => {
    setNewUser(user);
    setEditingUserId(user.id);
    setIsEditMode(true);
    setIsAddUserModalOpen(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDeleteUser(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Management</h2>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          onClick={() => setIsAddUserModalOpen(true)}
        >
          Add User
        </button>
      </div>

      <div className="bg-gray-700 rounded">
        <table className="w-full">
          <thead className="border-b border-gray-600">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-600 last:border-b-0 hover:bg-gray-600">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <button
                    className="text-blue-500 hover:underline mr-10"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl mb-4">{isEditMode ? 'Edit User' : 'Add New User'}</h3>
            <input
              type="text"
              placeholder="Name"
              className={`w-full p-2 bg-gray-700 rounded mb-2 ${errors.name ? 'border border-red-500' : ''}`}
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input
              type="email"
              placeholder="Email"
              className={`w-full p-2 bg-gray-700 rounded mb-2 ${errors.email ? 'border border-red-500' : ''}`}
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <select
              className={`w-full p-2 bg-gray-700 rounded mb-2 ${errors.role ? 'border border-red-500' : ''}`}
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

            <button
              onClick={handleSubmitUser}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
            >
              {isEditMode ? 'Update User' : 'Create User'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
