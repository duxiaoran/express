const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const USER_SCHEMA_TABLE = 'user';

const config = {
  //timestamps: true,
  toJSON: {getters: true, virtual: true},
  versionKey: "__user_V",
  strict: true,
  toObject: {
    virtuals: true
  },
  collection: USER_SCHEMA_TABLE
};
//db.consumers.insert({M_Code:'123456789',"password" : "$2a$10$u3bW54FfILTQM..5IsjZx.0YPkGslrhGI.meSlfDrBqUuW14jtRN6",username:"磐硕科技",tel:"18500338808",identity:"110108111111111111", consumer_state: 10, company_id:'123'})



let userSchema = new mongoose.Schema({

  username: {
    type: String,
    description: "用户姓名",
    required: [true, "用户姓名不能为空！"]
  },
  email: {
    type: String,
    description: "邮箱",
    //required: [true, "邮箱不能为空！"]
  },
  mobile: {
    type: String,
    description: "电话",
    //required: [true, "手机不能为空！"]
  },
  password: {
    type: String,
    description: "登陆密码",
    required: [true, "密码不能为空！"]
  },
  roleId: {
    type: String,
    description: "角色ID",
  },

}, config);

userSchema.pre('save', function(next) {
  let user = this;
  console.log('user');
  console.log(user);
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    console.log('user.password: '+user.password);
    console.log('salt: '+salt);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        console.log('err2:');
        console.log(err);
        return next(err);
      }

      user.password = hash;
      console.log('hash: '+hash);
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.virtual('id').get(function () {
  return this._id;
});
const User = mongoose.model(USER_SCHEMA_TABLE, userSchema);

export {
  User
}