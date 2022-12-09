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

        db.run(`DROP TABLE IF EXISTS user`);
        db.run(`DROP TABLE IF EXISTS address`);

        function init() {

            console.log('init function')
            
            //User data;
            db.get('SELECT COUNT(*) FROM user',
                function (err, data) {
                    // console.log("data", data);
                    if (err) {
                        console.log('Some Error While Check the user data !', err);
                        return;
                    }
                    else {
                        console.log(data["COUNT(*)"]);
                        if (data["COUNT(*)"] == 0) {
                            var insertadd = `INSERT INTO address(city, state, country) VALUES (?,?,?)`;
                            var insert = 'INSERT INTO user(name, email, mobile, password, address) VALUES (?,?,?,?,?)'

                            db.run(insertadd, ["Mumbai", "Maharastra", "India"], function (err) {
                                if (err) {
                                    console.log(`Error while Storing the Address of User : ${err}`);
                                    return;
                                }
                                else {
                                    db.run(insert, ['user1', 'user1@gmail.com', 1234567891, bcrypt.hashSync('user1@123', 8), this.lastID]
                                        , function (err) {
                                            if (err) {
                                                console.log(`Error while intializing the User : ${err}`);
                                                return;
                                            } else {
                                                console.log("id :", this.lastID);
                                            }
                                        })
                                }
                            })
                            db.run(insertadd, ["Mumbai", "Maharastra", "India"], function (err) {
                                if (err) {
                                    console.log(`Error while Storing the Address of User : ${err}`);
                                    return;
                                }
                                else {
                                    db.run(insert, ['user2', 'user2@gmail.com', 1234567892, bcrypt.hashSync('user2@123', 8), this.lastID]
                                        , function (err) {
                                            if (err) {
                                                console.log(`Error while intializing the User : ${err}`);
                                                return;
                                            } else {
                                                console.log("id :", this.lastID);
                                            }
                                        })
                                }
                            })



                            console.log('User Table Intialized Succeessfully');
                        }
                        else {
                            console.log('User already Initializa Successfully')
                        }
                    }
                }
            )
        }
        //User Table
        db.run(`CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL,
            email text UNIQUE NOT NULL,
            mobile INTEGER UNIQUE NOT NULL,
            password text NOT NULL,
            address INTEGER ,
            FOREIGN KEY (address)
            REFERENCES address(id)
            )`,
            function (err) {

                if (err) {
                    console.log('Error while creating User Table', err);
                    return;
                }
                else {
                    console.log('Table Created Successfully');
                }
            }
        )
        // Address Table
        db.run(`CREATE TABLE IF NOT EXISTS address 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            city text,
            state text,
            country text
        )`,
            function (err) {
                if (err) {
                    console.log(`Error while creating Address Table`)
                } else {
                    console.log(`Address Table Created Successfully`);
                    init();
                }
            })



    }
});




module.exports = db;