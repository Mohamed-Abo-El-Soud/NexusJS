// app/routes/index.js

// utitlity modules
var _ = require("underscore");

// helper functions...
function isAction(action) {
    return function(element) {
        var options = element.options;
        if (!options) return true;
        var only = options.only;
        if (only){
          if (_.isArray(only)){
            for (var i = only.length; i--; ) {
              if (only[i] == action) return true;
            }
          } else if(_.isString(only) && (only == action))
          return true;
        }
        return false;  
    };
}

function checkIfAccountPresent() {
  // unless logged in (for now always false)
  if(!(false))
    this.account = this.account || this.Account.build();
    
}

//controllers...
var static_pages = require("../controllers/static_pages");
var accounts = require("../controllers/accounts");
var db = require("../models");

var getRoutes = {};
var postRoutes = {};
var deleteRoutes = {};
var beforeAction = [];

// example:
beforeAction.push({fn: checkIfAccountPresent, options: {only: "home"}});

getRoutes["/"] = { controller: static_pages, action: "home" };
getRoutes["/contact"] = { controller: static_pages, action: "contact" };
getRoutes["/about"] = { controller: static_pages, action: "about" };
getRoutes["/help"] = { controller: static_pages, action: "help" };
getRoutes["/accounts"] = { controller: accounts, action: "all" };
getRoutes["/accounts/:id"] = { controller: accounts, action: "show" };

postRoutes["/accounts"] = { controller: accounts, action: "create" };


module.exports = function(app) {
    for (var path in getRoutes) {
        (function(item){
          app.get(path, function(req, res, next) {
            var localScope = { Account: db.Account };
            var filteredActions = beforeAction.filter(isAction(item.action));
            _.each(filteredActions, function (element, index, list) {
              element.fn.bind(localScope)();
            });
            item.controller.bind(localScope)(app,item.action, req, res, next);
          });
        })(getRoutes[path]);
    }
    
    for (var path in postRoutes) {
        (function(item){
          app.post(path, function(req, res, next) {
            var localScope = { Account: db.Account };
            var filteredActions = beforeAction.filter(isAction(item.action));
            _.each(filteredActions, function (element, index, list) {
              element.fn.bind(localScope)();
            });
            item.controller.bind(localScope)(app,item.action, req, res, next);
          });
        })(postRoutes[path]);
    }
    
    // require('./accounts.server.routes.js')(app);
};