// Load modules

var Admin = require('./controllers/admin'),
		Tenant = require('./controllers/tenant'),
		tenantAdmin = require('./controllers/tenantAdmin'),
		User = require('./controllers/user')

// API Server Endpoints
exports.endpoints = [
		{ method: 'POST', path: '/createAdmin', config: Admin.createAdmin},
    { method: 'POST', path: '/createTenants', config: Tenant.CreateTenantData},
    { method: 'POST', path: '/createTenantAdmins', config: tenantAdmin.CreateTenantAdmin},
    { method: 'POST', path: '/createUsers', config: User.CreateUser}
   
];