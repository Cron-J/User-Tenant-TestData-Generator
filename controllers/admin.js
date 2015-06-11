var Boom = require('boom'),
    User = require('../models/user').User,
    async = require('async'),
    adminData = require('../config/testData').admin;


exports.createAdmin = {
    handler: function(request, reply) {
        console.log('Wait until you see success message');
         User.findAdmin(function(err, result){
            if( result.length != 0 ){
                reply(Boom.forbidden("Admin already exist"));
            }
            else{
                var user = new User(adminData);
                user.save(function(err, user) {
                    console.log(user);
                    console.log('****************');
                    console.log(err);
                    if (!err) {
                            console.log('Admin Record Successfully created');
                            return reply("Record Successfully created");
                    } else {
                        console.log(err);
                    }
                });
            }
         });
    }
};