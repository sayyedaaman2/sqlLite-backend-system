const authController = require('../controller/auth.controller');

module.exports = (app)=>{

    //  POST /user/signup
    app.post('/user/signup/', authController.signUp);

    //  POST /user/signin
    app.post('/user/signin/', authController.signIn);

     //  GET /user/:id
    app.get('/user/:id/', authController.getUser);

     //  GET /users/
     app.get('/users/', authController.getAllUser);

     //  PUT /user/:id
     app.put('/user/:id/', authController.updateUser);

     //  DELETE /user/:id
     app.delete('/user/:id/', authController.deleteUser);

}