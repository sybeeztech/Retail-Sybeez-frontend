// EmployeeDirectory.jsx - UPDATED VERSION
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  MapPin,
  Users,
  Calendar,
  Download,
  MoreVertical,
  X
} from 'lucide-react';
import { useEmployeeStore } from '../../store/employeeStore';
import { useDepartmentStore } from '../../store/departmentStore';
import { useNavigate } from 'react-router-dom';
import useSettingsStore from '../../store/settingsStore';
import DepartmentDropdown from './DepartmentDropdown';

// Delete Confirmation Modal
const DeleteConfirmation = ({ employee, onConfirm, onCancel, theme }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`rounded-lg shadow-xl max-w-md w-full p-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Delete Employee
        </h3>
        <p className={`mb-6 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Are you sure you want to delete {employee.firstName} {employee.lastName}? This action cannot be undone.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className={`px-4 py-2 border rounded-lg ${
              theme === 'dark' 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
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

// Employee Form Modal (simplified version for this example)
// Old version
export const EmployeeFormModal = ({ employee, onSave, onCancel, isOpen, theme }) => {
  // const { user } = useAuthStore(); 

  const user = {
    id: 1,
    username: 'admin',
    email: 'admin@gmail.com',
    role: 'admin',
    employee: {
      id: 1,
      name: 'Admin User',
      role: 'admin'
    }
  };

  const [formData, setFormData] = useState({
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    gender: employee?.gender || 'male',
    email: employee?.email || '',
    phone: employee?.phone || '',
    address: employee?.address || '',
    aadharNumber: employee?.aadharNumber || '',
    panNumber: employee?.panNumber || '',
    officialEmail: employee?.officialEmail || '',
    position: employee?.position || '',
    department: employee?.department || '',
    startDate: employee?.startDate || '',
    ctc: employee?.ctc || '',
    active: employee?.active !== undefined ? employee.active : true,
    experienceYears: employee?.experienceYears || '',
    location: employee?.location || '',
    sourceOfHire: employee?.sourceOfHire || '',
    education: employee?.education || [
      { institute: '', degree: '', field: '', completionDate: '' }
    ],
    experience: employee?.experience || [
      { occupation: '', company: '', duration: '' }
    ],
    avatar: employee?.avatar || '',
    bankName: employee?.bankName || '',
    accountNumber: employee?.accountNumber || '',
    ifscCode: employee?.ifscCode || '',
    emergencyContactName: employee?.emergencyContactName || '',
    emergencyContactPhone: employee?.emergencyContactPhone || '',
    emergencyContactRelation: employee?.emergencyContactRelation || '',
    reportingManager: employee?.reportingManager || '',
    designation: employee?.designation || ''
  });
  
  const [errors, setErrors] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(employee?.avatar || '');

  const isEmployeeEditingOwnProfile = user.employee?.role === 'employee' && 
    employee?.id === user?.employeeId;

  const employeeEditableFields = [
    'email', 'phone', 'aadharNumber', 'panNumber', 'address', 
    'avatar', 'bankName', 'accountNumber', 'ifscCode',
    'emergencyContactName', 'emergencyContactPhone', 'emergencyContactRelation'
  ];

  const isFieldDisabled = (fieldName) => {
    if (!isEmployeeEditingOwnProfile) return false;
    return !employeeEditableFields.includes(fieldName);
  };

  const getFieldClassName = (fieldName, hasError = false) => {
    const baseClass = `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      hasError ? 'border-red-500' : theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
    }`;
    
    if (isFieldDisabled(fieldName)) {
      return `${baseClass} ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} cursor-not-allowed opacity-60`;
    }
    
    return `${baseClass} ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`;
  };

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        gender: employee.gender || 'male',
        email: employee.email || '',
        phone: employee.phone || '',
        address: employee.address || '',
        aadharNumber: employee.aadharNumber || '',
        panNumber: employee.panNumber || '',
        officialEmail: employee.officialEmail || '',
        position: employee.position || '',
        department: employee.department || '',
        startDate: employee.startDate || '',
        ctc: employee?.ctc || '',
        active: employee?.active !== undefined ? employee.active : true,
        avatar: employee.avatar || '',
        experienceYears: employee.experienceYears || '',
        location: employee.location || '',
        sourceOfHire: employee.sourceOfHire || '',
        education: employee.education || [{ institute: '', degree: '', field: '', completionDate: '' }],
        experience: employee.experience || [{ occupation: '', company: '', duration: '' }],
        bankName: employee.bankName || '',
        accountNumber: employee.accountNumber || '',
        ifscCode: employee?.ifscCode || '',
        emergencyContactName: employee.emergencyContactName || '',
        emergencyContactPhone: employee.emergencyContactPhone || '',
        emergencyContactRelation: employee.emergencyContactRelation || '',
        reportingManager: employee.reportingManager || '',
        designation: employee.designation || ''
      });
      setAvatarPreview(employee.avatar || '');
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        gender: 'male',
        email: '',
        phone: '',
        address: '',
        aadharNumber: '',
        panNumber: '',
        officialEmail: '',
        position: '',
        department: '',
        startDate: '',
        ctc: '',
        active: true,
        avatar: '',
        experienceYears: '',
        location: '',
        sourceOfHire: '',
        education: [{ institute: '', degree: '', field: '', completionDate: '' }],
        experience: [{ occupation: '', company: '', duration: '' }],
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: '',
        reportingManager: '',
        designation: ''
      });
      setAvatarPreview('');
    }
    setErrors({});
    setAvatarFile(null);
  }, [employee, isOpen]);

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData(prev => ({ ...prev, education: updatedEducation }));
  };

  const addEducationRow = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { institute: '', degree: '', field: '', completionDate: '' }]
    }));
  };

  const removeEducationRow = (index) => {
    if (formData.education.length > 1) {
      const updatedEducation = formData.education.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, education: updatedEducation }));
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = value;
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const addExperienceRow = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { occupation: '', company: '', duration: '' }]
    }));
  };

  const removeExperienceRow = (index) => {
    if (formData.experience.length > 1) {
      const updatedExperience = formData.experience.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, experience: updatedExperience }));
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!isEmployeeEditingOwnProfile) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.department.trim()) newErrors.department = 'Department is required';
      if (!formData.startDate) newErrors.startDate = 'Joining date is required';
      if (!formData.ctc || formData.ctc <= 0) newErrors.ctc = 'Valid CTC is required';
      if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
      if (!formData.reportingManager.trim()) newErrors.reportingManager = 'Reporting manager is required';
    }
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        ctc: Number(formData.ctc)
      });
    }
  };

  const { departments } = useDepartmentStore();

  const getReportingManagerOptions = () => {
    const options = [];
    
    options.push({ id: 'ceo', name: 'CEO', department: 'All' });
    
    if (formData.department) {
      const selectedDept = departments.find(dept => dept.name === formData.department);
      if (selectedDept && selectedDept.manager) {
        options.push({
          id: selectedDept.id,
          name: selectedDept.manager,
          department: selectedDept.name
        });
      }
    }
    
    return options;
  };
  
  if (!isOpen) return null;
  
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textColorSecondary = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  
  return (
    <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className={`${bgColor} rounded-lg shadow-xl max-w-6xl w-full mx-auto my-8 p-6 max-h-[97vh] overflow-y-auto`}>
        <div className='flex justify-between'>
          <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>
            {employee ? (
              isEmployeeEditingOwnProfile ? 'Edit My Profile' : 'Edit Employee'
            ) : 'Add New Employee'}
          </h2>
          <button onClick={onCancel} className={`text-2xl ${textColorSecondary} cursor-pointer inline-block`}>
            <X />
          </button>
        </div>

        {isEmployeeEditingOwnProfile && (
          <div className={`mb-4 p-3 rounded-lg border ${
            theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
            }`}>
              <strong>Note:</strong> As an employee, you can only edit your personal contact and bank information.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="md:col-span-2">
              <h3 className={`text-lg font-medium mb-4 border-b pb-2 ${textColor} ${borderColor}`}>
                Personal Information
              </h3>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isFieldDisabled('firstName')}
                className={getFieldClassName('firstName', errors.firstName)}
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isFieldDisabled('lastName')}
                className={getFieldClassName('lastName', errors.lastName)}
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={isFieldDisabled('gender')}
                className={getFieldClassName('gender', errors.gender)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isFieldDisabled('email')}
                className={getFieldClassName('email', errors.email)}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isFieldDisabled('phone')}
                className={getFieldClassName('phone', errors.phone)}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                Aadhaar Number
              </label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                disabled={isFieldDisabled('aadharNumber')}
                maxLength="12"
                className={getFieldClassName('aadharNumber')}
                placeholder="12-digit Aadhaar number"
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                PAN Number
              </label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                disabled={isFieldDisabled('panNumber')}
                maxLength="10"
                className={getFieldClassName('panNumber')}
                placeholder="10-character PAN"
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                Official Email
              </label>
              <input
                type="email"
                name="officialEmail"
                value={formData.officialEmail}
                onChange={handleChange}
                disabled={isFieldDisabled('officialEmail')}
                className={getFieldClassName('officialEmail')}
                placeholder="company email address"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={isFieldDisabled('address')}
                rows={3}
                className={getFieldClassName('address')}
              />
            </div>
            
            {/* Avatar Upload */}
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                Profile Photo
              </label>
              <div className="flex items-center space-x-4">
                {avatarPreview && (
                  <div className="flex-shrink-0 h-16 w-16">
                    <img className="h-16 w-16 rounded-full object-cover" src={avatarPreview} alt="Avatar preview" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isFieldDisabled('avatar')}
                    className={getFieldClassName('avatar')}
                  />
                </div>
              </div>
            </div>
            
            {/* Employment Details - Disabled for employees */}
            {!isEmployeeEditingOwnProfile && (
              <>
                <div className="md:col-span-2 mt-6">
                  <h3 className={`text-lg font-medium mb-4 border-b pb-2 ${textColor} ${borderColor}`}>
                    Employment Details
                  </h3>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                    Designation *
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className={getFieldClassName('designation', errors.designation)}
                  />
                  {errors.designation && <p className="mt-1 text-sm text-red-600">{errors.designation}</p>}
                </div>
                
                {/* In the EmployeeFormModal component, replace the department select with this: */}

<div>
  <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
    Department *
  </label>
  <DepartmentDropdown
    value={formData.department}
    onChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
    onAddDepartment={async (newDepartment) => {
      try {
        const department = await useEmployeeStore.getState().addDepartment(newDepartment);
        setFormData(prev => ({ ...prev, department: department.name }));
      } catch (error) {
        console.error('Failed to add department:', error);
      }
    }}
    disabled={isFieldDisabled('department')}
    className={getFieldClassName('department', errors.department)}
    theme={theme}
  />
  {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
</div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                    Reporting Manager *
                  </label>
                  <select
                    name="reportingManager"
                    value={formData.reportingManager}
                    onChange={handleChange}
                    className={getFieldClassName('reportingManager', errors.reportingManager)}
                  >
                    <option value="">Select Reporting Manager</option>
                    {getReportingManagerOptions().map(manager => (
                      <option key={manager.id} value={manager.name}>
                        {manager.name} {manager.department === 'All' ? '(CEO)' : `(${manager.department} Manager)`}
                      </option>
                    ))}
                  </select>
                  {errors.reportingManager && <p className="mt-1 text-sm text-red-600">{errors.reportingManager}</p>}
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                    CTC (Rs) *
                  </label>
                  <input
                    type="number"
                    name="ctc"
                    value={formData.ctc}
                    onChange={handleChange}
                    min="0"
                    step="1000"
                    className={getFieldClassName('ctc', errors.ctc)}
                    placeholder="e.g., 600000"
                  />
                  {errors.ctc && <p className="mt-1 text-sm text-red-600">{errors.ctc}</p>}
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                    Joining Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={getFieldClassName('startDate', errors.startDate)}
                  />
                  {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                    Status
                  </label>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                        className={`rounded focus:ring-blue-500 ${
                          theme === 'dark' ? 'border-gray-600 bg-gray-700 text-blue-500' : 'border-gray-300 text-blue-600'
                        }`}
                      />
                      <span className={`ml-2 text-sm ${textColorSecondary}`}>Active Employee</span>
                    </label>
                  </div>
                </div>
              </>
            )}
            
            {/* Bank Details */}
            <div className="md:col-span-2 mt-6">
              <h3 className={`text-lg font-medium mb-4 border-b pb-2 ${textColor} ${borderColor}`}>
                Bank Details
              </h3>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                Bank Name
              </label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                disabled={isFieldDisabled('bankName')}
                className={getFieldClassName('bankName')}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                disabled={isFieldDisabled('accountNumber')}
                className={getFieldClassName('accountNumber')}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                IFSC Code
              </label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                disabled={isFieldDisabled('ifscCode')}
                className={getFieldClassName('ifscCode')}
              />
            </div>
            
            {/* Emergency Contact */}
            <div className="md:col-span-2 mt-6">
              <h3 className={`text-lg font-medium mb-4 border-b pb-2 ${textColor} ${borderColor}`}>
                Emergency Contact
              </h3>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                Contact Name
              </label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                disabled={isFieldDisabled('emergencyContactName')}
                className={getFieldClassName('emergencyContactName')}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                Contact Phone
              </label>
              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                disabled={isFieldDisabled('emergencyContactPhone')}
                className={getFieldClassName('emergencyContactPhone')}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                Relationship
              </label>
              <input
                type="text"
                name="emergencyContactRelation"
                value={formData.emergencyContactRelation}
                onChange={handleChange}
                disabled={isFieldDisabled('emergencyContactRelation')}
                className={getFieldClassName('emergencyContactRelation')}
              />
            </div>

            {/* Professional Details - Disabled for employees */}
            {!isEmployeeEditingOwnProfile && (
              <>
                <div className="md:col-span-2 mt-6">
                  <h3 className={`text-lg font-medium mb-4 border-b pb-2 ${textColor} ${borderColor}`}>
                    Professional Details
                  </h3>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    min="0"
                    max="50"
                    step="0.5"
                    className={getFieldClassName('experienceYears')}
                    placeholder="e.g., 5.5"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={getFieldClassName('location')}
                    placeholder="Work location"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                    Source of Hire
                  </label>
                  <select
                    name="sourceOfHire"
                    value={formData.sourceOfHire}
                    onChange={handleChange}
                    className={getFieldClassName('sourceOfHire')}
                  >
                    <option value="">Select Source</option>
                    <option value="Referral">Referral</option>
                    <option value="Job Portal">Job Portal</option>
                    <option value="Campus">Campus</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Direct">Direct</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </>
            )}
            
            {/* Education Section */}
            {!isEmployeeEditingOwnProfile && (
              <div className="md:col-span-2 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-medium border-b pb-2 ${textColor} ${borderColor}`}>
                    Education
                  </h3>
                  <button
                    type="button"
                    onClick={addEducationRow}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    Add Row
                  </button>
                </div>
                
                <div className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <div key={index} className={`grid grid-cols-1 md:grid-cols-4 gap-4 items-end border-b pb-4 ${borderColor}`}>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                          Institute Name
                        </label>
                        <input
                          type="text"
                          value={edu.institute}
                          onChange={(e) => handleEducationChange(index, 'institute', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-gray-100' 
                              : 'border-gray-300 text-gray-900'
                          }`}
                          placeholder="Institute name"
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                          Degree/Diploma
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-gray-100' 
                              : 'border-gray-300 text-gray-900'
                          }`}
                          placeholder="Degree/Diploma"
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                          Field of Study
                        </label>
                        <input
                          type="text"
                          value={edu.field}
                          onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-gray-100' 
                              : 'border-gray-300 text-gray-900'
                          }`}
                          placeholder="Field of study"
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <div className="flex-1">
                          <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                            Completion Date
                          </label>
                          <input
                            type="date"
                            value={edu.completionDate}
                            onChange={(e) => handleEducationChange(index, 'completionDate', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-gray-100' 
                                : 'border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                        
                        {formData.education.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEducationRow(index)}
                            className="px-3 py-2 text-red-600 rounded-lg"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Experience Section */}
            {!isEmployeeEditingOwnProfile && (
              <div className="md:col-span-2 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-medium border-b pb-2 ${textColor} ${borderColor}`}>
                    Work Experience
                  </h3>
                  <button
                    type="button"
                    onClick={addExperienceRow}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    Add Row
                  </button>
                </div>
                
                <div className="space-y-4">
                  {formData.experience.map((exp, index) => (
                    <div key={index} className={`grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4 ${borderColor}`}>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                          Occupation
                        </label>
                        <input
                          type="text"
                          value={exp.occupation}
                          onChange={(e) => handleExperienceChange(index, 'occupation', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-gray-100' 
                              : 'border-gray-300 text-gray-900'
                          }`}
                          placeholder="Job title"
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                          Company
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-gray-100' 
                              : 'border-gray-300 text-gray-900'
                          }`}
                          placeholder="Company name"
                        />
                      </div>
                      
                      <div className="flex space-x-2 items-end">
                        <div className="flex-1">
                          <label className={`block text-sm font-medium mb-1 ${textColorSecondary}`}>
                            Duration
                          </label>
                          <input
                            type="text"
                            value={exp.duration}
                            onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-gray-100' 
                                : 'border-gray-300 text-gray-900'
                            }`}
                            placeholder="e.g., Jan 2020 - Dec 2022"
                          />
                        </div>
                        
                        {formData.experience.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeExperienceRow(index)}
                            className="px-3 py-2 text-red-600 rounded-full"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className={`px-4 py-2 border rounded-lg ${
                theme === 'dark' 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {employee ? (
                isEmployeeEditingOwnProfile ? 'Update My Profile' : 'Update Employee'
              ) : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Employee Directory Component
const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [userRole, setUserRole] = useState('employee');

  const { theme } = useSettingsStore();
  const navigate = useNavigate();
  
  const { 
    employees, 
    loading, 
    error,
    fetchEmployees, 
    addEmployee, 
    updateEmployee, 
    deleteEmployee 
  } = useEmployeeStore();

  const { fetchDepartments, departments } = useEmployeeStore();

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    
    // Simulate fetching user role - replace with actual auth logic
    const fetchUserRole = async () => {
      // This would typically come from your auth store or API
      const role = 'admin'; // Change this based on actual user role
      setUserRole(role);
    };
    
    fetchUserRole();
  }, [fetchEmployees, fetchDepartments]);

  const [selectedDepartment, setSelectedDepartment] = useState('');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee?.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee?.department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      !selectedDepartment || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Update these variables
const totalEmployees = filteredEmployees.length;
const activeEmployees = filteredEmployees.filter(emp => emp.active).length;

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };
  
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };
  
  const handleDeleteClick = (employee) => {
    setDeleteCandidate(employee);
  };
  
  const handleDeleteConfirm = async (id) => {
    try {
      await deleteEmployee(id);
      setDeleteCandidate(null);
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };
  
  const handleSaveEmployee = async (employeeData) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, employeeData);
      } else {
        await addEmployee(employeeData);
      }
      setIsFormOpen(false);
      setEditingEmployee(null);
    } catch (error) {
      console.error('Failed to save employee:', error);
    }
  };
  
  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingEmployee(null);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
  };

  if (loading) {
    return (
      <div className={`p-6 flex justify-center items-center h-64 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
          Loading employees...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 flex justify-center items-center h-64 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }


  // Add this function inside the EmployeeDirectory component, before the return statement

const handleExport = () => {
  try {
    // Prepare data for export
    const exportData = filteredEmployees.map(employee => ({
      'First Name': employee.firstName,
      'Last Name': employee.lastName,
      'Email': employee.email,
      'Phone': employee.phone,
      'Designation': employee.designation || 'N/A',
      'Department': employee.department || 'N/A',
      'Reporting Manager': employee.reportingManager || 'N/A',
      'CTC': employee.ctc ? `Rs.${employee.ctc.toLocaleString()}` : 'N/A',
      'Status': employee.active ? 'Active' : 'Inactive',
      'Joining Date': employee.startDate ? new Date(employee.startDate).toLocaleDateString('en-GB') : 'N/A',
      'Location': employee.location || 'N/A',
      'Experience (Years)': employee.experienceYears || 'N/A'
    }));

    // Convert to CSV
    const headers = Object.keys(exportData[0] || {});
    const csvContent = [
      headers.join(','), // Header row
      ...exportData.map(row => 
        headers.map(header => {
          const value = row[header] || '';
          // Handle values that might contain commas by wrapping in quotes
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `employees-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message (you could replace this with a toast notification)
    alert(`Exported ${exportData.length} employees successfully!`);
    
  } catch (error) {
    console.error('Export failed:', error);
    alert('Export failed. Please try again.');
  }
};


  return (
    <div className={`p-6 min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Employee Directory
          </h2>
          <p className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Manage and view all employee information
          </p>
        </div>
        
        {/* Summary Cards */}
        <div className="flex space-x-4">
          <div className={`rounded-lg p-4 min-w-[120px] ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Total
                </p>
                <p className="text-xl font-bold text-blue-600">{totalEmployees}</p>
              </div>
              <div className={`p-2 rounded-full ${
                theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'
              }`}>
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg p-4 min-w-[120px] ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Active
                </p>
                <p className="text-xl font-bold text-green-600">{activeEmployees}</p>
              </div>
              <div className={`p-2 rounded-full ${
                theme === 'dark' ? 'bg-green-900/50' : 'bg-green-100'
              }`}>
                <Users className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
<div className="flex justify-between items-center mb-6">
  <div className="flex space-x-3">
    <div className="relative">
      <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
      }`} size={20} />
      <input 
        type="text" 
        placeholder="Search employees by name, designation or department..." 
        className={`pl-10 pr-4 py-2 w-80 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400' 
            : 'border-gray-300 text-gray-900'
        }`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    
    {/* Department Filter Dropdown */}
    <div className="relative">
      <select
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
        className={`pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700 text-gray-100' 
            : 'border-gray-300 text-gray-900'
        }`}
      >
        <option value="">All Departments</option>
        {departments.map(dept => (
          <option key={dept.id} value={dept.name}>
            {dept.name}
          </option>
        ))}
      </select>
      <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
    
    {/* Clear Filters Button */}
    {(searchTerm || selectedDepartment) && (
      <button
        onClick={() => {
          setSearchTerm('');
          setSelectedDepartment('');
        }}
        className={`px-4 py-2 border rounded-lg flex items-center space-x-2 ${
          theme === 'dark' 
            ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
            : 'bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <X size={16} />
        <span>Clear Filters</span>
      </button>
    )}
  </div>
  
  <div className="flex space-x-3">
    <button 
      onClick={handleExport}
      className={`border px-3 py-2 rounded-lg flex items-center space-x-2 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Download size={16} />
      <span>Export CSV</span>
    </button>
    
    {['super_admin', 'admin'].includes(userRole) && (
      <button 
        onClick={handleAddEmployee}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
      >
        <Plus size={16} />
        <span>Add Employee</span>
      </button>
    )}
  </div>
</div>

      {/* Employee Table */}
      <div className={`rounded-lg shadow ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
                    Employee
                  </span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
                    Designation
                  </span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
                    Department
                  </span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
                    CTC
                  </span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
                    Status
                  </span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
                    Joining Date
                  </span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
                    Actions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {filteredEmployees.map(employee => (
                <tr key={employee.id} className={`hover:${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  {/* Employee Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {employee.avatar ? (
                          <img 
                            className="h-10 w-10 rounded-full object-cover cursor-pointer" 
                            src={employee.avatar} 
                            alt={`${employee.firstName} ${employee.lastName}`}
                            onClick={() => navigate(`/hrm/employees/${employee.id}`)}
                          />
                        ) : (
                          <div 
                            className={`h-10 w-10 rounded-full flex items-center justify-center cursor-pointer ${
                              theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'
                            }`}
                            onClick={() => navigate(`/hrm/employees/${employee.id}`)}
                          >
                            <span className={`text-xl font-medium ${
                              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                            }`}>
                              {getInitials(employee.firstName, employee.lastName)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div 
                          className={`text-sm font-medium cursor-pointer hover:text-blue-600 ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}
                          onClick={() => navigate(`/hrm/employees/${employee.id}`)}
                        >
                          {employee.firstName} {employee.lastName}
                        </div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {employee.email}
                        </div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {employee.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Designation Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {employee.designation}
                    </div>
                  </td>
                  
                  {/* Department Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      theme === 'dark' ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {employee.department}
                    </span>
                    {employee.reportingManager && (
                      <div className={`text-xs mt-1 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Manager: {employee.reportingManager}
                      </div>
                    )}
                  </td>
                  
                  {/* CTC Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {employee.ctc ? `Rs.${employee.ctc.toLocaleString()}` : 'N/A'}
                    </div>
                  </td>
                  
                  {/* Status Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.active 
                        ? theme === 'dark' 
                          ? 'bg-green-900/50 text-green-400' 
                          : 'bg-green-100 text-green-800'
                        : theme === 'dark'
                          ? 'bg-red-900/50 text-red-400'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  
                  {/* Joining Date Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {employee.startDate ? new Date(employee.startDate).toLocaleDateString('en-GB') : 'N/A'}
                    </div>
                  </td>
                  
                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedEmployee(employee)}
                        className={theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}
                        title="View Details"
                      >
                        {/* <Eye size={16} /> */}
                      </button>
                      {['super_admin', 'admin'].includes(userRole) && (
                        <>
                          <button 
                            onClick={() => handleEditEmployee(employee)}
                            className={theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}
                            title="Edit Employee"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(employee)}
                            className={theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}
                            title="Delete Employee"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <Users className={`mx-auto h-12 w-12 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`mt-2 text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
              }`}>
                {searchTerm ? 'No employees match your search' : 'No employees found'}
              </h3>
              <p className={`mt-1 text-sm ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {searchTerm ? 'Try adjusting your search terms' : 'Add your first employee to get started'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-10 mx-auto p-5 border w-4/5 max-w-2xl shadow-lg rounded-md ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {selectedEmployee.avatar ? (
                    <img 
                      className="h-16 w-16 rounded-full object-cover" 
                      src={selectedEmployee.avatar} 
                      alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                    />
                  ) : (
                    <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'
                    }`}>
                      <span className={`text-xl font-medium ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {getInitials(selectedEmployee.firstName, selectedEmployee.lastName)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className={`text-2xl font-medium ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {selectedEmployee.firstName} {selectedEmployee.lastName}
                    </h3>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedEmployee.designation}
                    </p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {selectedEmployee.department}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className={theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className={`rounded-lg p-4 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h4 className={`text-lg font-medium mb-4 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                        {selectedEmployee.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                        {selectedEmployee.phone}
                      </span>
                    </div>
                    {selectedEmployee.address && (
                      <div className="flex items-center space-x-3">
                        <MapPin size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} />
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                          {selectedEmployee.address}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Employment Details */}
                <div className={`rounded-lg p-4 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h4 className={`text-lg font-medium mb-4 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Employment Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Department
                      </span>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                        {selectedEmployee.department}
                      </p>
                    </div>
                    <div>
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Designation
                      </span>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                        {selectedEmployee.designation}
                      </p>
                    </div>
                    {selectedEmployee.reportingManager && (
                      <div>
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Reporting Manager
                        </span>
                        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                          {selectedEmployee.reportingManager}
                        </p>
                      </div>
                    )}
                    {selectedEmployee.startDate && (
                      <div>
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Joining Date
                        </span>
                        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                          {new Date(selectedEmployee.startDate).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                    )}
                    {selectedEmployee.ctc && (
                      <div>
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          CTC
                        </span>
                        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>
                          Rs.{selectedEmployee.ctc.toLocaleString()}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Status
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedEmployee.active 
                          ? theme === 'dark' 
                            ? 'bg-green-900/50 text-green-400' 
                            : 'bg-green-100 text-green-800'
                          : theme === 'dark'
                            ? 'bg-red-900/50 text-red-400'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedEmployee.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className={`border px-4 py-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Close
                </button>
                {['super_admin', 'admin'].includes(userRole) && (
                  <button 
                    onClick={() => {
                      handleEditClick(selectedEmployee);
                      setSelectedEmployee(null);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Edit Employee
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <DeleteConfirmation 
          employee={deleteCandidate}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteCandidate(null)}
          theme={theme}
        /> 
      )}
      
      {/* Employee Form Modal */}
      <EmployeeFormModal 
        employee={editingEmployee}
        onSave={handleSaveEmployee}
        onCancel={handleFormCancel}
        isOpen={isFormOpen}
        theme={theme}
      />
    </div>
  );
};

export default EmployeeDirectory;