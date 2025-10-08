import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  MessageSquare,
  Video,
  UserCheck,
  Tag,
  Star
} from 'lucide-react';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@techsolutions.com',
      phone: '+1 (555) 123-4567',
      mobile: '+1 (555) 123-4568',
      company: 'Tech Solutions Inc.',
      title: 'CEO',
      department: 'Executive',
      address: '123 Business Ave, New York, NY 10001',
      birthday: '1985-06-15',
      source: 'Website',
      tags: ['VIP', 'Decision Maker'],
      notes: 'Primary contact for enterprise deals',
      lastContact: '2024-10-07',
      preferredContact: 'Email',
      socialProfiles: {
        linkedin: 'linkedin.com/in/johnsmith',
        twitter: '@johnsmith'
      },
      status: 'Active'
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@marketingpro.com',
      phone: '+1 (555) 987-6543',
      mobile: '+1 (555) 987-6544',
      company: 'Marketing Pro Ltd.',
      title: 'Marketing Director',
      department: 'Marketing',
      address: '456 Marketing St, Los Angeles, CA 90210',
      birthday: '1988-03-22',
      source: 'Referral',
      tags: ['Influencer', 'Marketing'],
      notes: 'Great contact for marketing partnerships',
      lastContact: '2024-10-06',
      preferredContact: 'Phone',
      socialProfiles: {
        linkedin: 'linkedin.com/in/sarahjohnson'
      },
      status: 'Active'
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'mchen@enterprise.com',
      phone: '+1 (555) 456-7890',
      mobile: '+1 (555) 456-7891',
      company: 'Enterprise Corp',
      title: 'CTO',
      department: 'Technology',
      address: '789 Tech Blvd, San Francisco, CA 94105',
      birthday: '1982-11-08',
      source: 'Cold Call',
      tags: ['Technical', 'Enterprise'],
      notes: 'Technical decision maker, prefers detailed proposals',
      lastContact: '2024-10-05',
      preferredContact: 'Video Call',
      socialProfiles: {
        linkedin: 'linkedin.com/in/michaelchen',
        github: 'github.com/mchen'
      },
      status: 'Active'
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@startup.io',
      phone: '+1 (555) 321-0987',
      mobile: '+1 (555) 321-0988',
      company: 'Innovation Startup',
      title: 'Founder',
      department: 'Executive',
      address: '321 Innovation Dr, Austin, TX 78701',
      birthday: '1990-09-12',
      source: 'Social Media',
      tags: ['Startup', 'Founder'],
      notes: 'Young entrepreneur, very responsive via social media',
      lastContact: '2024-10-04',
      preferredContact: 'Message',
      socialProfiles: {
        linkedin: 'linkedin.com/in/emilydavis',
        twitter: '@emilydavis'
      },
      status: 'Prospect'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const departments = ['All', 'Executive', 'Marketing', 'Technology', 'Sales', 'Support'];
  const statuses = ['All', 'Active', 'Prospect', 'Inactive'];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'All' || contact.department === filterDepartment;
    const matchesStatus = filterStatus === 'All' || contact.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleSelectContact = (contactId) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(c => c.id));
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const getPreferredContactIcon = (method) => {
    switch (method) {
      case 'Email': return <Mail size={12} className="text-blue-500" />;
      case 'Phone': return <Phone size={12} className="text-green-500" />;
      case 'Video Call': return <Video size={12} className="text-purple-500" />;
      case 'Message': return <MessageSquare size={12} className="text-orange-500" />;
      default: return <Mail size={12} className="text-gray-500" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Contact Management</h1>
            <p className="text-gray-600">Manage all your business contacts in one place</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Upload size={16} />
              <span>Import</span>
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Contact</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-3xl font-bold text-gray-900">{contacts.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Contacts</p>
                <p className="text-3xl font-bold text-green-600">
                  {contacts.filter(c => c.status === 'Active').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Companies</p>
                <p className="text-3xl font-bold text-purple-600">
                  {new Set(contacts.map(c => c.company)).size}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-3xl font-bold text-orange-600">8</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept} Department{dept !== 'All' ? '' : ''}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status} Status{status !== 'All' ? '' : ''}</option>
                ))}
              </select>
            </div>
            
            {selectedContacts.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{selectedContacts.length} selected</span>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contact Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company & Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() => handleSelectContact(contact.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {getInitials(contact.firstName, contact.lastName)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {contact.firstName} {contact.lastName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          {getPreferredContactIcon(contact.preferredContact)}
                          <span className="ml-1">{contact.preferredContact}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail size={12} className="mr-2 text-gray-400" />
                      {contact.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone size={12} className="mr-2 text-gray-400" />
                      {contact.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Building size={12} className="mr-2 text-gray-400" />
                      {contact.company}
                    </div>
                    <div className="text-sm text-gray-500">{contact.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {contact.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      contact.status === 'Active' ? 'bg-green-100 text-green-800' :
                      contact.status === 'Prospect' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {contact.status}
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {contact.tags.map((tag, index) => (
                        <span key={index} className="inline-flex px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Calendar size={12} className="mr-2 text-gray-400" />
                      {new Date(contact.lastContact).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Contact">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Edit Contact">
                        <Edit size={16} />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900" title="Send Message">
                        <MessageSquare size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Delete">
                        <Trash2 size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600" title="More Actions">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactManagement;