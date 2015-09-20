// mongoose version

// var actions = {
//     all: function (app, req, res, onSuccess, onError){
//         var Account = require('mongoose').model('Account');
//         Account.find({}, function(err, accounts) {
//             if (err) {
//                 return onError(err);
//             }
//             else {
//                 res.json(accounts);
//             }
//         });
//     },
//     show: function (app, req, res, onSuccess, onError){
//         var Account = require('mongoose').model('Account');
//         Account.findOne({
//                 _id: req.params.id
//             },
//             function(err, account) {
//                 if (err) {
//                     return onError(err);
//                 }
//                 else {
//                     res.json(account);
//                 }
//             }
//         );
//     },
//     new: function (app, req, res, onSuccess, onError){
//         onSuccess(null);
//     },
//     create: function (app, req, res, onSuccess, onError){
//         var Account = require('mongoose').model('Account');
//         var account = new Account(req.body);
//         account.save(function(err) {
//         if (err) {
//             return onError(err);
//         }
//         else {
//             return res.json(account);
//         }
//         });
//     }
// }

// sql version

var models  = require('../models');

var actions = {
    all: function (app, req, res, onSuccess, onError){
        // var Account = require('mongoose').model('Account');
        // Account.find({}, function(err, accounts) {
        //     if (err) {
        //         return onError(err);
        //     }
        //     else {
        //         res.json(accounts);
        //     }
        // });
        
        var pageNumber = req.params.page;
        var pagination = 30; 
        models.Account.all({
            offset: ((pageNumber-1) * pagination),
            limit: pagination
        }).then(function(accounts) {
            res.json(accounts);
        });
        
        
        
    },
    show: 
    // function (app, req, res, onSuccess, onError){
    //     var Account = require('mongoose').model('Account');
    //     Account.findOne({
    //             _id: req.params.id
    //         },
    //         function(err, account) {
    //             if (err) {
    //                 return onError(err);
    //             }
    //             else {
    //                 res.json(account);
    //             }
    //         }
    //     );
    // },
        function (app, req, res, onSuccess, onError) {
            models.Account.findOne({ where: {id: req.params.id} }).then(function(account) {
                // project will be the first entry of the Projects table with the title 'aProject' || null
                res.json(account);
            });
        },
    new: function (app, req, res, onSuccess, onError){
        onSuccess(null);
    },
    create: 
    // function (app, req, res, onSuccess, onError){
    //     var Account = require('mongoose').model('Account');
    //     var account = new Account(req.body);
    //     account.save(function(err) {
    //     if (err) {
    //         return onError(err);
    //     }
    //     else {
    //         return res.json(account);
    //     }
    //     });
    // }
    function (app, req, res, onSuccess, onError){
        models.Account.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            telephone: req.body.telephone,
            email: req.body.email,
            password: req.body.password,
        }).then(function() {
            console.log("account created");
            res.redirect('/');
        });
    }
}


module.exports = function(app,action, req, res, next){
    if(actions[action]){
        actions[action](app, req, res, function(data){
            res.render('accounts/' + action, data); 
        }, function(err){
            next(err);
        });
    } else {
        next();
    }
}


