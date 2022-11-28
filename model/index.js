const sqlite3 = require('sqlite3').verbose();
const dbConfig = require('../config/db.config');
const bcrypt = require('bcrypt');

const dbSource = dbConfig.DB_SOURSE;


const db = new sqlite3.Database(dbSource, (err) => {

    if (err) {
        //Cannot connect database
        console.log(err.message);
        throw err;
    }
    else {
        console.log('Connected to the SQLite Database');


        db.run(`CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL,
            email text UNIQUE NOT NULL,
            mobile INTEGER UNIQUE NOT NULL,
            password text NOT NULL
            )`,
            function (err) {
                console.log('Table Created Successfully');
                if (err) {
                    console.log('Error while creating Table', err);
                }
                else {
                    db.get('SELECT COUNT(*) FROM user',
                        function (err, data) {
                            // console.log("data", data);
                            if (err) {
                                console.log('Some Error While Check the user data !', err);
                            }
                            else {
                                console.log(data["COUNT(*)"]);
                                if (data["COUNT(*)"] == 0) {
                                    var insert = 'INSERT INTO user(name, email, mobile,password) VALUES (?,?,?,?)'
                                    db.run(insert, ['user1','user1@gmail.com', 1234567891, bcrypt.hashSync('user1@123',8)])
                                    db.run(insert, ['user2','user2@gmail.com', 1234567892, bcrypt.hashSync('user2@123',8)])

                                    console.log('User Table Intialized Succeessfully');
                                } else {
                                    console.log('User already Initializa Successfully')
                                }
                            }
                        }
                    )
                }
            }
        )
    }
});




module.exports = db;