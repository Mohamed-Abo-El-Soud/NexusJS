// mongoose version...

// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema;

// var AccountSchema = new Schema({
//     firstName: String,
//     lastName: String,
//     email: String,
//     telephone: String,
//     password: String,
// });

// mongoose.model('Account', AccountSchema);



module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    firstName: { 
      type: DataTypes.STRING,
      notEmpty: false,
      allowNull: false,
    },
    lastName: { 
      type: DataTypes.STRING,
      notEmpty: false,
      allowNull: false,
    },
    email: { 
      type: DataTypes.STRING,
      notEmpty: false,
      allowNull: false,
    },
    telephone: DataTypes.STRING,
    password: { 
      type: DataTypes.STRING,
      notEmpty: false,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },{
    validate: {
      lowerCaseEmail: function(){
        this.email = this.email.toLowerCase();
        // if (this.firstName == "" || this.lastName == "")
      }
    },
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['email']
      },
      {
        unique: false,
        fields: ['firstName','lastName']
      }
    ],
    classMethods: {
        // account has many messages as 'sender_id'
        // message belongs to account as 'sender_id'
        // message belongs to account as 'reciever_id'
      associate: function(models) {
        Account.hasMany(models.Message, {as: "Messages", foreignKey : "senderId"});
      }
    },
    instanceMethods: {
      feed: function(db){
        return db.Message.findAll({
          where: { recieverId: this.id }
        });
      },
      category: function(db, categories){
        var result = [];
        
        categories.forEach(function(category){
          result.push({category: category});
        });
        return db.Message.findAll({
          where: {
            $or: result
          }
        });
      }
    }
  });
  return Account;
};