import React, { useState } from 'react';
import { 
  Plus, Search, Filter, MoreHorizontal, ChevronDown, User, Calendar, Eye, Users, Settings, Bell, HelpCircle, Grid3X3, Menu, Home, Briefcase, Star,
  Zap, Target, Archive, Share2, Download, Copy, Trash2, MessageCircle, Clock, AlertCircle, CheckCircle
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

const SetupStep9 = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Task 1',
      owner: 'John Doe',
      status: 'Working on it',
      dueDate: '2025-08-23',
      group: 'To-Do',
      priority: 'High',
      notes: 'Important task'
    },
    {
      id: 2,
      name: 'Task 2',
      owner: 'Jane Smith',
      status: 'Done',
      dueDate: '2025-08-24',
      group: 'To-Do',
      priority: 'Medium',
      notes: 'Completed successfully'
    }
  ]);

  
  
  const [newTaskName, setNewTaskName] = useState('');
  const [showNewTaskInput, setShowNewTaskInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPerson, setFilterPerson] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showSidekick, setShowSidekick] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [showAutomations, setShowAutomations] = useState(false);

  const [groups, setGroups] = useState([
    { id: 'todo', name: 'To-Do', color: 'blue' },
    { id: 'completed', name: 'Completed', color: 'green' }
  ]);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState('text');
  const [customColumns, setCustomColumns] = useState([]);

  const [activeGroupForNewTask, setActiveGroupForNewTask] = useState('todo');
  const [showNewTaskInputForGroup, setShowNewTaskInputForGroup] = useState(null);

  const navigate = useNavigate();

  const statusColors = {
    'Working on it': 'bg-orange-500',
    'Done': 'bg-green-500',
    'Stuck': 'bg-red-500',
    'Not started': 'bg-gray-400'
  };

  const people = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown'];

  // Logo component (since we can't import external images in artifacts)
  const SybeezLogo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white text-sm font-bold"><img src="/sybeez.png" alt="Sybeez Logo" /></span>
      </div>
      <span className="font-semibold text-gray-800">Sybeez</span>
    </div>
  );
  const addTask = (group = 'todo') => {
    if (newTaskName.trim()) {
      const newTask = {
        id: Date.now(),
        name: newTaskName,
        owner: 'Unassigned',
        status: 'Not started',
        dueDate: new Date().toISOString().split('T')[0],
        group: group, // Use the passed group parameter
        priority: 'Medium',
        notes: ''
      };
      setTasks([...tasks, newTask]);
      setNewTaskName('');
      // setShowNewTaskInput(false);
      setShowNewTaskInputForGroup(null);
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const updateTaskOwner = (taskId, newOwner) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, owner: newOwner } : task
    ));
  };

  const updateTaskName = (taskId, newName) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, name: newName } : task
    ));
    setEditingTask(null);
  };

  const updateTaskDate = (taskId, newDate) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, dueDate: newDate } : task
    ));
  };

  const updateTaskPriority = (taskId, newPriority) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, priority: newPriority } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const duplicateTask = (taskId) => {
    const taskToDuplicate = tasks.find(task => task.id === taskId);
    if (taskToDuplicate) {
      const duplicatedTask = {
        ...taskToDuplicate,
        id: Date.now(),
        name: `${taskToDuplicate.name} (Copy)`,
        status: 'Not started'
      };
      setTasks([...tasks, duplicatedTask]);
    }
  };

  // Enhanced filtering and sorting
  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatusFilter = filterStatus === 'All' || task.status === filterStatus;
      const matchesPersonFilter = filterPerson === 'All' || task.owner === filterPerson;
      return matchesSearch && matchesStatusFilter && matchesPersonFilter;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'dueDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const todoTasks = filteredAndSortedTasks.filter(task => task.group === 'todo' && task.status !== 'Done');
  const completedTasks = filteredAndSortedTasks.filter(task => task.group === 'completed' || task.status === 'Done');

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'No date') return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dateString) => {
    if (!dateString || dateString === 'No date') return false;
    const today = new Date();
    const dueDate = new Date(dateString);
    return dueDate < today;
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleColumnVisibility = (column) => {
    setHiddenColumns(prev => 
      prev.includes(column) 
        ? prev.filter(col => col !== column)
        : [...prev, column]
    );
  };

  const selectAllTasks = () => {
    if (selectedTasks.length === todoTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(todoTasks.map(task => task.id));
    }
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  // Group
  const addNewGroup = () => {
    const newGroupId = `group-${Date.now()}`;
    const colors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newGroup = {
      id: newGroupId,
      name: 'New Group',
      color: randomColor
    };
    setGroups([...groups, newGroup]);
  };
  
  const updateGroupName = (groupId, newName) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, name: newName } : group
    ));
  };
  
  const deleteGroup = (groupId) => {
    if (groupId === 'todo' || groupId === 'completed') return; // Prevent deleting default groups
    setGroups(groups.filter(group => group.id !== groupId));
    // Also remove tasks from this group
    setTasks(tasks.map(task => 
      task.group === groupId ? { ...task, group: 'todo' } : task
    ));
  };
  
  const addCustomColumn = () => {
    if (newColumnName.trim()) {
      const newColumn = {
        id: `col-${Date.now()}`,
        name: newColumnName,
        type: newColumnType
      };
      setCustomColumns([...customColumns, newColumn]);
      setNewColumnName('');
      setNewColumnType('text');
      setShowAddColumnModal(false);
    }
  };
  
  const deleteCustomColumn = (columnId) => {
    setCustomColumns(customColumns.filter(col => col.id !== columnId));
  };

  // Modal components
  const SidekickModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Sidekick AI Assistant
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
          </div>
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
              <div className="font-medium text-sm">Smart Task Suggestions</div>
              <div className="text-xs text-gray-500">Get AI-powered task recommendations</div>
            </div>
            <div className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
              <div className="font-medium text-sm">Deadline Analysis</div>
              <div className="text-xs text-gray-500">Analyze project timeline and risks</div>
            </div>
            <div className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
              <div className="font-medium text-sm">Team Workload Balance</div>
              <div className="text-xs text-gray-500">Optimize task distribution</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const IntegrationsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-500" />
              Integrations
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
          </div>
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded mr-3 flex items-center justify-center">📧</div>
              <div>
                <div className="font-medium text-sm">Email Integration</div>
                <div className="text-xs text-gray-500">Sync with Gmail, Outlook</div>
              </div>
            </div>
            <div className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded mr-3 flex items-center justify-center">💼</div>
              <div>
                <div className="font-medium text-sm">Slack Integration</div>
                <div className="text-xs text-gray-500">Connect with your team</div>
              </div>
            </div>
            <div className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded mr-3 flex items-center justify-center">🔗</div>
              <div>
                <div className="font-medium text-sm">API Integration</div>
                <div className="text-xs text-gray-500">Custom integrations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AutomationsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-500" />
              Automations
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
          </div>
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
              <div className="font-medium text-sm">Auto-assign Tasks</div>
              <div className="text-xs text-gray-500">Automatically assign based on workload</div>
            </div>
            <div className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
              <div className="font-medium text-sm">Status Updates</div>
              <div className="text-xs text-gray-500">Auto-update status based on conditions</div>
            </div>
            <div className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
              <div className="font-medium text-sm">Deadline Reminders</div>
              <div className="text-xs text-gray-500">Send automatic notifications</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddColumnModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Add New Column</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Column Name</label>
              <input
                type="text"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Enter column name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Column Type</label>
              <select
                value={newColumnType}
                onChange={(e) => setNewColumnType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="select">Dropdown</option>
                <option value="checkbox">Checkbox</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={addCustomColumn}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Add Column
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SybeezLogo />
            <button className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors">
              See plans
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
            <div className="relative cursor-pointer">
              <div className="w-1 h-1 bg-red-500 rounded-full absolute -top-1 -right-1"></div>
              <MessageCircle className="w-5 h-5 text-gray-600 hover:text-gray-800" />
            </div>
            <Users className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
            <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
            <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
            <HelpCircle className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
            <Grid3X3 className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 h-screen">
          <div className="p-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <Home className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-800">Home</span>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <Briefcase className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-800">My work</span>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-800">More</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500 uppercase tracking-wide">Favorites</span>
              </div>
              
              <div className="mt-4">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Workspaces</span>
                <div className="flex items-center space-x-2 mt-2 p-2 bg-purple-50 rounded">
                  <div className="w-6 h-6 bg-purple-500 rounded text-white text-xs flex items-center justify-center">M</div>
                  <span className="text-sm text-gray-800">Main workspace</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                </div>
                
                <div className="ml-8 mt-2 space-y-1">
                  <div className="flex items-center space-x-2 p-1 bg-purple-100 rounded">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-purple-800">My Project</span>
                  </div>
                  <div className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded cursor-pointer">
                    <div className="w-4 h-4 bg-gray-300 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-white"></div>
                    </div>
                    <span className="text-sm text-gray-600">Dashboard and reporting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Board Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-gray-800">My Project</h1>
                <Star className="w-5 h-5 text-gray-400 cursor-pointer hover:text-yellow-500" />
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowSidekick(true)}
                  className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition-colors flex items-center space-x-1"
                >
                  <Zap className="w-4 h-4" />
                  <span>Sidekick</span>
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition-colors">
                  Enhance
                </button>
                <button 
                  onClick={() => setShowIntegrations(true)}
                  className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition-colors"
                >
                  Integrate
                </button>
                <button 
                  onClick={() => setShowAutomations(true)}
                  className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition-colors"
                >
                  Automate
                </button>
                <button className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors">
                  Invite / 1
                </button>
                <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <span className="text-sm font-medium text-gray-600 border-b-2 border-purple-500 pb-1">Main table</span>
              <Plus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>

            {/* Enhanced Controls */}
            <div className="flex items-center space-x-2 mb-4 flex-wrap">
              <button 
                onClick={() =>{
                  setActiveGroupForNewTask('todo');
                  setShowNewTaskInputForGroup('todo');
                }}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>New task</span>
              </button>
              
              <div className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="outline-none text-sm w-32"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative">
                <select 
                  value={filterPerson}
                  onChange={(e) => setFilterPerson(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 outline-none appearance-none pr-8"
                >
                  <option value="All">All People</option>
                  {people.map(person => (
                    <option key={person} value={person}>{person}</option>
                  ))}
                </select>
                <User className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>

              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 outline-none"
              >
                <option value="All">All Status</option>
                <option value="Not started">Not started</option>
                <option value="Working on it">Working on it</option>
                <option value="Done">Done</option>
                <option value="Stuck">Stuck</option>
              </select>

              <div className="relative">
                <select 
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 outline-none appearance-none pr-8"
                >
                  <option value="name-asc">Sort A→Z</option>
                  <option value="name-desc">Sort Z→A</option>
                  <option value="dueDate-asc">Due Date ↑</option>
                  <option value="dueDate-desc">Due Date ↓</option>
                  <option value="priority-asc">Priority ↑</option>
                  <option value="priority-desc">Priority ↓</option>
                </select>
                <Filter className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative">
                <button className="px-3 py-2 border border-gray-300 rounded flex items-center space-x-1 hover:bg-gray-50 text-sm">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Hide</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>
              </div>

              <select 
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 outline-none"
              >
                <option value="status">Group by Status</option>
                <option value="owner">Group by Owner</option>
                <option value="priority">Group by Priority</option>
                <option value="none">No Grouping</option>
              </select>
            </div>

            {/* Selection Actions */}
            {selectedTasks.length > 0 && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4 flex items-center justify-between">
                <span className="text-sm text-purple-700">{selectedTasks.length} tasks selected</span>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-white border border-purple-300 rounded text-sm hover:bg-purple-50 flex items-center space-x-1">
                    <Copy className="w-3 h-3" />
                    <span>Duplicate</span>
                  </button>
                  <button className="px-3 py-1 bg-white border border-purple-300 rounded text-sm hover:bg-purple-50 flex items-center space-x-1">
                    <Archive className="w-3 h-3" />
                    <span>Archive</span>
                  </button>
                  <button className="px-3 py-1 bg-white border border-purple-300 rounded text-sm hover:bg-purple-50 flex items-center space-x-1">
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* To-Do Section */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-l-4 border-blue-500">
              <div className="p-4 bg-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ChevronDown className="w-4 h-4 text-blue-600 cursor-pointer" />
                    <h2 className="font-semibold text-blue-800">To-Do</h2>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{todoTasks.length}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Plus className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
                <div className="col-span-1 flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded"
                    checked={selectedTasks.length === todoTasks.length && todoTasks.length > 0}
                    onChange={selectAllTasks}
                  />
                </div>
                <div className="col-span-3">Task</div>
                <div className="col-span-2">Owner</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Priority</div>
                <div className="col-span-2">Due date</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Show empty state or tasks */}
              {todoTasks.length === 0 && !showNewTaskInput ? (
                <div className="p-8 text-center">
                  <div className="text-gray-400 text-lg mb-2">🚀</div>
                  <h3 className="text-gray-600 font-medium mb-2">Ready to get started?</h3>
                  <p className="text-gray-500 text-sm mb-4">Create your first task to begin managing your project</p>
                  <button 
                    onClick={() => {
                      setActiveGroupForNewTask('todo');
                      setShowNewTaskInputForGroup('todo');
                    }}
                    className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create first task</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* Task Rows */}
                  {todoTasks.map((task) => (
                    <div key={task.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 group">
                      <div className="col-span-1 flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded"
                          checked={selectedTasks.includes(task.id)}
                          onChange={() => toggleTaskSelection(task.id)}
                        />
                      </div>
                      <div className="col-span-3 flex items-center space-x-2">
                        {editingTask === task.id ? (
                          <input
                            type="text"
                            value={task.name}
                            onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? {...t, name: e.target.value} : t))}
                            onBlur={() => setEditingTask(null)}
                            onKeyPress={(e) => e.key === 'Enter' && setEditingTask(null)}
                            className="text-sm border border-gray-300 rounded px-2 py-1 outline-none focus:border-purple-500"
                            autoFocus
                          />
                        ) : (
                          <span 
                            className="text-sm text-gray-800 cursor-pointer hover:text-purple-600"
                            onClick={() => setEditingTask(task.id)}
                          >
                            {task.name}
                          </span>
                        )}
                        <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
                          <button 
                            onClick={() => duplicateTask(task.id)}
                            className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200"
                            title="Duplicate task"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200">
                            <MoreHorizontal className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                            {task.owner !== 'Unassigned' ? (
                              <span className="text-xs text-gray-600">{task.owner.charAt(0)}</span>
                            ) : (
                              <User className="w-3 h-3 text-gray-600" />
                            )}
                          </div>
                          <select 
                            value={task.owner}
                            onChange={(e) => updateTaskOwner(task.id, e.target.value)}
                            className="text-sm border-none outline-none bg-transparent cursor-pointer"
                          >
                            <option>Unassigned</option>
                            {people.map(person => (
                              <option key={person} value={person}>{person}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <select 
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                          className={`px-3 py-1 rounded text-white text-sm border-none outline-none ${statusColors[task.status]} cursor-pointer`}
                        >
                          <option value="Not started">Not started</option>
                          <option value="Working on it">Working on it</option>
                          <option value="Done">Done</option>
                          <option value="Stuck">Stuck</option>
                        </select>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <select
                          value={task.priority}
                          onChange={(e) => updateTaskPriority(task.id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs border-none outline-none cursor-pointer ${getPriorityColor(task.priority)}`}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <div className="flex items-center space-x-2">
                          {isOverdue(task.dueDate) && <AlertCircle className="w-4 h-4 text-red-500" />}
                          <input
                            type="date"
                            value={task.dueDate || ''}
                            onChange={(e) => updateTaskDate(task.id, e.target.value)}
                            className="text-sm text-gray-600 border-none outline-none bg-transparent cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="col-span-1 flex items-center space-x-1">
                        <button 
                          onClick={() => deleteTask(task.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 rounded"
                          title="Delete task"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Add Task Row for todo*/}
              {showNewTaskInputForGroup == 'todo'  && (
                <div className="grid grid-cols-12 gap-4 p-4 border-b bg-blue-50">
                  <div className="col-span-1"></div>
                  <div className="col-span-3">
                  <form onSubmit={(e) => {
        e.preventDefault();
        addTask(activeGroupForNewTask);
      }}>
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.preventDefault();
              setShowNewTaskInput(false);
              setNewTaskName('');
            }
          }}
                      placeholder="Enter task name..."
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm outline-none focus:border-purple-500"
                      autoFocus
                    />
                    </form>
                  </div>
                  <div className="col-span-7 flex items-center space-x-2">
                    <button 
                      onClick={() => addTask(activeGroupForNewTask)}
                      className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                    >
                      Add Task
                    </button>
                    <button 
                      onClick={() => {setShowNewTaskInput(false); setNewTaskName('');}}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Add task button - only show if there are existing tasks */}
              {todoTasks.length > 0 && !showNewTaskInput && (
                <div className="grid grid-cols-12 gap-4 p-4">
                  <div className="col-span-1"></div>
                  <div className="col-span-11">
                    <button 
                      onClick={() => {
                        setActiveGroupForNewTask('todo');
                        setShowNewTaskInputForGroup('todo');
                      }}
                      className="flex items-center space-x-2 text-purple-500 hover:text-purple-700 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add task</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Completed Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-l-4 border-green-500">
              <div className="p-4 bg-green-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ChevronDown className="w-4 h-4 text-green-600 cursor-pointer" />
                    <h2 className="font-semibold text-green-800">Completed</h2>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">{completedTasks.length}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-green-600 hover:text-green-800">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
                <div className="col-span-1"></div>
                <div className="col-span-3">Task</div>
                <div className="col-span-2">Owner</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Priority</div>
                <div className="col-span-2">Due date</div>
                <div className="col-span-1">Actions</div>
              </div>

              {completedTasks.length === 0 ? (
                <div className="p-6 text-center text-gray-500 text-sm">
                  <div className="text-gray-300 text-lg mb-2">✅</div>
                  <p>Completed tasks will appear here</p>
                </div>
              ) : (
                completedTasks.map((task) => (
                  <div key={task.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 opacity-60 group">
                    <div className="col-span-1 flex items-center">
                      <input 
                        type="checkbox" 
                        checked 
                        className="rounded"
                        onChange={(e) => {
                          if (!e.target.checked) {
                            updateTaskStatus(task.id, 'Not started');
                          }
                        }}
                      />
                    </div>
                    <div className="col-span-3 flex items-center">
                      <span className="text-sm text-gray-600 line-through">{task.name}</span>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          {task.owner !== 'Unassigned' ? (
                            <span className="text-xs text-gray-600">{task.owner.charAt(0)}</span>
                          ) : (
                            <User className="w-3 h-3 text-gray-600" />
                          )}
                        </div>
                        <span className="text-sm text-gray-600">{task.owner}</span>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <span className={`px-3 py-1 rounded text-white text-sm ${statusColors[task.status]}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <span className="text-sm text-gray-600">{formatDate(task.dueDate)}</span>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 rounded"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Add New Group */}
         {/* <div className="mt-6">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-600">
              <Plus className="w-4 h-4" />
              <span>Add new group</span>
            </button>
          </div> */}

          

          {/* Custom Groups */}
{groups.filter(group => !['todo', 'completed'].includes(group.id)).map((group) => {
  const groupTasks = filteredAndSortedTasks.filter(task => task.group === group.id);
  const groupColor = `border-${group.color}-500 bg-${group.color}-50 text-${group.color}-800`;
  
  return (
    <div key={group.id} className="bg-white rounded-lg shadow-sm mt-6">
      <div className={`border-l-4 border-${group.color}-500`}>
        <div className={`p-4 bg-${group.color}-50`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChevronDown className={`w-4 h-4 text-${group.color}-600 cursor-pointer`} />
              <input
                type="text"
                value={group.name}
                onChange={(e) => updateGroupName(group.id, e.target.value)}
                className={`font-semibold bg-transparent border-none outline-none focus:ring-1 focus:ring-${group.color}-500 rounded px-1`}
              />
              <span className={`text-xs text-${group.color}-600 bg-${group.color}-100 px-2 py-1 rounded`}>
                {groupTasks.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => deleteGroup(group.id)}
                className={`text-${group.color}-600 hover:text-${group.color}-800`}
                title="Delete group"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button className={`text-${group.color}-600 hover:text-${group.color}-800`}>
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
          <div className="col-span-1 flex items-center">
            <input 
              type="checkbox" 
              className="rounded"
            />
          </div>
          <div className="col-span-3">Task</div>
          <div className="col-span-2">Owner</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Priority</div>
          <div className="col-span-2">Due date</div>
          {/* Custom Columns */}
          {customColumns.map(column => (
            <div key={column.id} className="col-span-1 flex items-center justify-between">
              <span>{column.name}</span>
              <button 
                onClick={() => deleteCustomColumn(column.id)}
                className="text-gray-400 hover:text-gray-600 ml-1"
                title="Remove column"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
          <div className="col-span-1">Actions</div>
        </div>

        {/* Add Task Row for custom group*/}
        {showNewTaskInputForGroup == group.id  && (
                <div className="grid grid-cols-12 gap-4 p-4 border-b bg-blue-50">
                  <div className="col-span-1"></div>
                  <div className="col-span-3">
                  <form onSubmit={(e) => {
        e.preventDefault();
        addTask(activeGroupForNewTask);
      }}>
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.preventDefault();
              setShowNewTaskInput(false);
              setNewTaskName('');
            }
          }}
                      placeholder="Enter task name..."
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm outline-none focus:border-purple-500"
                      autoFocus
                    />
                    </form>
                  </div>
                  <div className="col-span-7 flex items-center space-x-2">
                    <button 
                      onClick={() => addTask(activeGroupForNewTask)}
                      className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                    >
                      Add Task
                    </button>
                    <button 
                      onClick={() => {setShowNewTaskInput(false); setNewTaskName('');}}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

        {groupTasks.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 text-lg mb-2">📁</div>
            <h3 className="text-gray-600 font-medium mb-2">Empty group</h3>
            <p className="text-gray-500 text-sm mb-4">Add tasks to this group to get started</p>
            <button 
              onClick={() => {
                setActiveGroupForNewTask(group.id);
                setShowNewTaskInputForGroup(group.id);
              }}
              className={`px-6 py-2 bg-${group.color}-500 text-white rounded hover:bg-${group.color}-600 transition-colors flex items-center space-x-2 mx-auto`}
            >
              <Plus className="w-4 h-4" />
              <span>Add task to group</span>
            </button>
          </div>
        ) : (

          // groupTasks.map((task) => (
          //   <div key={task.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 group">
          //     {/* Task row content (same as To-Do section) */}
          //     {/* ... copy the task row structure from the To-Do section ... */}
          //   </div>
          // ))

          ////////////////////////////////////////

          // Update the task rows in custom groups to use the correct structure
groupTasks.map((task) => (
  <div key={task.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 group">
    <div className="col-span-1 flex items-center">
      <input 
        type="checkbox" 
        className="rounded"
        checked={selectedTasks.includes(task.id)}
        onChange={() => toggleTaskSelection(task.id)}
      />
    </div>
    <div className="col-span-3 flex items-center space-x-2">
      {editingTask === task.id ? (
        <input
          type="text"
          value={task.name}
          onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? {...t, name: e.target.value} : t))}
          onBlur={() => setEditingTask(null)}
          onKeyPress={(e) => e.key === 'Enter' && setEditingTask(null)}
          className="text-sm border border-gray-300 rounded px-2 py-1 outline-none focus:border-purple-500"
          autoFocus
        />
      ) : (
        <span 
          className="text-sm text-gray-800 cursor-pointer hover:text-purple-600"
          onClick={() => setEditingTask(task.id)}
        >
          {task.name}
        </span>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
        <button 
          onClick={() => duplicateTask(task.id)}
          className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200"
          title="Duplicate task"
        >
          <Copy className="w-3 h-3" />
        </button>
        <button className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200">
          <MoreHorizontal className="w-3 h-3" />
        </button>
      </div>
    </div>
    <div className="col-span-2 flex items-center">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          {task.owner !== 'Unassigned' ? (
            <span className="text-xs text-gray-600">{task.owner.charAt(0)}</span>
          ) : (
            <User className="w-3 h-3 text-gray-600" />
          )}
        </div>
        <select 
          value={task.owner}
          onChange={(e) => updateTaskOwner(task.id, e.target.value)}
          className="text-sm border-none outline-none bg-transparent cursor-pointer"
        >
          <option>Unassigned</option>
          {people.map(person => (
            <option key={person} value={person}>{person}</option>
          ))}
        </select>
      </div>
    </div>
    <div className="col-span-2 flex items-center">
      <select 
        value={task.status}
        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
        className={`px-3 py-1 rounded text-white text-sm border-none outline-none ${statusColors[task.status]} cursor-pointer`}
      >
        <option value="Not started">Not started</option>
        <option value="Working on it">Working on it</option>
        <option value="Done">Done</option>
        <option value="Stuck">Stuck</option>
      </select>
    </div>
    <div className="col-span-1 flex items-center">
      <select
        value={task.priority}
        onChange={(e) => updateTaskPriority(task.id, e.target.value)}
        className={`px-2 py-1 rounded text-xs border-none outline-none cursor-pointer ${getPriorityColor(task.priority)}`}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
    <div className="col-span-2 flex items-center">
      <div className="flex items-center space-x-2">
        {isOverdue(task.dueDate) && <AlertCircle className="w-4 h-4 text-red-500" />}
        <input
          type="date"
          value={task.dueDate || ''}
          onChange={(e) => updateTaskDate(task.id, e.target.value)}
          className="text-sm text-gray-600 border-none outline-none bg-transparent cursor-pointer"
        />
      </div>
    </div>
    <div className="col-span-1 flex items-center space-x-1">
      <button 
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 rounded"
        title="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
)
)

///////////////////


        )}

        {/* Add task button */}
        <div className="grid grid-cols-12 gap-4 p-4">
          <div className="col-span-1"></div>
          <div className="col-span-11">
            <button 
              onClick={() => {
                setActiveGroupForNewTask(group.id);
                setShowNewTaskInputForGroup(group.id);
              }}
              className="flex items-center space-x-2 text-purple-500 hover:text-purple-700 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add task</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
})}

{/* Add New Group and Column Buttons */}
<div className="mt-6 flex space-x-2">
            <button 
              onClick={addNewGroup}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-600"
            >
              <Plus className="w-4 h-4" />
              <span>Add new group</span>
            </button>
            {/* <button 
              onClick={() => setShowAddColumnModal(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-600"
            >
              <Plus className="w-4 h-4" />
              <span>Add column</span>
            </button> */}
          </div>

        </div>


      </div>

      {/* Modals */}
      <SidekickModal isOpen={showSidekick} onClose={() => setShowSidekick(false)} />
      <IntegrationsModal isOpen={showIntegrations} onClose={() => setShowIntegrations(false)} />
      <AutomationsModal isOpen={showAutomations} onClose={() => setShowAutomations(false)} />
      {/* <AddColumnModal isOpen={showAddColumnModal} onClose={() => setShowAddColumnModal(false)} /> */}

      {/* Help Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-purple-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-600 transition-colors flex items-center space-x-2">
          <HelpCircle className="w-4 h-4" />
          <span>Help</span>
        </button>
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Aug 14 - 28</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-6 h-3 bg-orange-400 rounded-sm" title="Working on it"></div>
                <div className="w-6 h-3 bg-green-500 rounded-sm" title="Done"></div>
                <div className="w-6 h-3 bg-red-500 rounded-sm" title="Stuck"></div>
              </div>
              <span className="text-xs">Status overview</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span>{tasks.length} total tasks</span>
            <span>•</span>
            <span>{completedTasks.length} completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupStep9;