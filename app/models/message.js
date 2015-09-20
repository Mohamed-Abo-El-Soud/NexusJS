
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    title: { 
      type: DataTypes.STRING,
      max: 100
    },
    content: { 
      type: DataTypes.STRING,
      max: 2000
    },
    category: { 
      type: DataTypes.STRING
    }
  },{
    hooks: {
      beforeCreate: function(message) {
        message.category = "unread";
      }
    },
    classMethods: {
        // account has many messages as 'sender_id'
        // message belongs to account as 'sender_id'
        // message belongs to account as 'reciever_id'
      associate: function(models) {
        // Message.belongsTo(models.Account, {as: "senderId" });
        Message.belongsTo(models.Account, {as: "reciever" });
      }
    }
  });
  return Message;
};