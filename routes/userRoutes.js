const express = require('express');
const routes = express.Router();
const { register, all, singleUser, singleuserall, login, deleteById } = require('../controller/userController')
routes.get('/all', all)
routes.get('/singleuser/:id', singleUser)
routes.get('/get/singleuserfname/:firstName', singleuserall)
routes.get('/get/singleuserfname/:lastName', singleuserall)
routes.get('/get/singleuserfname/:email', singleuserall)
routes.get('/get/singleuserfname/:mobile_no', singleuserall)
// routes.get('/get/singleuserfname/:firstName', singleuserall)
routes.post('/register', register)
routes.post('/login', login)
// routes.put('/update/:id')
routes.delete('/delete/:id', deleteById)
module.exports = { routes } 