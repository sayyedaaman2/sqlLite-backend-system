const authController = require('../controller/auth.controller');
const { validateBody } = require('../middleware/index');
module.exports = (app) => {

    //  POST /user/signup       -->     SignUp User
    app.post('/user/signup/', validateBody.validateSignUp, authController.signUp);

    //  POST /user/signin       -->     Login User
    app.post('/user/signin/', validateBody.validateSignIn, authController.signIn);

    //  GET /user/:id          -->     get single user
    app.get('/user/:id/', authController.getUser);

    //  GET /users/            -->     get all users
    app.get('/users/', authController.getAllUser);

    //  PUT /user/:id          -->     update the user
    app.put('/user/:id/', authController.updateUser);

    //  DELETE /user/:id       -->     delete the user
    app.delete('/user/:id/', authController.deleteUser);


    //   GET  /users/add   --> all user with address
    app.get('/users/add', authController.getAllUserwithAdd);


    //   GET /user/add/:id   -->  single user with address
    app.get('/user/add/:id', authController.getUserwithAdd);


}