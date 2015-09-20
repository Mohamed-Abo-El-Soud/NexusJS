var actions = {
    // TODO: do middleware
    home: function (app, req, res, onSuccess, onError){
        onSuccess(this);
        // onSuccess(null);
        // return null;
    },
    about: function (app, req, res, onSuccess, onError){
        onSuccess(null);
        return null;
    },
    contact: function (app, req, res, onSuccess, onError){
        onSuccess(null);
        return null;
    },
    help: function (app, req, res, onSuccess, onError){
        onSuccess(null);
        return null;
    }
}



module.exports = function(app,action, req, res, next){
    if(actions[action]){
        actions[action].bind(this)(app, req, res, function(data){
            res.render('static_pages/' + action, data); 
        }, function(err){
            next(err);
        });
    } else {
        next();
    }
};