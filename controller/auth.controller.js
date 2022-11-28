const db = require("../model");
const { ReasonPhrases, StatusCodes, } = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

exports.signUp = (req, res) => {

    const userObj = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: bcrypt.hashSync(req.body.password, 8)
    }

    let sql = `INSERT INTO user (name, email, mobile,password) VALUES (?,?,?,?)`
    let values = [userObj.name, userObj.email, userObj.mobile, userObj.password];

    db.all(sql, values, function (err, result) {
        if (err) {
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }
        else {
            console.log('User Created', result);
            res.status(StatusCodes.CREATED).send({
                status: StatusCodes.CREATED,
                response: ReasonPhrases.CREATED,
                data: result
            })

        }
    })

}

exports.signIn = (req, res) => {

    let userObj = {
        email: req.body.email,
        password: req.body.password
    }

    let sql = `SELECT * FROM user WHERE email= ?`;
    let params = [userObj.email];
    db.get(sql, params, (err, user) => {

        if (err) {
            console.log('Error while the checking the user is Exist or not', err);
        }
        else {
            if (user) {

                const result = bcrypt.compareSync(userObj.password, user.password);
                if (result) {
                    console.log("Password correct");
                    var token = jwt.sign(user.email, authConfig.secretKey);
                    user["token"] = token;

                    res.status(StatusCodes.OK).send({
                        status: StatusCodes.OK,
                        response: ReasonPhrases.OK,
                        data: user
                    })
                    return;

                } else {
                    console.log("Password wrong");
                    res.status(StatusCodes.UNAUTHORIZED).send({
                        status: StatusCodes.UNAUTHORIZED,
                        response: ReasonPhrases.UNAUTHORIZED,
                    })
                    return;
                }
            } else {
                res.status(StatusCodes.NOT_FOUND).send({
                    status: StatusCodes.NOT_FOUND,
                    response: ReasonPhrases.NOT_FOUND
                });
                return;
            }
        }
    })
}

exports.getUser = (req, res) => {

    let sql = `SELECT * FROM user WHERE id = ?`;
    let params = [req.params.id];
    db.get(sql, params, (err, user) => {
        if (err) {
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        } else {
            if (user) {
                res.status(StatusCodes.OK).send({
                    status: StatusCodes.OK,
                    response: ReasonPhrases.OK,
                    data: user
                })
                return;
            } else {
                res.status(StatusCodes.NOT_FOUND).send({
                    status: StatusCodes.NOT_FOUND,
                    response: ReasonPhrases.NOT_FOUND
                });
                return;
            }

        }
    })
}

exports.getAllUser = (req, res) => {

    let sql = `SELECT * FROM user`;
    let params = [];
    db.all(sql, params, (err, users) => {
        if (err) {
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        } else {
            if (users) {
                res.status(StatusCodes.OK).send({
                    status: StatusCodes.OK,
                    response: ReasonPhrases.OK,
                    data: users
                })
                return;
            } else {
                res.status(StatusCodes.NOT_FOUND).send({
                    status: StatusCodes.NOT_FOUND,
                    response: ReasonPhrases.NOT_FOUND
                });
                return;
            }

        }
    })
}

exports.updateUser = (req, res) => {

    let userObj = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: bcrypt.hashSync(req.body.password, 8)
    }


    let sql = `UPDATE user set 
                name = coalesce(?,name), 
                email = coalesce(?,email), 
                mobile = coalesce(?,mobile),
                password = coalesce(?,password)
                WHERE id = ?`;
    let params = [userObj.name, userObj.email, userObj.mobile, userObj.password, req.params.id];
    db.get(sql, params, (err) => {
        if (err) {
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        } else {

            res.status(StatusCodes.ACCEPTED).send({
                status: StatusCodes.ACCEPTED,
                response: ReasonPhrases.ACCEPTED
            })
            return;

        }
    })
}

exports.deleteUser = (req, res) => {


    let sql = `DELETE FROM user WHERE id = ?`;
    let params = [req.params.id];
    db.get(sql, params, (err) => {
        if (err) {
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        } else {

            res.status(StatusCodes.OK).send({
                status: StatusCodes.OK,
                response: ReasonPhrases.OK
            })
            return;

        }
    })
}