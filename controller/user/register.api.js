import {User} from '../../models/user.model.js';
const ERR = require("../../config/error.config.js");
let jwt = require('jsonwebtoken');

function register(req, res) {
  let params = req.body;
  console.log(req.body);

  let username = params.username;
  let password = params.password;
  let repassword = params.repassword;

  let mobile = params.mobile;
  let email = params.email;
  let roleId = params.roleId;

  if (!username || username == "" || !password || password == "") {

    res.send({
      code: 10011,
      errMsg: '用户名和密码不能为空'
    });
    return;

  }

  if (password !== repassword) {
    res.send({
      code: 10011,
      errMsg: '两次输入密码不一致'
    });
    return;
  }

  User.findOne({username: username}).exec().then((doc) => {

    if (doc) {
      //用户名已存在
      res.send({
        code: 10001,
        errMsg: "用户已存在"
      });
    } else {

      let user = {
        username: username,
        password: password,
      };
      if (email) {
        user.email = email;
      }
      if (mobile) {
        user.mobile = mobile;
      }
      if (roleId) {
        user.roleId = roleId;
      }
      console.log(user);
      console.log(3333333333);
      User.create(user).then((doc)=> {
        if (doc) {
          res.send({
            code: 200,
            data: '用户创建成功'
          });
        }
      }, (err) => {
        console.log(err);
        res.send({
          code: 10012,
          errMsg: "创建失败"
        });
      });

    }

  });

}

module.exports = {
  register
};