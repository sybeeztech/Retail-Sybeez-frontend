// HRMData.js - Initial data for Zustand stores

export const HRMData = {
    // Employees data
    employees: [
      {
        id: 1,
        firstName: 'Rahul',
        lastName: 'Sharma',
        gender: 'male',
        email: 'rahul.sharma@example.com',
        phone: '+91 9876543210',
        address: '123 MG Road, Bangalore, Karnataka 560001',
        aadharNumber: '123456789012',
        panNumber: 'ABCDE1234F',
        officialEmail: 'rahul.sharma@company.com',
        position: 'Software Engineer',
        designation: 'Senior Software Engineer',
        department: 'Engineering',
        reportingManager: 'Priya Patel',
        startDate: '2025-09-15',
        ctc: 1200000,
        basicSalary: 600000,
        hra: 240000,
        location: 'Bangalore',
        pan: 'ABCDE1234F',
        uan: '123456789012',
        experienceYears: 8,
        sourceOfHire: 'Referral',
        education: [
          {
            institute: 'Indian Institute of Management',
            degree: 'MBA',
            field: 'Finance',
            completionDate: '2015-05-15'
          },
          {
            institute: 'University of Delhi',
            degree: 'B.Com',
            field: 'Commerce',
            completionDate: '2013-04-20'
          }
        ],
        experience: [
          {
            occupation: 'Senior Financial Analyst',
            company: 'ABC Corporation',
            duration: '2018-2022'
          },
          {
            occupation: 'Financial Analyst',
            company: 'XYZ Ltd',
            duration: '2015-2018'
          }
        ],
        active: true,
        bankName: 'HDFC Bank',
        accountNumber: '12345678901234',
        ifscCode: 'HDFC0001234',
        emergencyContactName: 'Sunita Sharma',
        emergencyContactPhone: '+91 9876543211',
        emergencyContactRelation: 'Mother',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'employee'
      },
      {
        id: 2,
        firstName: 'Priya',
        lastName: 'Patel',
        gender: 'female',
        email: 'priya.patel@example.com',
        phone: '+91 9876543212',
        address: '456 Brigade Road, Mumbai, Maharashtra 400001',
        aadharNumber: '123456789012',
        panNumber: 'ABCDE1234F',
        officialEmail: 'priya.patel@company.com',
        position: 'Engineering Manager',
        designation: 'Engineering Manager',
        department: 'Engineering',
        reportingManager: 'CEO',
        startDate: '2020-11-03',
        ctc: 1800000,
        basicSalary: 900000,
        hra: 360000,
        location: 'Mumbai',
        pan: 'FGHIJ5678K',
        uan: '234567890123',
        experienceYears: 8,
        sourceOfHire: 'Referral',
        education: [
          {
            institute: 'Indian Institute of Management',
            degree: 'MBA',
            field: 'Finance',
            completionDate: '2015-05-15'
          },
          {
            institute: 'University of Delhi',
            degree: 'B.Com',
            field: 'Commerce',
            completionDate: '2013-04-20'
          }
        ],
        experience: [
          {
            occupation: 'Senior Financial Analyst',
            company: 'ABC Corporation',
            duration: '2018-2022'
          },
          {
            occupation: 'Financial Analyst',
            company: 'XYZ Ltd',
            duration: '2015-2018'
          }
        ],
        active: true,
        bankName: 'ICICI Bank',
        accountNumber: '23456789012345',
        ifscCode: 'ICIC0002345',
        emergencyContactName: 'Raj Patel',
        emergencyContactPhone: '+91 9876543213',
        emergencyContactRelation: 'Husband',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=461&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        role: 'admin'
      },
      {
        id: 3,
        firstName: 'Amit',
        lastName: 'Kumar',
        gender: 'male',
        email: 'amit.kumar@example.com',
        phone: '+91 9876543214',
        address: '789 Connaught Place, Delhi 110001',
        aadharNumber: '123456789012',
        panNumber: 'ABCDE1234F',
        officialEmail: 'amit.kumar@company.com',
        position: 'UX Designer',
        designation: 'Lead UX Designer',
        department: 'Design',
        reportingManager: 'Priya Patel',
        startDate: '2022-01-20',
        ctc: 900000,
        basicSalary: 450000,
        hra: 180000,
        location: 'Delhi',
        pan: 'KLMNO9012P',
        uan: '345678901234',
        experienceYears: 8,
        sourceOfHire: 'Referral',
        education: [
          {
            institute: 'Indian Institute of Management',
            degree: 'MBA',
            field: 'Finance',
            completionDate: '2015-05-15'
          },
          {
            institute: 'University of Delhi',
            degree: 'B.Com',
            field: 'Commerce',
            completionDate: '2013-04-20'
          }
        ],
        experience: [
          {
            occupation: 'Senior Financial Analyst',
            company: 'ABC Corporation',
            duration: '2018-2022'
          },
          {
            occupation: 'Financial Analyst',
            company: 'XYZ Ltd',
            duration: '2015-2018'
          }
        ],
        active: true,
        bankName: 'SBI',
        accountNumber: '34567890123456',
        ifscCode: 'SBIN0003456',
        emergencyContactName: 'Neha Kumar',
        emergencyContactPhone: '+91 9876543215',
        emergencyContactRelation: 'Wife',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'manager'
      },
      {
        id: 4,
        firstName: 'Sneha',
        lastName: 'Reddy',
        gender: 'female',
        email: 'sneha.reddy@example.com',
        phone: '+91 9876543216',
        address: '321 Banjara Hills, Hyderabad, Telangana 500034',
        aadharNumber: '123456789012',
        panNumber: 'ABCDE1234F',
        officialEmail: 'sneha.reddy@company.com',
        position: 'Product Manager',
        designation: 'Senior Product Manager',
        department: 'Product',
        reportingManager: 'CEO',
        startDate: '2023-10-01',
        ctc: 1500000,
        basicSalary: 750000,
        hra: 300000,
        location: 'Hyderabad',
        pan: 'QRSTU3456V',
        uan: '456789012345',
        experienceYears: 8,
        sourceOfHire: 'Referral',
        education: [
          {
            institute: 'Indian Institute of Management',
            degree: 'MBA',
            field: 'Finance',
            completionDate: '2015-05-15'
          },
          {
            institute: 'University of Delhi',
            degree: 'B.Com',
            field: 'Commerce',
            completionDate: '2013-04-20'
          }
        ],
        experience: [
          {
            occupation: 'Senior Financial Analyst',
            company: 'ABC Corporation',
            duration: '2018-2022'
          },
          {
            occupation: 'Financial Analyst',
            company: 'XYZ Ltd',
            duration: '2015-2018'
          }
        ],
        active: true,
        bankName: 'Axis Bank',
        accountNumber: '45678901234567',
        ifscCode: 'UTIB0004567',
        emergencyContactName: 'Vikram Reddy',
        emergencyContactPhone: '+91 9876543217',
        emergencyContactRelation: 'Brother',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        role: 'manager'
      },
      {
        id: 5,
        firstName: 'Rajesh',
        lastName: 'Mehta',
        gender: 'male',
        email: 'rajesh.mehta@example.com',
        phone: '+91 9876543216',
        address: '321 Banjara Hills, Hyderabad, Telangana 500034',
        aadharNumber: '123456789012',
        panNumber: 'ABCDE1234F',
        officialEmail: 'rajesh.mehta@company.com',
        position: 'HR Manager',
        designation: 'HR Manager',
        department: 'Human Resources',
        reportingManager: 'CEO',
        startDate: '2025-08-01',
        ctc: 1500000,
        basicSalary: 750000,
        hra: 300000,
        location: 'Hyderabad',
        pan: 'QRSTU3456V',
        uan: '456789012345',
        experienceYears: 8,
        sourceOfHire: 'Referral',
        education: [
          {
            institute: 'Indian Institute of Management',
            degree: 'MBA',
            field: 'Finance',
            completionDate: '2015-05-15'
          },
          {
            institute: 'University of Delhi',
            degree: 'B.Com',
            field: 'Commerce',
            completionDate: '2013-04-20'
          }
        ],
        experience: [
          {
            occupation: 'Senior Financial Analyst',
            company: 'ABC Corporation',
            duration: '2018-2022'
          },
          {
            occupation: 'Financial Analyst',
            company: 'XYZ Ltd',
            duration: '2015-2018'
          }
        ],
        active: true,
        bankName: 'Axis Bank',
        accountNumber: '45678901234567',
        ifscCode: 'UTIB0004567',
        emergencyContactName: 'Vikram Reddy',
        emergencyContactPhone: '+91 9876543217',
        emergencyContactRelation: 'Brother',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        role: 'super_admin'
      },
      {
        id: 6,
        firstName: 'Anjali',
        lastName: 'Gupta',
        gender: 'female',
        email: 'anjali.gupta@example.com',
        phone: '+91 9876543216',
        address: '321 Banjara Hills, Hyderabad, Telangana 500034',
        aadharNumber: '123456789012',
        panNumber: 'ABCDE1234F',
        officialEmail: 'anjali.gupta@company.com',
        position: 'Finance Manager',
        designation: 'Finance Manager',
        department: 'Finance',
        reportingManager: 'CEO',
        startDate: '2025-06-01',
        ctc: 1500000,
        basicSalary: 750000,
        hra: 300000,
        location: 'Hyderabad',
        pan: 'QRSTU3456V',
        uan: '456789012345',
        active: true,
        experienceYears: 8,
        sourceOfHire: 'Referral',
        education: [
          {
            institute: 'Indian Institute of Management',
            degree: 'MBA',
            field: 'Finance',
            completionDate: '2015-05-15'
          },
          {
            institute: 'University of Delhi',
            degree: 'B.Com',
            field: 'Commerce',
            completionDate: '2013-04-20'
          }
        ],
        experience: [
          {
            occupation: 'Senior Financial Analyst',
            company: 'ABC Corporation',
            duration: '2018-2022'
          },
          {
            occupation: 'Financial Analyst',
            company: 'XYZ Ltd',
            duration: '2015-2018'
          }
        ],
        bankName: 'Axis Bank',
        accountNumber: '45678901234567',
        ifscCode: 'UTIB0004567',
        emergencyContactName: 'Vikram Reddy',
        emergencyContactPhone: '+91 9876543217',
        emergencyContactRelation: 'Brother',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'manager'
      }
    ],
  
    // Documents data
    documents: [
      {
        id: '1',
        type: 'Aadhaar',
        name: 'Aadhaar Card',
        fileName: 'aadhaar_card.pdf',
        fileType: 'application/pdf',
        fileSize: 1024,
        uploadDate: new Date().toISOString(),
        fileUrl: '/api/documents/1/download',
        employeeId: '2'
      },
      {
        id: '2',
        type: 'PAN',
        name: 'PAN Card',
        fileName: 'pan_card.pdf',
        fileType: 'application/pdf',
        fileSize: 512,
        uploadDate: new Date().toISOString(),
        fileUrl: '/api/documents/2/download',
        employeeId: '2'
      }
    ],
  
    // Departments data
    departments: [
      {
        id: 1,
        name: 'Engineering',
        manager: 'Priya Patel',
        description: 'Responsible for product development and technical solutions',
        projects: ['Website Redesign', 'Mobile App', 'API Development']
      },
      {
        id: 2,
        name: 'Product',
        manager: 'Sneha Reddy',
        description: 'Responsible for product strategy and roadmap',
        projects: ['Website Redesign', 'Mobile App', 'API Development']
      },
      {
        id: 3,
        name: 'Design',
        manager: 'Amit Kumar',
        description: 'Creates user experiences and visual designs',
        projects: ['Website Redesign', 'Mobile App', 'API Development']
      },
      {
        id: 4,
        name: 'Human Resources',
        manager: 'Rajesh Mehta',
        description: 'Manages recruitment, training, and employee relations',
        projects: ['Website Redesign', 'Mobile App', 'API Development']
      },
      {
        id: 5,
        name: 'Finance',
        manager: 'Anjali Gupta',
        description: 'Handles financial operations and payroll',
        projects: ['Website Redesign', 'Mobile App', 'API Development']
      }
    ],
  
    // Payroll data
    payroll: [
      {
        id: 1,
        payrollPeriod: {
          startDate: '2025-01-01',
          endDate: '2025-01-31'
        },
        processed: true,
        results: [
          {
            employeeId: 1,
            basicSalary: 50000,
            grossEarnings: 100000,
            deductions: {
              incomeTax: 12000,
              professionalTax: 200,
              pfContribution: 6000
            },
            netPay: 81800
          },
          {
            employeeId: 2,
            basicSalary: 75000,
            grossEarnings: 150000,
            deductions: {
              incomeTax: 25000,
              professionalTax: 200,
              pfContribution: 9000
            },
            netPay: 115800
          }
        ]
      }
    ],
  
    // Attendance records
    attendance: [
      {
        employeeId: "1",
        date: "2025-09-16",
        status: "late",
        checkIn: "2025-09-16T05:24:31.211Z",
        checkOut: "2025-09-16T10:32:31.211Z",
        id: "1"
      },
      {
        employeeId: "1",
        date: "2025-09-15",
        status: "absent",
        checkIn: null,
        checkOut: null,
        id: "2"
      },
      {
        employeeId: "1",
        date: "2025-09-14",
        status: "late",
        checkIn: "2025-09-14T03:25:31.212Z",
        checkOut: "2025-09-14T11:00:31.212Z",
        id: "3"
      },
      {
        employeeId: "2",
        date: "2025-09-16",
        status: "absent",
        checkIn: null,
        checkOut: null,
        id: "8"
      },
      {
        employeeId: "2",
        date: "2025-09-15",
        status: "absent",
        checkIn: null,
        checkOut: null,
        id: "9"
      },
      {
        employeeId: "2",
        date: "2025-09-14",
        status: "present",
        checkIn: "2025-09-14T03:17:31.212Z",
        checkOut: "2025-09-14T10:30:31.212Z",
        id: "10"
      },
      {
        employeeId: "3",
        date: "2025-09-16",
        status: "absent",
        checkIn: null,
        checkOut: null,
        id: "15"
      },
      {
        employeeId: "3",
        date: "2025-09-15",
        status: "absent",
        checkIn: null,
        checkOut: null,
        id: "16"
      },
      {
        employeeId: "3",
        date: "2025-09-14",
        status: "late",
        checkIn: "2025-09-14T03:10:31.213Z",
        checkOut: "2025-09-14T11:14:31.213Z",
        id: "17"
      },
      {
        employeeId: "4",
        date: "2025-09-16",
        status: "absent",
        checkIn: null,
        checkOut: null,
        id: "22"
      },
      {
        employeeId: "4",
        date: "2025-09-15",
        status: "present",
        checkIn: "2025-09-15T03:48:31.214Z",
        checkOut: "2025-09-15T11:58:31.214Z",
        id: "23"
      },
      {
        employeeId: "4",
        date: "2025-09-14",
        status: "late",
        checkIn: "2025-09-14T04:25:31.214Z",
        checkOut: "2025-09-14T11:35:31.214Z",
        id: "24"
      },
      {
        employeeId: "5",
        date: "2025-09-16",
        status: "absent",
        checkIn: null,
        checkOut: null,
        id: "29"
      },
      {
        employeeId: "5",
        date: "2025-09-15",
        status: "present",
        checkIn: "2025-09-15T03:31:31.215Z",
        checkOut: "2025-09-15T11:27:31.215Z",
        id: "30"
      },
      {
        employeeId: "5",
        date: "2025-09-14",
        status: "absent",
        checkIn: null,
        checkOut: null,
        id: "31"
      },
      {
        employeeId: "6",
        date: "2025-09-16",
        status: "present",
        checkIn: "2025-09-16T04:41:31.215Z",
        checkOut: "2025-09-16T10:56:31.215Z",
        id: "36"
      },
      {
        employeeId: "6",
        date: "2025-09-15",
        status: "absent",
        checkIn: null,
        checkOut: null,
        id: "37"
      },
      {
        employeeId: "6",
        date: "2025-09-14",
        status: "present",
        checkIn: "2025-09-14T02:48:31.215Z",
        checkOut: "2025-09-14T10:36:31.215Z",
        id: "38"
      }
    ],
  
    // Dashboard stats (pre-calculated)
    dashboardStats: {
      totalEmployees: 6,
      totalDepartments: 5,
      attendanceRate: '67%',
      newHires: 3
    },
  
    // Recent activities
    recentActivities: [
      {
        id: 1,
        type: 'hire',
        message: 'New employee Rahul Sharma joined Engineering team',
        timestamp: '2 days ago'
      },
      {
        id: 2,
        type: 'hire',
        message: 'New employee Rajesh Mehta joined Human Resources team',
        timestamp: '1 month ago'
      },
      {
        id: 3,
        type: 'hire',
        message: 'New employee Anjali Gupta joined Finance team',
        timestamp: '3 months ago'
      }
    ],
  
    // Department overview
    departmentOverview: [
      {
        id: 1,
        name: 'Engineering',
        employeeCount: 2,
        manager: 'Priya Patel'
      },
      {
        id: 2,
        name: 'Product',
        employeeCount: 1,
        manager: 'Sneha Reddy'
      },
      {
        id: 3,
        name: 'Design',
        employeeCount: 1,
        manager: 'Amit Kumar'
      },
      {
        id: 4,
        name: 'Human Resources',
        employeeCount: 1,
        manager: 'Rajesh Mehta'
      },
      {
        id: 5,
        name: 'Finance',
        employeeCount: 1,
        manager: 'Anjali Gupta'
      }
    ],
  
    // Monthly employee data for charts
    monthlyEmployeeData: [
      { month: 'Apr', fullMonth: 'Apr 2025', count: 3 },
      { month: 'May', fullMonth: 'May 2025', count: 3 },
      { month: 'Jun', fullMonth: 'Jun 2025', count: 4 },
      { month: 'Jul', fullMonth: 'Jul 2025', count: 4 },
      { month: 'Aug', fullMonth: 'Aug 2025', count: 5 },
      { month: 'Sep', fullMonth: 'Sep 2025', count: 6 }
    ],
  
    // Document types
    documentTypes: [
      'Aadhaar', 'PAN', 'Passport', 'Driving License', 
      'Voter ID', 'Degree Certificate', 'Mark Sheets', 'Other'
    ]
  };
  
  // Helper functions for Zustand stores
  export const HRMHelpers = {
    // Calculate attendance rate
    calculateAttendanceRate: (attendanceData, departmentFilter = null) => {
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
      startOfWeek.setHours(0, 0, 0, 0);
      
      const startDate = startOfWeek.toISOString().split('T')[0];
      const endDate = now.toISOString().split('T')[0];
      
      const weekAttendance = attendanceData.filter(record => 
        record.date >= startDate && record.date <= endDate
      );
      
      const presentCount = weekAttendance.filter(record => 
        record.status === 'present' || record.status === 'late'
      ).length;
      
      const totalCount = weekAttendance.length;
      
      if (totalCount === 0) return '0%';
      
      const rate = (presentCount / totalCount) * 100;
      return `${Math.round(rate)}%`;
    },
  
    // Get recent hires
    getRecentHires: (employees, departmentFilter = null, limit = 3) => {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      
      let filteredEmployees = employees.filter(employee => 
        new Date(employee.startDate) > ninetyDaysAgo
      );
      
      if (departmentFilter) {
        filteredEmployees = filteredEmployees.filter(emp => 
          emp.department === departmentFilter
        );
      }
      
      return filteredEmployees
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .slice(0, limit)
        .map(employee => ({
          name: `${employee.firstName} ${employee.lastName}`,
          position: employee.position,
          avatar: employee.avatar,
          startDate: employee.startDate
        }));
    },
  
    // Filter employees by department
    filterEmployeesByDepartment: (employees, department) => {
      if (!department) return employees;
      return employees.filter(emp => emp.department === department);
    },
  
    // Get employee by ID
    getEmployeeById: (employees, id) => {
      return employees.find(emp => emp.id === parseInt(id));
    },
  
    // Get documents by employee ID
    getDocumentsByEmployeeId: (documents, employeeId) => {
      return documents.filter(doc => doc.employeeId === employeeId);
    },
  
    // Get attendance by employee ID
    getAttendanceByEmployeeId: (attendance, employeeId) => {
      return attendance.filter(record => record.employeeId === employeeId);
    },
  
    // Calculate payroll for employee
    calculatePayroll: (employee) => {
      const monthlySalary = employee.ctc / 12;
      const basicSalary = monthlySalary * 0.5;
      const hra = monthlySalary * 0.2;
      
      // Simplified tax calculation
      const incomeTax = monthlySalary * 0.1;
      const professionalTax = 200;
      const pfContribution = basicSalary * 0.12;
      
      const grossEarnings = monthlySalary;
      const totalDeductions = incomeTax + professionalTax + pfContribution;
      const netPay = grossEarnings - totalDeductions;
      
      return {
        employeeId: employee.id,
        basicSalary,
        grossEarnings,
        deductions: {
          incomeTax,
          professionalTax,
          pfContribution
        },
        netPay
      };
    }
  };
  
  export default HRMData;