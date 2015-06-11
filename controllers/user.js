var Boom = require('boom'),
    User = require('../models/user').User,
    Tenant = require('../models/tenant').Tenant,
    Counter = require('../models/counter').Counter,
    async = require('async'),
    userData = require('../config/testData').user;


exports.CreateUser = {
    handler: function(request, reply) {
        console.log('Wait until you see success message');
        var i = 0;
        Tenant.find({}).exec(function(err, tenant) {
            if (!err) {
                async.forever(function(callback) {
                    var local = userData;
                    local.tenantId = tenant[0]._id;

                    counterValue(function(error, result) {
                        var temp = JSON.parse(JSON.stringify(userData));
                        temp.username = result;
                        var user = new User(temp);
                        user.save(function(err, user) {
                            if (!err) {
                                ++i;
                                if (i == 9000) {
                                    console.log('Users Record Successfully created');
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
                        console.log('User Record Successfully created');

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
                    var tenantId = "aaa" + res.counterValue;
                    callback(err, tenantId);
                });
            } else {
                Counter.findOne({
                    collectionName: 'user',
                    fieldName: 'username'
                }, function(err, res) {
                    if (res) {
                        var tenantId = "aaa" + res.counterValue;
                        callback(err, tenantId);
                    }
                })
            }
        }
    });
}