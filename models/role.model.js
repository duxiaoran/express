const mongoose = require('mongoose');
const SALT_WORK_FACTOR = 10;

const ROLE_SCHEMA_TABLE = 'role';

const config = {
  //timestamps: true,
  toJSON: {getters: true, virtual: true},
  versionKey: "__role_V",
  strict: true,
  toObject: {
    virtuals: true
  },
  collection: ROLE_SCHEMA_TABLE
};



let roleSchema = new mongoose.Schema({

  roleName: {
    type: String,
    description: "角色名",
  },
  buildings: {
    type: [String],
    description: "大楼",
  },
  menus: {
    type: [String],
    description: "菜单",
  },

}, config);


roleSchema.virtual('id').get(function () {
  return this._id;
});
const Role = mongoose.model(ROLE_SCHEMA_TABLE, roleSchema);

export {
  Role
}