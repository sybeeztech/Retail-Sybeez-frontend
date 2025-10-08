import React from 'react';

const DeleteConfirmation = ({ employee, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Employee</h3>
        <p className="text-gray-500 mb-6">
          Are you sure you want to delete {employee.firstName} {employee.lastName}? This action cannot be undone.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(employee.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;