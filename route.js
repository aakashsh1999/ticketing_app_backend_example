const register = require('./controllers/user/controller_register');
const login = require('./controllers/user/controller_login');
const getUser = require('./controllers/user/controller_getuser')
const {forgotPassword, changePassword}= require('./controllers/user/reset_password')
const {registerValidator, loginValidator, resetPassword, convertPassword} = require('./validator');
const {t_insert,  t_update, t_delete, tickets} = require('./controllers/ticket/ticket');
const {send , a_insert ,a_select ,a_delete} = require('./controllers/account/account')
 const express = require('express');


const route = express.Router();


    route.post('/register',registerValidator, register);
    route.post('/login', loginValidator, login);
    route.get('/getuser',getUser)
    route.put('/forgot-password', resetPassword , forgotPassword);
    route.put('/reset-password', convertPassword , changePassword);
    // route.get('/getuser',getUser);

    // tickets

route.get('/t_display', tickets)
route.post('/t_insert', t_insert)
route.put('/t_update/:ticket_id', t_update)
route.delete('/t_delete/:ticket_id', t_delete)

//account 

route.get('/send', send)
route.post('/a_insert',a_insert)
route.get('/a_select', a_select)
route.delete('/a_delete/:acc_id',a_delete)

module.exports=route;

