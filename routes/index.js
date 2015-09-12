//controllers...
var static_pages = require("../controllers/static_pages");

var routes = {};

routes["/"] = { controller: static_pages, action: "home" };
routes["/contact"] = { controller: static_pages, action: "contact" };
routes["/about"] = { controller: static_pages, action: "about" };
routes["/help"] = { controller: static_pages, action: "help" };


module.exports = function(app) {
    for (var path in routes) {
        (function(item){
            app.get(path, function(req, res, next) {
                item.controller(app,item.action, req, res, next);
            });
        })(routes[path]);
    }
};