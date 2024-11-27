import React, { useState, useEffect } from 'react';

export default function RoleManagement({ roles, onAddRole, onUpdateRole, onDeleteRole }) {
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);

  const permissionsList = ['read', 'write', 'delete', 'manage_users', 'manage_roles'];

  const validateRole = () => {
    const newErrors = {};
    if (!newRole.name.trim()) newErrors.name = 'Role name is required';
    else if (roles.some((role) => role.name.toLowerCase() === newRole.name.toLowerCase()))
      newErrors.name = 'Role name must be unique';
    if (newRole.permissions.length === 0) newErrors.permissions = 'At least one permission is required';
    return newErrors;
  };

  const handleSubmitRole = () => {
    const validationErrors = validateRole();
    if (Object.keys(validationErrors).length === 0) {
      if (isEditMode) {
        onUpdateRole(editingRoleId, newRole);
      } else {
        onAddRole(newRole);
      }
      resetForm();
    } else {
      setErrors(validationErrors);
    }
  };

  const resetForm = () => {
    setNewRole({ role: '', permissions: '' });
    setErrors({});
    setIsAddRoleModalOpen(false);
    setIsEditMode(false);
    setEditingRoleId(null);
  };

  const handleEditRole = (role) => {
    setNewRole(role);
    setEditingRoleId(role.id);
    setIsEditMode(true);
    setIsAddRoleModalOpen(true);
  };

  const handleDeleteRole = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDeleteRole(id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setIsAddRoleModalOpen(false);
    if (e.key === 'Enter' && isAddRoleModalOpen) handleSubmitRole();
  };

  useEffect(() => {
    if (isAddRoleModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAddRoleModalOpen]);


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Role Management</h2>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          onClick={() => setIsAddRoleModalOpen(true)}
        >
          Add Role
        </button>
      </div>

      <div className="bg-gray-700 rounded">
        <table className="w-full">
          <thead className="border-b border-gray-600">
            <tr>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Permissions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-b border-gray-600 last:border-b-0 hover:bg-gray-600">
                <td className="p-3">{role.name}</td>
                <td className="p-3">{role.permissions.join(', ')}</td>
                <td className="p-3">
                  <button
                    className="text-blue-500 hover:underline mr-10"
                    onClick={() => handleEditRole(role)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddRoleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl mb-4">{isEditMode ? 'Edit Role' : 'Add New Role'}</h3>
            <input
              type="text"
              placeholder="Role Name"
              className={`w-full p-2 bg-gray-700 rounded mb-2 ${errors.name ? 'border border-red-500' : ''}`}
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <div className="mb-2">
              {permissionsList.map((permission) => (
                <label key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="bg-gray-700 rounded"
                    value={permission}
                    checked={newRole.permissions.includes(permission)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setNewRole((prev) => ({
                        ...prev,
                        permissions: checked
                          ? [...prev.permissions, permission]
                          : prev.permissions.filter((p) => p !== permission),
                      }));
                    }}
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
            {errors.permissions && <p className="text-red-500 text-sm">{errors.permissions}</p>}

            <button
              onClick={handleSubmitRole}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
            >
              {isEditMode ? 'Update Role' : 'Create Role'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
