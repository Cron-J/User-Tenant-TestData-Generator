var Boom = require('boom'),
    User = require('../models/user').User,
    Tenant = require('../models/tenant').Tenant,
    Counter = require('../models/counter').Counter,
    Crypto = require('../Utility/cryptolib'),
    Config = require('../config/config'),
    async = require('async'),
    tenantAdminData = require('../config/testData').tenantAdmin;


exports.CreateTenantAdmin = {
    handler: function(request, reply) {
        console.log('Wait until you see success message');
        var i = 0;
        Tenant.find({}).exec(function(err, tenant) {
            if (!err) {
                async.forever(function(callback) {
                    var local = tenantAdminData;
                    local.tenantId = tenant[i]._id;

                    counterValue(function(error, result) {
                        var temp = JSON.parse(JSON.stringify(tenantAdminData));
                        temp.username = result;
                        temp.password = Crypto.encrypt(temp.password);
                        var user = new User(temp);
                        User.saveUser( user, function(err, user) {
                            if (!err) {
                                ++i;
                                if (i == 1000) {
                                    console.log('Tenant-Admins Records Successfully Created');
                                    return reply("Record Successfully created");
                                }
                                callback();
                            } else {
                                console.log(err);
                            }
                        });

                    });
                }, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Tenant-Admins Records Successfully Created');

                    }
                });

            } else {
                console.log(err)
            }
        })

    }
}

var counterValue = function(callback) {
    Counter.update({
        collectionName: 'user',
        fieldName: 'username'
    }, {
        $inc: {
            counterValue: 1
        }
    }, function(err, result) {
        if (err) console.log(err);
        else {
            if (result == 0) {
                counter = new Counter({
                    'collectionName': 'user',
                    'fieldName': 'username',
                    'counterValue': 0
                });
                counter.save(function(err, res) {
                    var username = "tAdmin" + res.counterValue;
                    callback(err, username);
                });
            } else {
                Counter.findOne({
                    collectionName: 'user',
                    fieldName: 'username'
                }, function(err, res) {
                    if (res) {
                        var username = "tAdmin" + res.counterValue;
                        callback(err, username);
                    }
                })
            }
        }
    });
}