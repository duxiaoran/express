var express = require('express');

//import {ERR} from '../../config/error.config.js';


var apiv1 = express.Router();
var request = require("request");
var rp = require('request-promise');


apiv1.post('/register', require('./register.api').register);
apiv1.post('/listUser', require('./user.api').getUserList);
apiv1.post('/userInfo', require('./user.api').getUserInfoDetail);
apiv1.post('/updateUser', require('./user.api').updateUserInfo);
apiv1.post('/deleteUser', require('./user.api').deleteUserInfo);


apiv1.post('/createRole', require('./role.api').createRoleInfo);
apiv1.post('/roleInfo', require('./role.api').getRoleInfoDetail);
apiv1.post('/listRole', require('./role.api').getRoleList);
apiv1.post('/updateRole', require('./role.api').updateRoleInfo);
apiv1.post('/deleteRole', require('./role.api').deleteRoleInfo);


module.exports = apiv1;
