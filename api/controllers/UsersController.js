let Users = require('../models/Users');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const createUser = (userParams) => { 
  return new Promise((resolve, reject) => {
    Users.findOne({emailId: userParams.emailId}, (err, user)=> {
      if(err){ 
        reject(err);
      }
      if (user) {
          // username already exists
          reject('Email Id "' + userParams.emailId + '" is already taken');
      } else {
          create();
      }
    });

    function create() {
       let newUser = new Users({
          "firstName" : userParams.firstName,
          "lastName"  : userParams.lastName,
          "emailId"   : userParams.emailId,
          "contactNo" : userParams.contactNo,
          "password"  : userParams.password,

       });
       newUser.save(function (err, data) {
          if (err){
            reject(err.name + ': ' + err.message);
          } 
          resolve(data);
      });
    }
  });
};

const updateUser = (req) => {
	 const body = req.body;
   return new Promise((resolve, reject) => {
      Users.update({emaiId:req.query.eamilId}, body, (err, data) => {
          if(err){
            reject(err);
          }
          return resolve(body);
      });
   }); 
};

const findUser = (query) => {
	return new Promise((resolve, reject) => {
      Users.find(query,(err, data) => {
          if(err){
            reject(err);
          }
          resolve(data);
      })
  });
};


const deleteUser = (query)=> {
  return new Promise((resolve, reject ) => {
      Users.remove(query,(err, data)=> {
          if(err){
            reject(err);
          }
          return resolve(data);
      });
  });
}

class UsersController {
  createUser(body) {
    return createUser(body);
  }

  updateUser(req) {
    return updateUser(req);
  }

  findUser(req) {
    return findUser(req);
  }

  deleteUser(query) {
    return deleteUser(query);
  }

}

module.exports = UsersController;
