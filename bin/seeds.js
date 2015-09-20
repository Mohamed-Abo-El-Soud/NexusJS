// function getMethods(obj) {
//   var result = [];
//   for (var id in obj) {
//     try {
//       if (typeof(obj[id]) == "function") {
//         result.push(id + ": " + obj[id].toString());
//       }
//     } catch (err) {
//       result.push(id + ": inaccessible");
//     }
//   }
//   return result;
// }

// function delay(time) {
//   var d1 = new Date();
//   var d2 = new Date();
//   while (d2.valueOf() < d1.valueOf() + time) {
//     d2 = new Date();
//   }
// }

var _ = require("underscore");
var Promise = require("bluebird");
var faker = require('faker');
var moment = require("moment");
moment().format();

module.exports = function(db){
  var fixtureAccounts = [];
  var fixtureMessages = [];
  var Account = db.Account;
  // var Message = db.Message;
  
  fixtureAccounts.push(Account.create({
    firstName: "Example",
    lastName: "User",
    email: "example@railstutorial.org",
    telephone: "23748928",
    password: "foobar",
    admin: true
  }));
  _(99).times(function(n){
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
    var email = "example-"+(n+1)+"@nodejstutorial.org";
    var password = "password";
    var telephone = faker.phone.phoneNumber();
    fixtureAccounts.push(Account.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        telephone: telephone,
        password: password
    }));
  });
  Promise.all(fixtureAccounts).then(function(accounts){
    return Account.findAll({limit: 6, order: [['createdAt', 'DESC']]});
  })
  .then(function(accounts) {
    _(50).times(function(n) {
      var title = faker.lorem.words(1)[0];
      var content = faker.lorem.sentences(5); 
      _.each(accounts,function(account,index,accounts){
        fixtureMessages.push(function(){
          return account.createMessage({
            title: title,
            content: content,
            createdAt: moment().subtract(n+1,'d').toDate()
          });
        }()
        );
      });
    });
    return fixtureMessages;
  })
  .all().then(function (results) {
    return db.Message.findAndCountAll();
  })
  .then(function (results) {
    console.log("there are "+results.count+" messages.");
  })
  ;
        
  
};