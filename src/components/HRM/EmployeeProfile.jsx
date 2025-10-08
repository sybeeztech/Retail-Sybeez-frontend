import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEmployeeStore } from '../../store/employeeStore';
import DocumentManagement from './DocumentManagement';
import { EmployeeFormModal } from './EmployeeDirectory';
import DeleteConfirmation from './DeleteConfirmation';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const EmployeeProfile = () => {
  const { id } = useParams();
  const { employees, loading, error, fetchEmployees, updateEmployee, deleteEmployee } = useEmployeeStore();
  const [employee, setEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showDocuments, setShowDocuments] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const navigate = useNavigate();
  const {user} = useAuthStore();

  useEffect(() => {
    if (employees.length === 0) {
      fetchEmployees();
    } else {
      const foundEmployee = employees.find(emp => emp.id === id);
      setEmployee(foundEmployee);
    }
  }, [id, employees, fetchEmployees]);

  const calculateTenure = (startDate) => {
    let start = new Date(startDate);
    let now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    
    if (days < 0) {
      months--;
      // Get the number of days in the previous month
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += lastDayOfMonth;
  }
  
  if (months < 0) {
      years--;
      months += 12;
  }
  
  return `${years} years, ${months} months, ${days} days`;
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-500">Loading employee profile...</div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-red-500">
          {error || 'Employee not found'}
        </div>
        <Link to="/employees" className="ml-4 text-blue-600 hover:text-blue-800">
          Back to Directory
        </Link>
      </div>
    );
  }

  const handleEditEmployee = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveEmployee = async (employeeData) => {
    try {
      await updateEmployee(employee.id, employeeData);
      setIsEditModalOpen(false);
      // Refresh the employee data
      const updatedEmployees = await fetchEmployees();
      const updatedEmployee = updatedEmployees.find(emp => emp.id === id);
      setEmployee(updatedEmployee);
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  };

  const handleDeleteClick = () => {
    setDeleteCandidate(employee);
  };

  const handleDeleteConfirm = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      setDeleteCandidate(null);
      navigate('/employees'); // Redirect to employee directory after deletion
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      
       {/* Back button */}
       <div className="flex justify-between items-center mb-6">
        <button 
          // onClick={() => navigate('/employees')}
          onClick={() => navigate(-1) || navigate('/employees')}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

      {/* Action buttons */}
      <div className="flex space-x-3">
          <button
            onClick={handleEditEmployee}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Employee
          </button>
          
          {/* Admin can't remove himself 
          AND Manager can't remove other managers/Admin/super_admin 
          AND Admin can't remove other Admin/super_admin */}
          {(user.employeeId !== id && 
          ( 
          !(user.employee.role === 'manager' && ['manager', 'admin', 'super_admin'].includes(employee?.role))
             &&
          !(user.employee.role === 'admin' && ['admin', 'super_admin'].includes(employee?.role)) 
          )
        )
          && (
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove Employee
          </button>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-24 w-24">
            <img 
              className="h-24 w-24 rounded-full object-cover" 
              src={employee.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} 
              alt={`${employee.firstName} ${employee.lastName}`} 
            />
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-lg text-gray-600">{employee.designation}</p>
            <div className="flex items-center mt-2">
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                employee.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {employee.active ? 'Active' : 'Inactive'}
              </span>
              <span className="ml-3 text-sm text-gray-500">
                Tenure: {calculateTenure(employee.startDate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 text-sm font-medium ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('professional')}
            className={`py-4 px-1 text-sm font-medium ${
              activeTab === 'professional'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Professional Details
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`py-4 px-1 text-sm font-medium ${
              activeTab === 'education'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`py-4 px-1 text-sm font-medium ${
              activeTab === 'experience'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setShowDocuments(true)}
            className="py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Documents
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">{employee.gender || 'Not specified'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.address}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Emergency Contact</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {employee.emergencyContactName} ({employee.emergencyContactRelation}) - {employee.emergencyContactPhone}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Employment Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Employment Details</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Department</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.department}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Designation</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.designation}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Reporting Manager</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.reportingManager}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Joining Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(employee.startDate).toLocaleDateString('en-GB')}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">CTC</dt>
                  <dd className="mt-1 text-sm text-gray-900">Rs.{employee.ctc?.toLocaleString()}</dd>
                </div>
              </dl>
            </div>

            {/* Personal Identification */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Identification</h2>
              <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Aadhaar Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.aadharNumber || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">PAN Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.panNumber || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Official Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.officialEmail || 'Not provided'}</dd>
                </div>
              </dl>
            </div>

            {/* Bank Details */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Bank Details</h2>
              <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Bank Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.bankName || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Account Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.accountNumber || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">IFSC Code</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.ifscCode || 'Not provided'}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {activeTab === 'professional' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Professional Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Experience</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {employee.experienceYears ? `${employee.experienceYears} years` : 'Not specified'}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900">{employee.location || 'Not specified'}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Source of Hire</dt>
                <dd className="mt-1 text-sm text-gray-900">{employee.sourceOfHire || 'Not specified'}</dd>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-900 mb-4">Current Role Details</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div>
                  <dt className="text-sm font-medium text-gray-500">Position</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.position}</dd>
                </div> */}
                <div>
                  <dt className="text-sm font-medium text-gray-500">Designation</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.designation}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Department</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.department}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Reporting Manager</dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.reportingManager}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Education</h2>
            
            {employee.education && employee.education.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Institute Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Degree/Diploma
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Field of Study
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Completion Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employee.education.map((edu, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {edu.institute || 'Not specified'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {edu.degree || 'Not specified'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {edu.field || 'Not specified'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {edu.completionDate ? new Date(edu.completionDate).toLocaleDateString('en-GB') : 'Not specified'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No education information available.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'experience' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Work Experience</h2>
            
            {employee.experience && employee.experience.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Occupation
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employee.experience.map((exp, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {exp.occupation || 'Not specified'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {exp.company || 'Not specified'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {exp.duration || 'Not specified'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No work experience information available.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'performance' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800">Overall Rating</h3>
                <p className="text-2xl font-bold text-blue-900">4.2/5</p>
                <p className="text-sm text-blue-700">Exceeds Expectations</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800">Projects Completed</h3>
                <p className="text-2xl font-bold text-green-900">24</p>
                <p className="text-sm text-green-700">96% success rate</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800">Skills</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['React', 'Node.js', 'MongoDB', 'AWS', 'UI/UX'].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">Quarterly Performance</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Q1 2023</span>
                  <span className="text-sm font-medium text-gray-900">4.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-2 mt-4">
                  <span className="text-sm text-gray-600">Q2 2023</span>
                  <span className="text-sm font-medium text-gray-900">4.3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '86%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-2 mt-4">
                  <span className="text-sm text-gray-600">Q3 2023</span>
                  <span className="text-sm font-medium text-gray-900">4.5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-2 mt-4">
                  <span className="text-sm text-gray-600">Q4 2023</span>
                  <span className="text-sm font-medium text-gray-900">4.2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Goals for Next Quarter</h3>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li className="text-sm text-gray-700">Complete advanced React training</li>
                <li className="text-sm text-gray-700">Lead the new customer portal project</li>
                <li className="text-sm text-gray-700">Improve code review process efficiency</li>
                <li className="text-sm text-gray-700">Mentor two junior developers</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Employment History</h2>
            
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">Background Verification</h3>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                employee.bgvStatus === 'Completed' 
                  ? 'bg-green-100 text-green-800' 
                  : employee.bgvStatus === 'In Progress'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {employee.bgvStatus || 'Pending'}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Last verified: {employee.bgvDate ? new Date(employee.bgvDate).toLocaleDateString('en-GB') : 'Not verified'}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">Promotion History</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">Senior Developer</span>
                    <span className="text-sm text-gray-500">Jan 2023</span>
                  </div>
                  <p className="text-sm text-gray-600">Promoted for exceptional performance on the payment gateway project</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">Mid-level Developer</span>
                    <span className="text-sm text-gray-500">Mar 2021</span>
                  </div>
                  <p className="text-sm text-gray-600">Promoted after demonstrating leadership in the mobile app redesign</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">Junior Developer</span>
                    <span className="text-sm text-gray-500">{new Date(employee.startDate).toLocaleDateString('en-GB')}</span>
                  </div>
                  <p className="text-sm text-gray-600">Joined as a junior developer after completing internship</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Previous Experience</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  {employee.firstName} has {calculateTenure(employee.startDate)} of total professional experience, 
                  with all of it at our company.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document Management Modal */}
      {showDocuments && (
        <DocumentManagement
          employee={employee}
          onClose={() => setShowDocuments(false)}
        />
      )}

      {/* Edit Employee Modal */}
      {isEditModalOpen && (
        <EmployeeFormModal
          employee={employee}
          onSave={handleSaveEmployee}
          onCancel={() => setIsEditModalOpen(false)}
          isOpen={isEditModalOpen}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <DeleteConfirmation 
          employee={deleteCandidate}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteCandidate(null)}
        />
      )}
      
    </div>
  );
};

export default EmployeeProfile;