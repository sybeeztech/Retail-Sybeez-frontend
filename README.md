# Integrated Business Management System

A comprehensive React application that integrates Human Resources Management (HRM), Enterprise Resource Planning (ERP), and Finance management into a single unified platform.

## Features

### 🏢 Human Resources Management (HRM)
- **Employee Management**: Complete employee directory with profiles and management
- **Attendance Tracking**: Daily attendance monitoring and analytics
- **Leave Management**: Leave applications, approvals, and calendar
- **Payroll System**: Employee payroll management and processing
- **Department Management**: Organizational structure and department oversight
- **Performance Management**: Goals, reviews, and feedback systems

### 📦 Supply Chain Management (ERP)
- **Order Management**: Customer order processing and tracking
- **Inventory Control**: Stock management and tracking
- **Customer Management**: Customer relationship management
- **Supplier Management**: Supplier relationships and procurement
- **Delivery Tracking**: Real-time delivery and logistics tracking
- **Analytics & Reporting**: Supply chain insights and metrics

### 💰 Finance Management
- **Income Tracking**: Revenue sources and income management
- **Expense Management**: Business expense tracking and categorization
- **Invoicing**: Professional invoice generation and management
- **Bank Account Management**: Multi-account financial tracking
- **Tax Management**: Tax calculations and compliance
- **Budget Planning**: Financial planning and budget management
- **Financial Reporting**: Comprehensive financial analytics

## Technology Stack

- **Frontend**: React 19.1.1 with Vite
- **Routing**: React Router DOM 7.9.1
- **State Management**: Zustand 5.0.8
- **Styling**: Tailwind CSS 4.1.17
- **Icons**: Lucide React 0.544.0
- **Charts**: Recharts 3.2.1 & Chart.js 4.5.0
- **Mock API**: MirageJS 0.1.48
- **HTTP Client**: Axios 1.12.2

## Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd integrated-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

### Login Credentials

The application includes demo login options:

- **Admin User**: 
  - Username: `admin`
  - Password: `admin123`
  - Access: Full system access

- **Manager User**:
  - Username: `manager`
  - Password: `manager123`
  - Access: Limited management features

- **Employee User**:
  - Username: `employee`
  - Password: `employee123`
  - Access: Basic employee features

## Project Structure

```
integrated-app/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── Dashboard/
│   │   │   └── MainDashboard.jsx
│   │   ├── HRM/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EmployeeDirectory.jsx
│   │   │   └── MyProfile.jsx
│   │   ├── ERP/
│   │   │   └── Dashboard.jsx
│   │   ├── Finance/
│   │   │   └── Dashboard.jsx
│   │   ├── Layout/
│   │   │   ├── Sidebar.jsx
│   │   │   └── TopBar.jsx
│   │   └── PlaceholderComponents.jsx
│   ├── store/
│   │   └── authStore.js
│   ├── mirage/
│   │   └── server.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── index.html
```

## Navigation

The application features a modern sidebar navigation with expandable sections:

- **Main Dashboard**: Overview of all modules
- **Human Resources**: Employee management and HR functions
- **Supply Chain**: ERP and logistics management  
- **Finance**: Financial management and reporting

## Development Features

### Authentication System
- Secure login with role-based access control
- Protected routes based on user permissions
- Persistent authentication state

### Responsive Design
- Mobile-friendly interface
- Adaptive sidebar navigation
- Responsive grid layouts

### Mock Data
- MirageJS integration for development
- Realistic sample data
- API simulation for testing

## Build Commands

- **Development**: `npm run dev` - Start development server
- **Build**: `npm run build` - Create production build
- **Preview**: `npm run preview` - Preview production build
- **Lint**: `npm run lint` - Run ESLint

## Future Enhancements

1. **Real API Integration**: Replace MirageJS with actual backend APIs
2. **Advanced Reporting**: Enhanced analytics and reporting capabilities
3. **Mobile Application**: React Native companion app
4. **Real-time Features**: WebSocket integration for real-time updates
5. **Document Management**: File upload and document handling
6. **Advanced Permissions**: Granular role-based access control

## Contributing

This integrated application serves as a foundation for business management systems. Key areas for contribution:

1. **Component Development**: Implementing full functionality for placeholder components
2. **API Integration**: Connecting to real backend services
3. **Testing**: Adding comprehensive test coverage
4. **Performance**: Optimizing application performance
5. **UI/UX**: Enhancing user interface and experience

## License

This project is part of a business management system integration and is intended for educational and development purposes.

---

**Note**: This application currently uses placeholder components for many features. The core architecture and routing are complete, providing a solid foundation for implementing full business management functionality.# Retail-Sybeez-frontend

## Step by step setup pages update with logout function
1. After login, if the setup steps data is null, then it shows the step by step setup pages, and finally retail erp dashboard
2. The setup data is stored in store/setupStore, currently it just stores the setup data, not doing anything with it.
3. If the setup steps data is already there, then after login directly go to retail erp dashboard
4. Added Logout functionality by removing 'auth-storage' item in local storage
5. To check this functionality, after login for first time and setup steps. Then logout, and login again. It will not show the setup steps again.
6. This should be properly handled when implemented backend (we should check setup data available for each user).
7. Removed sidebar and topbar components from Login and setup pages, it will only after login and setup.

## HRM Update:
1. Added missing functionalities for Employees and Attendance section frontend (without integrating mirage)
2. Completed Payroll section frontend with functionalities with integrating mirage
3. To use Payroll, first go to login page '/login' in Url. Then login with the email **john.doe@company.com** instead of username, for the demo data to load in local storage. Password can be any.
4. Because Payroll data is integrated with mirage and retrieving with help of local storage, it has to be done like this. This should be changed while implementing backend.

