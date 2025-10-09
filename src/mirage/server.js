import { createServer, Model, Factory, belongsTo, hasMany, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      employee: Model.extend({
        department: belongsTo(),
        attendances: hasMany(),
        leaveRequests: hasMany(),
        documents: hasMany(),
      }),
      department: Model.extend({
        employees: hasMany(),
      }),
      attendance: Model.extend({
        employee: belongsTo(),
      }),
      leaveRequest: Model.extend({
        employee: belongsTo(),
      }),
      document: Model.extend({
        employee: belongsTo(),
      }),
      // ERP Models
      order: Model,
      customer: Model,
      supplier: Model,
      inventoryItem: Model,
      // Finance Models
      income: Model,
      expense: Model,
      invoice: Model,
      bankAccount: Model,
      item: Model,
      financialCustomer: Model,
      // Payroll Models
      payroll: Model,
    },

    factories: {
      employee: Factory.extend({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@company.com',
        phone: '+1 234 567 8900',
        role: 'employee',
        position: 'Software Developer',
        hire_date: '2023-01-15',
        status: 'active',
        salary: 75000,
        department_id: 1,
        ctc: 1200000,
        location: 'Mumbai',
        pan: 'ABCDE1234F',
        uan: '123456789012',
        address: '123 Main Street, Mumbai',
        date_of_birth: '1990-01-01',
        gender: 'Male',
        emergency_contact: '+1 234 567 8901',
        bank_account_number: '1234567890',
        ifsc_code: 'SBIN0000123',
      }),

      department: Factory.extend({
        name: 'Information Technology',
        description: 'IT Department',
        manager_id: 1,
        budget: 500000,
        location: 'Head Office',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2025-01-08T00:00:00Z'
      }),

      attendance: Factory.extend({
        date: '2025-01-08',
        check_in: '09:00:00',
        check_out: '17:00:00',
        hours_worked: 8,
        status: 'present',
      }),

      document: Factory.extend({
        name: 'Resume',
        type: 'resume',
        file_url: '/documents/resume.pdf',
        uploaded_at: '2025-01-08T10:00:00Z',
        size: 1024,
      }),

      // ERP Factories
      order: Factory.extend({
        order_id: 'ORD001',
        customer_name: 'Test Customer',
        total_amount: 1000,
        status: 'pending',
        created_at: '2025-01-08T10:00:00Z',
      }),

      customer: Factory.extend({
        name: 'Test Customer',
        email: 'customer@test.com',
        phone: '+1 234 567 8900',
        address: '123 Main St',
      }),

      // Finance Factories
      income: Factory.extend({
        description: 'Sales Revenue',
        amount: 5000,
        date: '2025-01-08',
        category: 'Sales',
      }),

      expense: Factory.extend({
        description: 'Office Supplies',
        amount: 500,
        date: '2025-01-08',
        category: 'Office',
      }),

      // Payroll Factory
      payroll: Factory.extend({
        payrollPeriod: {
          startDate: '2025-01-01',
          endDate: '2025-01-31'
        },
        processed: true,
        results: [],
      }),
    },

    seeds(server) {
      // // Create departments
      // const itDept = server.create('department', { 
      //   id: 1, 
      //   name: 'Information Technology',
      //   description: 'IT Department'
      // });
      // const hrDept = server.create('department', { 
      //   id: 2, 
      //   name: 'Human Resources',
      //   description: 'HR Department'
      // });
      // const financeDept = server.create('department', { 
      //   id: 3, 
      //   name: 'Finance',
      //   description: 'Finance Department'
      // });
      // const salesDept = server.create('department', { 
      //   id: 4, 
      //   name: 'Sales',
      //   description: 'Sales Department'
      // });

      // Create employees
      const adminEmployee = server.create('employee', {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@company.com',
        role: 'admin',
        position: 'CTO',
        department_id: 1,
        ctc: 1500000,
        location: 'Mumbai',
        pan: 'ABCDE1234F',
        uan: '123456789012',
        status: 'active',
        hire_date: '2020-01-15',
      });

      const managerEmployee = server.create('employee', {
        id: 2,
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@company.com',
        role: 'manager',
        position: 'HR Manager',
        department_id: 2,
        ctc: 1200000,
        location: 'Delhi',
        pan: 'BCDEF2345G',
        uan: '234567890123',
        status: 'active',
        hire_date: '2021-03-20',
      });

      const regularEmployee = server.create('employee', {
        id: 3,
        first_name: 'Bob',
        last_name: 'Johnson',
        email: 'bob.johnson@company.com',
        role: 'employee',
        position: 'Software Developer',
        department_id: 1,
        ctc: 900000,
        location: 'Bangalore',
        pan: 'CDEFG3456H',
        uan: '345678901234',
        status: 'active',
        hire_date: '2022-06-10',
      });

      // Create more employees
      server.create('employee', {
        id: 4,
        first_name: 'Alice',
        last_name: 'Brown',
        email: 'alice.brown@company.com',
        role: 'employee',
        position: 'Finance Analyst',
        department_id: 3,
        ctc: 800000,
        location: 'Chennai',
        pan: 'DEFGH4567I',
        uan: '456789012345',
        status: 'active',
        hire_date: '2023-01-15',
      });

      server.create('employee', {
        id: 5,
        first_name: 'Charlie',
        last_name: 'Wilson',
        email: 'charlie.wilson@company.com',
        role: 'employee',
        position: 'Sales Executive',
        department_id: 4,
        ctc: 700000,
        location: 'Hyderabad',
        pan: 'EFGHI5678J',
        uan: '567890123456',
        status: 'active',
        hire_date: '2023-08-22',
      });

      // Create documents for employees
      server.create('document', {
        id: 1,
        employee_id: 1,
        name: 'John_Doe_Resume.pdf',
        type: 'resume',
        file_url: '/documents/1/resume.pdf',
        uploaded_at: '2024-01-08T10:00:00Z',
        size: 2048,
      });

      server.create('document', {
        id: 2,
        employee_id: 1,
        name: 'John_Doe_Offer_Letter.pdf',
        type: 'offer_letter',
        file_url: '/documents/1/offer_letter.pdf',
        uploaded_at: '2024-01-08T11:00:00Z',
        size: 1536,
      });

      server.create('document', {
        id: 3,
        employee_id: 2,
        name: 'Jane_Smith_Resume.pdf',
        type: 'resume',
        file_url: '/documents/2/resume.pdf',
        uploaded_at: '2024-01-07T09:00:00Z',
        size: 1782,
      });

      const itDept = server.create('department', { 
        id: 1, 
        name: 'Information Technology',
        description: 'Handles all technology infrastructure and software development',
        manager_id: 1,
        budget: 1500000,
        location: 'Bangalore'
      });
      
      const hrDept = server.create('department', { 
        id: 2, 
        name: 'Human Resources',
        description: 'Manages recruitment, employee relations, and HR operations',
        manager_id: 2,
        budget: 800000,
        location: 'Mumbai'
      });
      
      const financeDept = server.create('department', { 
        id: 3, 
        name: 'Finance',
        description: 'Handles financial planning, accounting, and budgeting',
        manager_id: null,
        budget: 1200000,
        location: 'Delhi'
      });
      
      const salesDept = server.create('department', { 
        id: 4, 
        name: 'Sales',
        description: 'Responsible for sales strategy and customer acquisition',
        manager_id: null,
        budget: 2000000,
        location: 'Multiple Locations'
      });
    
      const marketingDept = server.create('department', {
        id: 5,
        name: 'Marketing',
        description: 'Handles brand management and marketing campaigns',
        manager_id: null,
        budget: 900000,
        location: 'Mumbai'
      });

      // Create sample data
      server.createList('attendance', 10);
      server.createList('order', 5);
      server.createList('customer', 10);
      server.createList('income', 15);
      server.createList('expense', 20);
      server.createList('payroll', 3);
    },

    routes() {
      this.namespace = 'api';

      // Authentication middleware
      const requireAuth = (schema, request) => {
        const authHeader = request.requestHeaders.Authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return { 
            error: { message: 'Unauthorized: No token provided' }, 
            status: 401 
          };
        }

        // For demo purposes, we'll simulate a valid token
        const token = authHeader.replace('Bearer ', '');
        
        if (token !== 'mock-jwt-token') {
          return { 
            error: { message: 'Unauthorized: Invalid token' }, 
            status: 401 
          };
        }

        // Get user from token (in real app, decode JWT)
        const user = {
          id: 1,
          employeeId: 1,
          role: 'admin'
        };

        return { user };
      };

      // Helper function to calculate Indian tax components
      const calculateIndianTax = (salary, basicSalary, hra, cityType) => {
        const standardDeduction = 50000;
        
        let hraExemption = 0;
        if (cityType === 'metro') {
          hraExemption = Math.min(hra, basicSalary * 0.5, hra - (0.1 * basicSalary));
        } else {
          hraExemption = Math.min(hra, basicSalary * 0.4, hra - (0.1 * basicSalary));
        }
        
        const taxableIncome = salary - hraExemption - standardDeduction;
        
        let tax = 0;
        if (taxableIncome <= 700000) {
          tax = 0;
        } else if (taxableIncome <= 300000) {
          tax = 0;
        } else if (taxableIncome <= 600000) {
          tax = (taxableIncome - 300000) * 0.05;
        } else if (taxableIncome <= 900000) {
          tax = 15000 + (taxableIncome - 600000) * 0.10;
        } else if (taxableIncome <= 1200000) {
          tax = 45000 + (taxableIncome - 900000) * 0.15;
        } else if (taxableIncome <= 1500000) {
          tax = 90000 + (taxableIncome - 1200000) * 0.20;
        } else {
          tax = 150000 + (taxableIncome - 1500000) * 0.30;
        }
        
        tax += tax * 0.04;
        const professionalTax = salary > 75000 ? 200 : 0;
        const pfContribution = basicSalary * 0.12;
        
        return {
          incomeTax: tax,
          professionalTax,
          pfContribution,
          hraExemption
        };
      };

      // Helper to check payroll permissions
      const canAccessPayroll = (schema, user, action = 'view') => {
        const employeeRecord = schema.employees.find(user.employeeId);
        if (!employeeRecord) return false;
        
        const role = employeeRecord.attrs.role;
        
        if (['super_admin', 'admin'].includes(role)) return true;
        if (role === 'manager' && action === 'view') return true;
        if (role === 'employee' && action === 'view_self') return true;
        
        return false;
      };

      // Auth routes
      this.post('/login', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        
        // Find employee by email
        const employee = schema.employees.where(emp => 
          emp.email === attrs.username
        ).models[0];
        
        if (!employee) {
          return new Response(401, {}, { error: 'Invalid credentials' });
        }

        // Store auth info in localStorage for the frontend
        const authData = {
          state: {
            user: {
              id: employee.attrs.id,
              username: attrs.username,
              employeeId: employee.id,
              employee_info: {
                id: employee.id,
                firstName: employee.first_name,
                lastName: employee.last_name,
                email: employee.email,
                role: employee.role,
                department: employee.department_id,
                location: employee.location
              }
            },
            token: 'mock-jwt-token'
          }
        };

        // Store in localStorage for frontend access
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth-token', 'mock-jwt-token');
          localStorage.setItem('auth-storage', JSON.stringify(authData));
        }

        return {
          token: 'mock-jwt-token',
          user: {
            id: employee.attrs.id,
            username: attrs.username,
            employeeId: employee.id,
            employee_info: {
              id: employee.id,
              firstName: employee.first_name,
              lastName: employee.last_name,
              email: employee.email,
              role: employee.role,
              department: employee.department_id,
              location: employee.location
            }
          
          },
        };
      });

      this.post('/logout', () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-token');
          localStorage.removeItem('auth-storage');
        }
        return { message: 'Logged out successfully' };
      });

      // Get current user
      this.get('/me', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);

        const employee = schema.employees.find(auth.user.employeeId);
        if (!employee) {
          return new Response(404, {}, { error: 'Employee not found' });
        }

        return {
          employee: {
            id: employee.attrs.id,
            firstName: employee.attrs.first_name,
            lastName: employee.attrs.last_name,
            email: employee.attrs.email,
            role: employee.attrs.role,
            department: employee.attrs.department_id,
            position: employee.attrs.position,
            location: employee.attrs.location,
            phone: employee.attrs.phone,
            status: employee.attrs.status,
            hire_date: employee.attrs.hire_date,
            ctc: employee.attrs.ctc,
            pan: employee.attrs.pan,
            uan: employee.attrs.uan,
          }
        };
      });

      // Employee routes
      this.get('/employees', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);

        const employees = schema.employees.all().models.map(employee => ({
          id: employee.attrs.id,
          firstName: employee.attrs.first_name,
          lastName: employee.attrs.last_name,
          email: employee.attrs.email,
          phone: employee.attrs.phone,
          role: employee.attrs.role,
          position: employee.attrs.position,
          department: employee.attrs.department_id,
          hireDate: employee.attrs.hire_date,
          status: employee.attrs.status,
          salary: employee.attrs.salary,
          ctc: employee.attrs.ctc,
          location: employee.attrs.location,
          pan: employee.attrs.pan,
          uan: employee.attrs.uan,
          address: employee.attrs.address,
          dateOfBirth: employee.attrs.date_of_birth,
          gender: employee.attrs.gender,
          emergencyContact: employee.attrs.emergency_contact,
          bankAccountNumber: employee.attrs.bank_account_number,
          ifscCode: employee.attrs.ifsc_code,
          active: employee.attrs.status === 'active',
        }));

        return { employees };
      });

      this.get('/employees/:id', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);

        const employee = schema.employees.find(request.params.id);
        if (!employee) {
          return new Response(404, {}, { error: 'Employee not found' });
        }

        return {
          employee: {
            id: employee.attrs.id,
            firstName: employee.attrs.first_name,
            lastName: employee.attrs.last_name,
            email: employee.attrs.email,
            phone: employee.attrs.phone,
            role: employee.attrs.role,
            position: employee.attrs.position,
            department: employee.attrs.department_id,
            hireDate: employee.attrs.hire_date,
            status: employee.attrs.status,
            salary: employee.attrs.salary,
            ctc: employee.attrs.ctc,
            location: employee.attrs.location,
            pan: employee.attrs.pan,
            uan: employee.attrs.uan,
            address: employee.attrs.address,
            dateOfBirth: employee.attrs.date_of_birth,
            gender: employee.attrs.gender,
            emergencyContact: employee.attrs.emergency_contact,
            bankAccountNumber: employee.attrs.bank_account_number,
            ifscCode: employee.attrs.ifsc_code,
            active: employee.attrs.status === 'active',
          }
        };
      });

      this.post('/employees', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);

        const attrs = JSON.parse(request.requestBody);
        
        // Generate a new ID
        const employees = schema.employees.all().models;
        const newId = Math.max(...employees.map(e => e.attrs.id)) + 1;

        const employee = schema.employees.create({
          id: newId,
          first_name: attrs.firstName,
          last_name: attrs.lastName,
          email: attrs.email,
          phone: attrs.phone,
          role: attrs.role || 'employee',
          position: attrs.position,
          department_id: attrs.department,
          hire_date: attrs.hireDate,
          status: attrs.status || 'active',
          salary: attrs.salary,
          ctc: attrs.ctc,
          location: attrs.location,
          pan: attrs.pan,
          uan: attrs.uan,
          address: attrs.address,
          date_of_birth: attrs.dateOfBirth,
          gender: attrs.gender,
          emergency_contact: attrs.emergencyContact,
          bank_account_number: attrs.bankAccountNumber,
          ifsc_code: attrs.ifscCode,
        });

        return {
          employee: {
            id: employee.attrs.id,
            firstName: employee.attrs.first_name,
            lastName: employee.attrs.last_name,
            email: employee.attrs.email,
            phone: employee.attrs.phone,
            role: employee.attrs.role,
            position: employee.attrs.position,
            department: employee.attrs.department_id,
            hireDate: employee.attrs.hire_date,
            status: employee.attrs.status,
            salary: employee.attrs.salary,
            ctc: employee.attrs.ctc,
            location: employee.attrs.location,
            pan: employee.attrs.pan,
            uan: employee.attrs.uan,
            address: employee.attrs.address,
            dateOfBirth: employee.attrs.date_of_birth,
            gender: employee.attrs.gender,
            emergencyContact: employee.attrs.emergency_contact,
            bankAccountNumber: employee.attrs.bank_account_number,
            ifscCode: employee.attrs.ifsc_code,
            active: employee.attrs.status === 'active',
            documents: [],
          }
        };
      });

      this.put('/employees/:id', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);

        const employee = schema.employees.find(request.params.id);
        if (!employee) {
          return new Response(404, {}, { error: 'Employee not found' });
        }

        const attrs = JSON.parse(request.requestBody);
        
        employee.update({
          first_name: attrs.firstName,
          last_name: attrs.lastName,
          email: attrs.email,
          phone: attrs.phone,
          role: attrs.role,
          position: attrs.position,
          department_id: attrs.department,
          hire_date: attrs.hireDate,
          status: attrs.status,
          salary: attrs.salary,
          ctc: attrs.ctc,
          location: attrs.location,
          pan: attrs.pan,
          uan: attrs.uan,
          address: attrs.address,
          date_of_birth: attrs.dateOfBirth,
          gender: attrs.gender,
          emergency_contact: attrs.emergencyContact,
          bank_account_number: attrs.bankAccountNumber,
          ifsc_code: attrs.ifscCode,
        });

        return {
          employee: {
            id: employee.attrs.id,
            firstName: employee.attrs.first_name,
            lastName: employee.attrs.last_name,
            email: employee.attrs.email,
            phone: employee.attrs.phone,
            role: employee.attrs.role,
            position: employee.attrs.position,
            department: employee.attrs.department_id,
            hireDate: employee.attrs.hire_date,
            status: employee.attrs.status,
            salary: employee.attrs.salary,
            ctc: employee.attrs.ctc,
            location: employee.attrs.location,
            pan: employee.attrs.pan,
            uan: employee.attrs.uan,
            address: employee.attrs.address,
            dateOfBirth: employee.attrs.date_of_birth,
            gender: employee.attrs.gender,
            emergencyContact: employee.attrs.emergency_contact,
            bankAccountNumber: employee.attrs.bank_account_number,
            ifscCode: employee.attrs.ifsc_code,
            active: employee.attrs.status === 'active',
          }
        };
      });

      this.delete('/employees/:id', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);

        const employee = schema.employees.find(request.params.id);
        if (!employee) {
          return new Response(404, {}, { error: 'Employee not found' });
        }

        employee.destroy();
        return { message: 'Employee deleted successfully' };
      });

      // Employee documents routes
      this.get('/employees/:id/documents', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);

        const documents = schema.documents.where(doc => 
          doc.attrs.employee_id == request.params.id
        ).models.map(doc => ({
          id: doc.attrs.id,
          name: doc.attrs.name,
          type: doc.attrs.type,
          file_url: doc.attrs.file_url,
          uploaded_at: doc.attrs.uploaded_at,
          size: doc.attrs.size,
        }));

        return { documents };
      });

      this.post('/employees/:id/documents', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);

        const attrs = JSON.parse(request.requestBody);
        const documents = schema.documents.all().models;
        const newId = documents.length > 0 ? Math.max(...documents.map(d => d.attrs.id)) + 1 : 1;

        const document = schema.documents.create({
          id: newId,
          employee_id: request.params.id,
          name: attrs.name,
          type: attrs.type,
          file_url: attrs.file_url || `/documents/${request.params.id}/${attrs.name}`,
          uploaded_at: new Date().toISOString(),
          size: attrs.size || 0,
        });

        return {
          id: document.attrs.id,
          name: document.attrs.name,
          type: document.attrs.type,
          file_url: document.attrs.file_url,
          uploaded_at: document.attrs.uploaded_at,
          size: document.attrs.size,
        };
      });

      this.delete('/documents/:id', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);

        const document = schema.documents.find(request.params.id);
        if (!document) {
          return new Response(404, {}, { error: 'Document not found' });
        }

        document.destroy();
        return { message: 'Document deleted successfully' };
      });

      // Department routes
      // this.get('/departments');
      // this.get('/departments/:id');
      // this.post('/departments');
      // this.put('/departments/:id');
      // this.delete('/departments/:id');

      // Department routes with enhanced functionality
this.get('/departments', (schema, request) => {
  const auth = requireAuth(schema, request);
  if (auth.error) return new Response(auth.status, {}, auth.error);

  const departments = schema.departments.all().models.map(dept => ({
    id: dept.id,
    name: dept.name,
    description: dept.description,
    manager_id: dept.manager_id,
    budget: dept.budget || 0,
    location: dept.location || '',
    created_at: dept.created_at || new Date().toISOString(),
    updated_at: dept.updated_at || new Date().toISOString(),
    // Calculate employee count
    employeeCount: schema.employees.where(emp => emp.department_id === dept.id).models.length,
    // Get recent hires (last 3 employees)
    recentHires: schema.employees
      .where(emp => emp.department_id === dept.id)
      .models
      .sort((a, b) => new Date(b.attrs.hire_date) - new Date(a.attrs.hire_date))
      .slice(0, 3)
      .map(emp => ({
        id: emp.attrs.id,
        name: `${emp.attrs.first_name} ${emp.attrs.last_name}`,
        position: emp.attrs.position,
        hire_date: emp.attrs.hire_date
      }))
  }));

  return { departments };
});

this.get('/departments/:id', (schema, request) => {
  const auth = requireAuth(schema, request);
  if (auth.error) return new Response(auth.status, {}, auth.error);

  const department = schema.departments.find(request.params.id);
  if (!department) {
    return new Response(404, {}, { error: 'Department not found' });
  }

  const departmentEmployees = schema.employees.where(emp => 
    emp.attrs.department_id === department.attrs.id
  ).models;

  return {
    department: {
      id: department.attrs.id,
      name: department.attrs.name,
      description: department.attrs.description,
      manager_id: department.attrs.manager_id,
      budget: department.attrs.budget || 0,
      location: department.attrs.location || '',
      created_at: department.attrs.created_at || new Date().toISOString(),
      updated_at: department.attrs.updated_at || new Date().toISOString(),
      employeeCount: departmentEmployees.length,
      manager: department.attrs.manager_id ? (() => {
        const manager = schema.employees.find(department.attrs.manager_id);
        return manager ? {
          id: manager.attrs.id,
          name: `${manager.attrs.first_name} ${manager.attrs.last_name}`,
          email: manager.attrs.email
        } : null;
      })() : null,
      employees: departmentEmployees.map(emp => ({
        id: emp.attrs.id,
        firstName: emp.attrs.first_name,
        lastName: emp.attrs.last_name,
        email: emp.attrs.email,
        position: emp.attrs.position,
        hire_date: emp.attrs.hire_date,
        status: emp.attrs.status
      }))
    }
  };
});

this.get('/departments/:id/employees', (schema, request) => {
  const auth = requireAuth(schema, request);
  if (auth.error) return new Response(auth.status, {}, auth.error);

  const department = schema.departments.find(request.params.id);
  if (!department) {
    return new Response(404, {}, { error: 'Department not found' });
  }

  const employees = schema.employees.where(emp => 
    emp.attrs.department_id === department.attrs.id
  ).models.map(emp => ({
    id: emp.attrs.id,
    firstName: emp.attrs.first_name,
    lastName: emp.attrs.last_name,
    email: emp.attrs.email,
    phone: emp.attrs.phone,
    position: emp.attrs.position,
    role: emp.attrs.role,
    hire_date: emp.attrs.hire_date,
    status: emp.attrs.status,
    salary: emp.attrs.salary,
    ctc: emp.attrs.ctc,
    location: emp.attrs.location,
    department: department.attrs.name
  }));

  return { employees };
});

this.post('/departments', (schema, request) => {
  const auth = requireAuth(schema, request);
  if (auth.error) return new Response(auth.status, {}, auth.error);

  const attrs = JSON.parse(request.requestBody);
  
  // Generate a new ID
  const departments = schema.departments.all().models;
  const newId = departments.length > 0 ? Math.max(...departments.map(d => d.attrs.id)) + 1 : 1;

  const department = schema.departments.create({
    id: newId,
    name: attrs.name,
    description: attrs.description,
    manager_id: attrs.manager_id || null,
    budget: attrs.budget || 0,
    location: attrs.location || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  return {
    department: {
      id: department.attrs.id,
      name: department.attrs.name,
      description: department.attrs.description,
      manager_id: department.attrs.manager_id,
      budget: department.attrs.budget,
      location: department.attrs.location,
      created_at: department.attrs.created_at,
      updated_at: department.attrs.updated_at,
      employeeCount: 0,
      recentHires: []
    }
  };
});

this.put('/departments/:id', (schema, request) => {
  const auth = requireAuth(schema, request);
  if (auth.error) return new Response(auth.status, {}, auth.error);

  const department = schema.departments.find(request.params.id);
  if (!department) {
    return new Response(404, {}, { error: 'Department not found' });
  }

  const attrs = JSON.parse(request.requestBody);
  
  department.update({
    name: attrs.name,
    description: attrs.description,
    manager_id: attrs.manager_id,
    budget: attrs.budget,
    location: attrs.location,
    updated_at: new Date().toISOString()
  });

  const departmentEmployees = schema.employees.where(emp => 
    emp.attrs.department_id === department.attrs.id
  ).models;

  return {
    department: {
      id: department.attrs.id,
      name: department.attrs.name,
      description: department.attrs.description,
      manager_id: department.attrs.manager_id,
      budget: department.attrs.budget,
      location: department.attrs.location,
      created_at: department.attrs.created_at,
      updated_at: department.attrs.updated_at,
      employeeCount: departmentEmployees.length,
      manager: department.attrs.manager_id ? (() => {
        const manager = schema.employees.find(department.attrs.manager_id);
        return manager ? {
          id: manager.attrs.id,
          name: `${manager.attrs.first_name} ${manager.attrs.last_name}`,
          email: manager.attrs.email
        } : null;
      })() : null
    }
  };
});

this.delete('/departments/:id', (schema, request) => {
  const auth = requireAuth(schema, request);
  if (auth.error) return new Response(auth.status, {}, auth.error);

  const department = schema.departments.find(request.params.id);
  if (!department) {
    return new Response(404, {}, { error: 'Department not found' });
  }

  // Check if department has employees
  const departmentEmployees = schema.employees.where(emp => 
    emp.attrs.department_id === department.attrs.id
  ).models;

  if (departmentEmployees.length > 0) {
    return new Response(400, {}, { 
      error: 'Cannot delete department with existing employees. Please reassign employees first.' 
    });
  }

  department.destroy();
  return new Response(204, {}, null);
});

      // Attendance routes
      this.get('/attendance');
      this.post('/attendance');
      this.get('/attendance/employee/:id');

      // Leave routes
      this.get('/leave-requests');
      this.post('/leave-requests');
      this.put('/leave-requests/:id');

      // ERP routes
      this.get('/orders');
      this.post('/orders');
      this.put('/orders/:id');
      this.get('/customers');
      this.post('/customers');
      this.get('/suppliers');
      this.post('/suppliers');
      this.get('/inventory');
      this.post('/inventory');

      // Finance routes
      this.get('/income');
      this.post('/income');
      this.get('/expenses');
      this.post('/expenses');
      this.get('/invoices');
      this.post('/invoices');
      this.get('/bank-accounts');
      this.post('/bank-accounts');
      this.get('/items');
      this.post('/items');

      // Payroll routes (keep existing payroll routes from previous implementation)
      this.post('/payroll/process', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);
        
        if (!canAccessPayroll(schema, auth.user, 'process')) {
          return new Response(403, {}, { error: 'Forbidden: Cannot process payroll.' });
        }
        
        const { payPeriod } = JSON.parse(request.requestBody);

        const employees = schema.employees.all().models;
        
        const results = employees.map(employee => {
          const monthlySalary = employee.attrs.ctc / 12;
          const basicSalary = monthlySalary * 0.5;
          const hra = monthlySalary * 0.2;
          
          const isMetro = ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'].includes(employee.attrs.location);
          const cityType = isMetro ? 'metro' : 'non-metro';
          
          const taxComponents = calculateIndianTax(
            monthlySalary,
            basicSalary,
            hra,
            cityType
          );
          
          const conveyanceAllowance = monthlySalary * 0.05;
          const medicalAllowance = monthlySalary * 0.05;
          const specialAllowance = monthlySalary * 0.2;
          
          const grossEarnings = basicSalary + hra + conveyanceAllowance + medicalAllowance + specialAllowance;
          
          const deductions = {
            incomeTax: taxComponents.incomeTax,
            professionalTax: taxComponents.professionalTax,
            pfContribution: taxComponents.pfContribution
          };
          
          const totalDeductions = Object.values(deductions).reduce((sum, value) => sum + value, 0);
          const netPay = grossEarnings - totalDeductions;
          
          return {
            employeeId: employee.attrs.id,
            basicSalary,
            grossEarnings,
            deductions,
            netPay
          };
        });
        
        const payroll = schema.payrolls.create({
          payrollPeriod: payPeriod,
          processed: true,
          results,
          createdAt: new Date().toISOString()
        });
        
        return {
          processed: true,
          payrollPeriod: payPeriod,
          results: payroll.attrs.results || results
        };
      });
      
      this.post('/payroll/run', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);
        
        if (!canAccessPayroll(schema, auth.user, 'process')) {
          return new Response(403, {}, { error: 'Forbidden: Cannot run payroll.' });
        }

        return { 
          message: 'Salary payments processed successfully', 
          timestamp: new Date().toISOString(),
          status: 'completed'
        };
      });
      
      this.get('/payroll/tax-forms', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);
        
        if (!canAccessPayroll(schema, auth.user, 'view')) {
          return new Response(403, {}, { error: 'Forbidden: Cannot generate tax forms.' });
        }

        const employees = schema.employees.all().models;
        const currentYear = new Date().getFullYear();
        const financialYear = `${currentYear - 1}-${currentYear}`;
        
        const forms = employees.map(employee => {
          const annualSalary = employee.attrs.ctc;
          const monthlySalary = annualSalary / 12;
          const isMetro = ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'].includes(employee.attrs.location);
          
          const taxComponents = calculateIndianTax(
            monthlySalary,
            monthlySalary * 0.5,
            monthlySalary * 0.2,
            isMetro ? 'metro' : 'non-metro'
          );
          
          return {
            employeeId: employee.attrs.id,
            formType: 'Form 16',
            financialYear: financialYear,
            totalIncome: annualSalary,
            taxDeducted: taxComponents.incomeTax * 12,
            pan: employee.attrs.pan,
            employerDetails: {
              name: 'Your Company Name',
              address: 'Company Address, City, State',
              tan: 'TAN12345678'
            }
          };
        });
        
        return { forms };
      });
      
      this.get('/payroll/compliance-reports', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);
        
        if (!canAccessPayroll(schema, auth.user, 'view')) {
          return new Response(403, {}, { error: 'Forbidden: Cannot generate compliance reports.' });
        }

        const currentDate = new Date();
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 15);
        
        return {
          report: {
            title: 'Indian Payroll Compliance Report',
            generatedAt: currentDate.toISOString(),
            status: 'Compliant',
            checks: [
              { 
                name: 'Provident Fund (PF) Compliance', 
                status: 'Compliant',
                dueDate: nextMonth.toISOString().split('T')[0],
                description: 'Monthly PF contribution filing'
              },
              { 
                name: 'Professional Tax Registration', 
                status: 'Compliant',
                dueDate: '2025-03-31',
                description: 'Annual professional tax compliance'
              },
              { 
                name: 'TDS Deduction under Section 192', 
                status: 'Compliant',
                dueDate: nextMonth.toISOString().split('T')[0],
                description: 'Monthly TDS deduction for salary payments'
              },
              { 
                name: 'ESI Registration (if applicable)', 
                status: 'Not Applicable',
                dueDate: 'N/A',
                description: 'ESI compliance for organizations with 10+ employees'
              },
              { 
                name: 'Form 16 Generation', 
                status: 'Pending',
                dueDate: '2025-06-15',
                description: 'Annual Form 16 issuance to employees'
              }
            ]
          }
        };
      });

      this.get('/payroll/history', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);
        
        if (!canAccessPayroll(schema, auth.user)) {
          return new Response(403, {}, { error: 'Forbidden: Cannot access payroll history.' });
        }
        
        const employeeRecord = schema.employees.find(auth.user.employeeId);
        
        let payrolls = schema.payrolls.all().models.map(p => p.attrs);
        
        if (employeeRecord.attrs.role === 'manager') {
          payrolls = payrolls.map(payroll => {
            const filteredResults = payroll.results.filter(result => {
              const emp = schema.employees.find(result.employeeId);
              return emp.attrs.department_id === employeeRecord.attrs.department_id;
            });
            return {
              ...payroll,
              results: filteredResults
            };
          }).filter(payroll => payroll.results.length > 0);
        }
        
        return {results: payrolls};
      });

      this.get('/payroll/employee/:id/salary-slip', (schema, request) => {
        const auth = requireAuth(schema, request);
        if (auth.error) return new Response(auth.status, {}, auth.error);
        
        const employeeId = request.params.id;
        const employee = schema.employees.find(employeeId);
        
        if (!employee) {
          return new Response(404, {}, { error: 'Employee not found' });
        }
        
        const employeeRecord = schema.employees.find(auth.user.employeeId);
        if (employeeRecord.attrs.role === 'employee' && employeeId != auth.user.employeeId) {
          return new Response(403, {}, { error: 'Forbidden: Can only view your own salary slip.' });
        }
        
        if (employeeRecord.attrs.role === 'manager' && employee.attrs.department_id !== employeeRecord.attrs.department_id) {
          return new Response(403, {}, { error: 'Forbidden: Can only view salary slips from your department.' });
        }
        
        const monthlySalary = employee.attrs.ctc / 12;
        const isMetro = ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'].includes(employee.attrs.location);
        const taxComponents = calculateIndianTax(
          monthlySalary,
          monthlySalary * 0.5,
          monthlySalary * 0.2,
          isMetro ? 'metro' : 'non-metro'
        );
        
        return {
          employee: {
            name: `${employee.attrs.first_name} ${employee.attrs.last_name}`,
            employeeId: employee.attrs.id,
            pan: employee.attrs.pan,
            uan: employee.attrs.uan
          },
          earnings: {
            basic: monthlySalary * 0.5,
            hra: monthlySalary * 0.2,
            conveyance: monthlySalary * 0.05,
            medical: monthlySalary * 0.05,
            special: monthlySalary * 0.2
          },
          deductions: {
            incomeTax: taxComponents.incomeTax,
            professionalTax: taxComponents.professionalTax,
            pf: taxComponents.pfContribution
          },
          netPay: monthlySalary - (taxComponents.incomeTax + taxComponents.professionalTax + taxComponents.pfContribution)
        };
      });

      // Dashboard routes
      this.get('/dashboard/stats', () => {
        return {
          totalEmployees: 25,
          presentToday: 22,
          onLeave: 2,
          pendingRequests: 5,
          totalOrders: 150,
          pendingOrders: 12,
          totalRevenue: 125000,
          monthlyExpenses: 45000,
        };
      });
    },
  });

  return server;
}