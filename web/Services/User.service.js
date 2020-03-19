const Account = require('../db/Models/Account.model');

class UserService {
    async newUser(userData) {
      try {
        const user = await Account.findOne({username: userData.username}).exec();
        console.log(user)
        if(user===null) {
          const newUser = new Account({ ...userData });
          newUser.save();
          return newUser;
        } else {
          return null;
        }
      } catch(error) {
        console.error(error);
      }
    }

    async findUser(username) {
      try {
        const user = await Account.findOne({username: username}).exec();
        return user;
      } catch(error) {
        console.error(error)
      }
    }
}

module.exports = new UserService();