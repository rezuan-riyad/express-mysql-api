'use strict'
const con = require('./db');

// constructor
const User = function(user){
  this.name = user.name;
  this.address = user.address;
}

User.create = (newUser ) => new Promise((resolve, reject) => {
  con.query("INSERT INTO users SET ?", newUser, (error, result) => {
    if (error) {
      reject(error);
    }
    resolve({ id: result.insertId, ...newUser })
  })
})

User.findById = (userId) => new Promise((resolve, reject) =>{
  let sql = `SELECT * FROM users WHERE id=${userId}`;
  con.query(sql, (error, result) => {
    if(error) reject(error)
    if(!result.length){
      reject({ type: "Not Found" })
    }
    resolve(result[0]);
  })
})

User.findAll = () => new Promise((resolve, reject) => {
  con.query("SELECT * FROM users", (error, result) => {
    if(error) reject(error)
    resolve(result);
  })
})

User.updateById = (user, id) => new Promise( (resolve, reject) => {
  const sql = `UPDATE users SET name = ?, address = ? WHERE id= ?`;
  con.query(sql, [user.name, user.address, id], (err, res) => {
    if(err) reject(err);
    resolve(res);
  })
})

User.remove = (userId) => new Promise( (resolve, reject) => {
  const sql = "DELETE FROM users WHERE id = ? ";
  con.query(sql, userId, (err, res) => {
    if(err) reject(err);
    if(res.affectedRows == 0){
      reject({ type: "Not Found" })
    }
    resolve(res);
  })
})

User.removeAll = () => new Promise( (resolve, reject) => {
  con.query( "DELETE FROM users", (error, result) => {
    if(error) reject(error);
    resolve(result)
  })
})

module.exports = User