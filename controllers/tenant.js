var Boom = require('boom'), // HTTP Errors
    Tenant = require('../models/tenant').Tenant,
    tenant = require('../config/testData').tenant,
    Counter = require('../models/counter').Counter,
    async = require('async');
/** @module Controller for Tenant */


exports.CreateTenantData = {
    handler: function(request, reply) {
        console.log('Wait until you see success message');
        var i = 0;
        async.forever(function(callback) {
            counterValue(function(error, result) {
                var temp = JSON.parse(JSON.stringify(tenant));
                temp.name = result;
                var tenantData = new Tenant(temp);
                tenantData.save(function(err, result) {
                    if (err) console.log(err);
                    ++i;
                    if (i === 1000) {
                        console.log('Record Successfully created');
                        return reply("Record Successfully created");
                    }
                    callback();
                });
            });

        }, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Record Successfully created');
            }
        });

    }
}

var counterValue = function(callback) {
    Counter.update({
        collectionName: 'tenant',
        fieldName: 'name'
    }, {
        $inc: {
            counterValue: 1
        }
    }, function(err, result) {
        if (err) console.log(err);
        else {
            if (result == 0) {
                counter = new Counter({
                    'collectionName': 'tenant',
                    'fieldName': 'name',
                    'counterValue': 0
                });
                counter.save(function(err, res) {
                    var name = "tenant" + res.counterValue;
                    callback(err, name);
                });
            } else {
                Counter.findOne({
                    collectionName: 'tenant',
                    fieldName: 'name'
                }, function(err, res) {
                    if (res) {
                        var name = "tenant" + res.counterValue;
                        callback(err, name);
                    }
                })
            }
        }
    });
}