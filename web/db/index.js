const mongoose = require('mongoose');

const connect = () => {
  return new Promise((resolve, reject) => {
    if(process.env.NODE_ENV === 'test') {
      mongoose.connect(process.env.DB_URI,
        { useNewUrlParser: true, 
          useCreateIndex: true, 
          useUnifiedTopology: true,
          useFindAndModify: false })
        .then((res, err) => {
          if(err) return reject(err);
          resolve();
        });
    } else {
      mongoose.connect(process.env.DB_URI,
        { useNewUrlParser: true, 
          useCreateIndex: true, 
          useUnifiedTopology: true,
          useFindAndModify: false })
        .then((res, err) => {
          if(err) return reject(err);
          resolve();
        });
    }
  });
}

const close = () => {
  return mongoose.connection.close();
}

module.exports = {connect, close};