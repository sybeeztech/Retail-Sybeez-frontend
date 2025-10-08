// LeavePolicy.jsx
import React, { useState, useEffect } from 'react';
import { useLeaveStore } from '../../store/leaveStore';
import { useAuthStore } from '../../store/authStore';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Copy,
  Building,
  Users,
  Calendar,
  Shield,
  AlertCircle,
  CheckCircle,
  FileText,
  Lock
} from 'lucide-react';

const LeavePolicy = () => {
  const { user } = useAuthStore();
  const { 
    leavePolicies, 
    getLeavePolicies, 
    loading, 
    error,
    createLeavePolicy,
    updateLeavePolicy,
    deleteLeavePolicy
  } = useLeaveStore();

  const [editingPolicy, setEditingPolicy] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    departmentId: null,
    leaveTypes: [],
    probationPeriod: 90,
    effectiveDate: new Date().toISOString().split('T')[0],
    carryForwardRules: {
      maxDays: 7,
      validity: 3, // months
      utilizationPeriod: 6 // months
    },
    accrualRules: {
      frequency: 'monthly',
      rate: 1, // days per month
      startingAfter: 30 // days
    }
  });
  const [newLeaveType, setNewLeaveType] = useState({
    type: '',
    name: '',
    entitlement: 0,
    carryForward: 0,
    accrual: 'monthly',
    gender: 'all',
    requiresDocumentation: false,
    maxConsecutiveDays: 0,
    noticePeriod: 0,
    eligibility: {
      probationCompleted: true,
      minServiceDays: 0
    }
  });

  // RBAC Check - Only admin/super_admin can access
  const canManagePolicies = user?.employee?.role && ['super_admin', 'admin'].includes(user.employee.role);

  useEffect(() => {
    if (canManagePolicies) {
      getLeavePolicies();
    }
  }, [canManagePolicies]);

  // Reset form when creating new policy
  useEffect(() => {
    if (isCreating) {
      setFormData({
        name: '',
        departmentId: null,
        leaveTypes: [],
        probationPeriod: 90,
        effectiveDate: new Date().toISOString().split('T')[0],
        carryForwardRules: {
          maxDays: 7,
          validity: 3,
          utilizationPeriod: 6
        },
        accrualRules: {
          frequency: 'monthly',
          rate: 1,
          startingAfter: 30
        }
      });
    }
  }, [isCreating]);

  const handleAddLeaveType = () => {
    if (!newLeaveType.type || !newLeaveType.name || newLeaveType.entitlement <= 0) {
      alert('Please fill in all required fields for leave type');
      return;
    }

    setFormData(prev => ({
      ...prev,
      leaveTypes: [...prev.leaveTypes, { ...newLeaveType }]
    }));

    setNewLeaveType({
      type: '',
      name: '',
      entitlement: 0,
      carryForward: 0,
      accrual: 'monthly',
      gender: 'all',
      requiresDocumentation: false,
      maxConsecutiveDays: 0,
      noticePeriod: 0,
      eligibility: {
        probationCompleted: true,
        minServiceDays: 0
      }
    });
  };

  const handleRemoveLeaveType = (index) => {
    setFormData(prev => ({
      ...prev,
      leaveTypes: prev.leaveTypes.filter((_, i) => i !== index)
    }));
  };

  const handleSavePolicy = async () => {
    if (!formData.name || formData.leaveTypes.length === 0) {
      alert('Policy name and at least one leave type are required');
      return;
    }

    try {
      if (editingPolicy) {
        await updateLeavePolicy(editingPolicy.id, formData);
      } else {
        await createLeavePolicy(formData);
      }
      
      setEditingPolicy(null);
      setIsCreating(false);
      await getLeavePolicies();
    } catch (error) {
      console.error('Failed to save policy:', error);
    }
  };

  const handleDeletePolicy = async (policyId) => {
    if (window.confirm('Are you sure you want to delete this policy? This action cannot be undone.')) {
      try {
        await deleteLeavePolicy(policyId);
        await getLeavePolicies();
      } catch (error) {
        console.error('Failed to delete policy:', error);
      }
    }
  };

  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy);
    setFormData(policy);
    setIsCreating(false);
  };

  const handleCancelEdit = () => {
    setEditingPolicy(null);
    setIsCreating(false);
  };

  const duplicatePolicy = (policy) => {
    setFormData({
      ...policy,
      name: `${policy.name} - Copy`,
      id: undefined
    });
    setIsCreating(true);
    setEditingPolicy(null);
  };

  // Access Denied for non-admin users
  if (!canManagePolicies) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <Lock className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h2>
          <p className="text-red-600">
            You don't have permission to manage leave policies. This feature requires administrator privileges.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Leave Policy Management</h1>
            <p className="text-gray-600">Configure and manage leave policies for your organization</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Policy
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <h4 className="text-sm font-medium text-red-800">Error</h4>
          </div>
          <p className="mt-1 text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Statistics */}
      {leavePolicies.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{leavePolicies.length}</div>
            <div className="text-sm text-gray-600">Total Policies</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {leavePolicies.reduce((total, policy) => total + (policy.leaveTypes?.length || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Leave Types</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">
              {leavePolicies.filter(p => !p.departmentId).length}
            </div>
            <div className="text-sm text-gray-600">Global Policies</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-orange-600">
              {leavePolicies.filter(p => p.departmentId).length}
            </div>
            <div className="text-sm text-gray-600">Department Policies</div>
          </div>
        </div>
      )}

      {/* Policy Form */}
      {(isCreating || editingPolicy) && (
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">
              {editingPolicy ? 'Edit Policy' : 'Create New Policy'}
            </h2>
            <button
              onClick={handleCancelEdit}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Basic Policy Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Policy Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Standard Leave Policy"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Effective Date *
              </label>
              <input
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => setFormData(prev => ({ ...prev, effectiveDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Probation Period (days) *
              </label>
              <input
                type="number"
                value={formData.probationPeriod}
                onChange={(e) => setFormData(prev => ({ ...prev, probationPeriod: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department (Optional)
              </label>
              <select
                value={formData.departmentId || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, departmentId: e.target.value || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
              </select>
            </div>
          </div>

          {/* Leave Types Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Leave Types
            </h3>

            {/* Add Leave Type Form */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium mb-3">Add New Leave Type</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Code *</label>
                  <input
                    type="text"
                    value={newLeaveType.type}
                    onChange={(e) => setNewLeaveType(prev => ({ ...prev, type: e.target.value.toUpperCase() }))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., CL"
                    maxLength="5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={newLeaveType.name}
                    onChange={(e) => setNewLeaveType(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., Casual Leave"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Entitlement *</label>
                  <input
                    type="number"
                    value={newLeaveType.entitlement}
                    onChange={(e) => setNewLeaveType(prev => ({ ...prev, entitlement: parseInt(e.target.value) }))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Carry Forward</label>
                  <input
                    type="number"
                    value={newLeaveType.carryForward}
                    onChange={(e) => setNewLeaveType(prev => ({ ...prev, carryForward: parseInt(e.target.value) }))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    min="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Accrual</label>
                  <select
                    value={newLeaveType.accrual}
                    onChange={(e) => setNewLeaveType(prev => ({ ...prev, accrual: e.target.value }))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="none">None</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={newLeaveType.gender}
                    onChange={(e) => setNewLeaveType(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="male">Male Only</option>
                    <option value="female">Female Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Max Consecutive Days</label>
                  <input
                    type="number"
                    value={newLeaveType.maxConsecutiveDays}
                    onChange={(e) => setNewLeaveType(prev => ({ ...prev, maxConsecutiveDays: parseInt(e.target.value) }))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center text-xs text-gray-700">
                    <input
                      type="checkbox"
                      checked={newLeaveType.requiresDocumentation}
                      onChange={(e) => setNewLeaveType(prev => ({ ...prev, requiresDocumentation: e.target.checked }))}
                      className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-1">Requires Documentation</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleAddLeaveType}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 flex items-center"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Leave Type
              </button>
            </div>

            {/* Leave Types List */}
            {formData.leaveTypes.length > 0 ? (
              <div className="space-y-2">
                {formData.leaveTypes.map((lt, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{lt.type}</span>
                          <span className="text-sm text-gray-600">{lt.name}</span>
                          {lt.gender !== 'all' && (
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                              {lt.gender} only
                            </span>
                          )}
                          {lt.requiresDocumentation && (
                            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
                              Documentation Required
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {lt.entitlement} days entitlement • {lt.carryForward} days carry forward • {lt.accrual || 0} accrual
                          {lt.maxConsecutiveDays > 0 && ` • Max ${lt.maxConsecutiveDays} consecutive days`}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveLeaveType(index)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No leave types added yet. Add at least one leave type to save the policy.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePolicy}
              disabled={formData.leaveTypes.length === 0 || !formData.name}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingPolicy ? 'Update Policy' : 'Create Policy'}
            </button>
          </div>
        </div>
      )}

      {/* Policies List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Existing Policies
          </h2>
        </div>

        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading policies...</p>
          </div>
        ) : leavePolicies.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {leavePolicies.map(policy => (
              <div key={policy.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{policy.name}</h3>
                      {policy.departmentId && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center">
                          <Building className="w-3 h-3 mr-1" />
                          {policy.departmentId}
                        </span>
                      )}
                      {!policy.departmentId && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          All Departments
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Effective from {new Date(policy.effectiveDate).toLocaleDateString()} • 
                      Probation: {policy.probationPeriod} days • 
                      {policy.leaveTypes?.length || 0} leave types
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => duplicatePolicy(policy)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="Duplicate Policy"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditPolicy(policy)}
                      className="p-2 text-blue-400 hover:text-blue-600"
                      title="Edit Policy"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePolicy(policy.id)}
                      className="p-2 text-red-400 hover:text-red-600"
                      title="Delete Policy"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Leave Types Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {policy.leaveTypes?.map((lt, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">{lt.type}</span>
                        <div className="flex space-x-1">
                          {lt.gender !== 'all' && (
                            <span className="text-xs px-1 bg-purple-100 text-purple-800 rounded">
                              {lt.gender}
                            </span>
                          )}
                          {lt.requiresDocumentation && (
                            <span className="text-xs px-1 bg-orange-100 text-orange-800 rounded">Doc</span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>{lt.name}</div>
                        <div>Entitlement: {lt.entitlement} days</div>
                        <div>Carry Forward: {lt.carryForward} days</div>
                        <div>Accrual: {lt.accrual || 'None'}</div>
                        {lt.maxConsecutiveDays > 0 && (
                          <div>Max Consecutive: {lt.maxConsecutiveDays} days</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No policies configured</h3>
            <p className="text-gray-600 mb-4">Create your first leave policy to get started.</p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Policy
            </button>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default LeavePolicy;