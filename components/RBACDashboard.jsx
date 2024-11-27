import React, { useState } from 'react';
import { Users, Shield, Settings } from 'lucide-react';

// Import child components
import UserManagement from './UserManagement';
import RoleManagement from './RoleManagement';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
];

const initialRoles = [
  { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'] },
  { id: 2, name: 'User', permissions: ['read'] },
];

export default function RBACDashboard() {
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [selectedTab, setSelectedTab] = useState('users');

  const handleAddUser = (newUser) => {
    setUsers([...users, { id: users.length + 1, ...newUser, status: 'Active' }]);
  };

  // Edit User
  const handleUpdateUser = (id, updatedUser) => {
    setUsers(users.map((user) => (user.id === id ? { ...updatedUser, id } : user)));
  };

  // Delete User
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };


  // Edit Role
  const handleUpdateRole = (id, updatedRole) => {
    setRoles(roles.map((role) => (role.id === id ? { ...updatedRole, id } : role)));
  };

  // Delete Role
  const handleDeleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };


  const handleAddRole = (newRole) => {
    setRoles([...roles, { id: roles.length + 1, ...newRole }]);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="container mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Shield className="mr-2 text-orange-500" />
            RBAC Dashboard
          </h1>
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 border border-gray-700 rounded hover:bg-gray-800">
              <Settings className="mr-2" /> Settings
            </button>
          </div>
        </header>

        <div className="bg-gray-800 rounded-lg">
          <div className="flex border-b border-gray-700">
            <button
              className={`flex-1 py-3 ${selectedTab === 'users' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
              onClick={() => setSelectedTab('users')}
            >
              <div className="flex items-center justify-center">
                <Users className="mr-2" /> Users
              </div>
            </button>
            <button
              className={`flex-1 py-3 ${selectedTab === 'roles' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
              onClick={() => setSelectedTab('roles')}
            >
              <div className="flex items-center justify-center">
                <Shield className="mr-2" /> Roles
              </div>
            </button>
          </div>

          {selectedTab === 'users' && (
            <UserManagement
              users={users}
              roles={roles}
              onAddUser={handleAddUser}
              onUpdateUser={handleUpdateUser}
              onDeleteUser={handleDeleteUser}
            />
          )}

          {selectedTab === 'roles' && (
            <RoleManagement
              roles={roles}
              onAddRole={handleAddRole}
              onUpdateRole={handleUpdateRole}
              onDeleteRole={handleDeleteRole}
            />
          )}
        </div>
      </div>
    </div>
  );
}
