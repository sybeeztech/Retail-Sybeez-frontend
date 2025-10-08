import { createServer, Model, Factory, belongsTo, hasMany } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      employee: Model.extend({
        department: belongsTo(),
        attendances: hasMany(),
        leaveRequests: hasMany(),
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
      }),

      department: Factory.extend({
        name: 'Information Technology',
        description: 'IT Department',
        manager_id: 1,
      }),

      attendance: Factory.extend({
        date: '2025-01-08',
        check_in: '09:00:00',
        check_out: '17:00:00',
        hours_worked: 8,
        status: 'present',
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
    },

    seeds(server) {
      // Create departments
      server.create('department', { id: 1, name: 'Information Technology' });
      server.create('department', { id: 2, name: 'Human Resources' });
      server.create('department', { id: 3, name: 'Finance' });
      server.create('department', { id: 4, name: 'Sales' });

      // Create employees
      server.create('employee', {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@company.com',
        role: 'admin',
        department_id: 1,
      });

      server.create('employee', {
        id: 2,
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@company.com',
        role: 'manager',
        department_id: 2,
      });

      // Create sample data
      server.createList('attendance', 10);
      server.createList('order', 5);
      server.createList('customer', 10);
      server.createList('income', 15);
      server.createList('expense', 20);
    },

    routes() {
      this.namespace = 'api';

      // Auth routes
      this.post('/login', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        // Simple auth simulation
        return {
          token: 'mock-jwt-token',
          user: {
            id: 1,
            username: attrs.username,
            employee: schema.employees.find(1)?.attrs || {
              id: 1,
              first_name: 'John',
              last_name: 'Doe',
              role: 'admin',
            },
          },
        };
      });

      // Employee routes
      this.get('/employees');
      this.get('/employees/:id');
      this.post('/employees');
      this.put('/employees/:id');
      this.delete('/employees/:id');

      // Department routes
      this.get('/departments');
      this.get('/departments/:id');
      this.post('/departments');
      this.put('/departments/:id');
      this.delete('/departments/:id');

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