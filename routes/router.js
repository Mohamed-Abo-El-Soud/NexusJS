var express = require("express");
var router = express.Router();

//...
router.get("/",function (req, res) {
    res.render('index', { title: 'Nexus' });
    // res.send('this is the base...');
})

module.exports = router;