const sqlite3 = require('sqlite3').verbose();
const dbConfig = require('../config/db.config');

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
            name text,
            email text UNIQUE,
            mobile INTEGER)`,
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
                                    var insert = 'INSERT INTO user(name, email, mobile) VALUES (?,?,?)'
                                    db.run(insert, ["Pankaj Sharma", "sharmapankaj@gmail.com", 9874563215])
                                    db.run(insert, ["Neha Sharma", "nehasharma@gmail.com", 1236547892])
                                    console.log('User Table Intialized');
                                } else {
                                    console.log('User already Initializa !')
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