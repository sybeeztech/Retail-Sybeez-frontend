import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  NavLink, 
  Link
} from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Building, Calendar, CalendarCheck2, CalendarDays, ChartNoAxesColumn, FileChartColumnIncreasing, FileUser, HandCoins, LayoutDashboard, ScrollText, TreePalm, User, Users } from 'lucide-react';

function Sidebar() {
  const { user } = useAuthStore();

  return (
    <div className="w-58 h-screen fixed bg-blue-700 text-white  flex flex-col">
      {/* Title */}
      <div className="flex-shrink-0 p-4">
      <h1 className="text-2xl font-bold mb-6">HRMS</h1>
      <p className="mb-6 text-sm text-blue-200">Human Resource Management</p>
      </div>

      {/* Scrollable navigation container */}
      <div className="flex-1 overflow-y-auto sidebar-scroll">
      <nav className=""> 
      {/* space-y-2 */}
        <NavLink to="/" 
        className={({ isActive }) => 
          `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
        }>
          {/* <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-layout-dashboard-icon lucide-layout-dashboard mr-4"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> */}
          <LayoutDashboard className="w-6 h-6 mr-4" />
          Dashboard
        </NavLink>
        <NavLink
          to={`/my-profile`}
          className={({ isActive }) => 
            `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
          }>    
          {/* <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-icon lucide-user mr-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>     */}
          <User className="w-6 h-6 mr-4" />
          My Profile
        </NavLink>
        <NavLink
          to="/employees"
          end // This makes it match exactly
          className={({ isActive }) => 
            `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
          }>    
          {/* <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-icon lucide-user mr-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>     */}
          <Users className="w-6 h-6 mr-4" />
          Employee Directory
        </NavLink>
        <NavLink
          to="/departments"
          className={({ isActive }) => 
            `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
          }>        
          {/* <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-building-icon lucide-building mr-4"><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M12 6h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/><path d="M8 6h.01"/><path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/><rect x="4" y="2" width="16" height="20" rx="2"/></svg> */}
          <Building className="w-6 h-6 mr-4" />
          Departments
        </NavLink>
        <NavLink to="/payroll" 
        className={({ isActive }) => 
          `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
        }>
          {/* <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-hand-coins-icon lucide-hand-coins mr-4"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg> */}
          <HandCoins className="w-6 h-6 mr-4" />
          Payroll
        </NavLink>

        

        {/* Attendance Section */}
        <div className="mt-6">
          <h2 className=" text-xs uppercase text-blue-300 mb-2 px-2">Attendance</h2>
          <NavLink
            to="/attendance/daily"
            className={({ isActive }) => 
              `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
            }>          
            {/* <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-icon lucide-calendar mr-4"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg> */}
            <Calendar className="w-6 h-6 mr-4" />
            Daily Attendance
          </NavLink>

          
          {['manager', 'admin', 'super_admin'].includes(user?.employee?.role) && (
            <NavLink 
              to="/attendance/analytics" 
              className={({ isActive }) => 
                `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
              }>
              <ChartNoAxesColumn className="w-6 h-6 mr-4" />
              Analytics
            </NavLink>
          )}
          
        </div>

        {/* Leave Section */}
        <div className="mt-6">
          <h2 className=" text-xs uppercase text-blue-300 mb-2 px-2">Leave Management</h2>
          <NavLink
            to="/leave-dashboard"
            className={({ isActive }) => 
              `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
            }>          
            {/* <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-icon lucide-calendar mr-4"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg> */}
            <Calendar className="w-6 h-6 mr-4" />
            Leave Dashboard
          </NavLink>
          <NavLink
            to="/leave/applications"
            className={({ isActive }) => 
              `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
            }>
            {/* <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chart-no-axes-column-icon lucide-chart-no-axes-column mr-4"><path d="M5 21v-6"/><path d="M12 21V3"/><path d="M19 21V9"/></svg>           */}
             
            <FileUser className="w-6 h-6 mr-4" />
            Leave Applications
          </NavLink>
          {['manager', 'admin', 'super_admin'].includes(user?.employee?.role) && (
            <NavLink 
              to="/leave/team-calendar" 
              className={({ isActive }) => 
                `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
              }>
              <CalendarDays className="w-6 h-6 mr-4" />
              Team Calendar
            </NavLink>
          )}
          {['manager', 'admin', 'super_admin'].includes(user?.employee?.role) && (
            <NavLink 
              to="/leave/approval" 
              className={({ isActive }) => 
                `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
              }>
              <CalendarCheck2 className="w-6 h-6 mr-4" />
              Leave Approvals
            </NavLink>
          )}
          {['admin', 'super_admin'].includes(user?.employee?.role) && (
            <NavLink 
              to="/leave/policies" 
              className={({ isActive }) => 
                `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
              }>
              <ScrollText className="w-6 h-6 mr-4" />
              Leave Policies
            </NavLink>
          )}
          {['admin', 'super_admin'].includes(user?.employee?.role) && (
            <NavLink 
              to="/leave/holiday-management" 
              className={({ isActive }) => 
                `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
              }>
              <TreePalm className="w-6 h-6 mr-4" />
              Manage Holidays
            </NavLink>
          )}
          {['manager', 'admin', 'super_admin'].includes(user?.employee?.role) && (
            <NavLink 
              to="/leave/reports" 
              className={({ isActive }) => 
                `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
              }>
              <FileChartColumnIncreasing className="w-6 h-6 mr-4" />
              Leave Reports
            </NavLink>
          )}
          
        </div>

        {/* Performance Section */}
        {/* <div className="mt-6">
          <h2 className="text-sm uppercase text-blue-300 mb-2">Performance</h2>
          <Link
            to="/performance/goals"
            className="block hover:bg-blue-600 p-2 rounded"
          >
            Goals
          </Link>
          <Link
            to="/performance/reviews"
            className="block hover:bg-blue-600 p-2 rounded"
          >
            Reviews
          </Link>
          <Link
            to="/performance/feedback"
            className="block hover:bg-blue-600 p-2 rounded"
          >
            Feedback
          </Link>
          <Link
            to="/performance/analytics"
            className="block hover:bg-blue-600 p-2 rounded"
          >
            Analytics
          </Link>
        </div> */}


        
      </nav>
      </div>


      {/* Fixed Support Section at the bottom */}
      <div className="flex-shrink-0 pt-4 border-t border-blue-600">
        <h2 className="text-xs uppercase text-blue-300 mb-2 px-2">Support</h2>
        
        <NavLink
          to="/help/employee-helpdesk"
          className={({ isActive }) => 
            `flex  items-center px-5 py-3  ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
          }>          
          <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-life-buoy-icon lucide-life-buoy mr-4"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>
          Employee Helpdesk
        </NavLink>
        
        <NavLink
          to="/help/vendor-support"
          className={({ isActive }) => 
            `flex  items-center px-5 py-3 ${isActive ? 'bg-white text-blue-800' : 'hover:bg-blue-600'}`
          }>          
          <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-info-icon lucide-info mr-4"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          Vendor Support
        </NavLink>
      </div>


    </div>
  );
}

export default Sidebar;