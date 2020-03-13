const mongoose = require('mongoose');

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.DB_URI,
      { useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true,
      useFindAndModify: true })
      .then((res, err) => {
        if(err) return reject(err);
        resolve();
      });
  });
}

const close = () => {
  return mongoose.close();
}

module.exports = {connect, close};