

module.exports = function(app,action, req, res, next){
    // TODO: call controller action
    res.render('static_pages/' + action, { title: action });
}