import {User} from '../../models/user.model';
import {Role} from '../../models/role.model';


export async function getUserInfo(id, username) {

  let result = {};

  let params = {};

  if (!id && !username) {
    result = {
      status: 10012,
      errMsg: "参数不能为空"
    }
    return result
  }

  if (id) {
    params._id = id;
  }

  if (username) {
    params.username = username;
  }

  await User.findOne(params).exec().then(async (doc) => {
    if (doc) {

      let user = doc.toObject();

      delete user.password;

      await Role.findById(user.roleId).then((roleDoc) => {

        if (roleDoc) {
          user.roleInfo = roleDoc;
        }

      });

      result = {
        code: 200,
        result: user
      };

    } else {

      result = {
        code: 10012,
        errMsg: "用户不存在"
      };

    }

  }, (err) => {
    console.log(err);
    result = {
      code: 10012,
      errMsg: "用户查找失败"
    };
  });

  return result;

}


export async function updateUser(id, info) {

  let result = {};

  if (!id && !info) {
    result = {
      code: 10012,
      errMsg: "参数不能为空"
    }
    return result;
  }

  let validParam = ['password', 'roleId', 'email', 'mobile'];


  await User.findById(id).exec().then(async (doc) => {

    if (doc) {

      for (let key in info) {
        if (validParam.includes(key)) {
          doc[key] = info[key];
        }

      }

      await doc.save().then((savedDoc) => {

        let user = savedDoc.toObject();

        delete user.password;

        result = {
          code: 200,
          result: user
        };

      }, (err) => {
        console.log(err);
        result = {
          code: 10012,
          errMsg: "更新失败"
        };
      });


    } else {

      result = {
        code: 10012,
        errMsg: "用户不存在"
      };

    }

  }, (err) => {
    console.log(err);
    result = {
      code: 10012,
      errMsg: "用户查找失败"
    };
  });

  return result;

}

export async function deleteUser(id) {

  let result = {};

  if (!id) {
    result = {
      code: 10012,
      errMsg: "参数不能为空"
    }
    return result;
  }

  await User.remove({_id: id}).then(async (doc) => {

    result = {
      code: 200,
      result: null,
      msg: "删除成功"
    };

  }, (err) => {
    console.log(err);
    result = {
      code: 10012,
      errMsg: "删除失败"
    };
  });

  return result;

}

export async function listUser(id, username, roleId, skip, limit) {

  let result = {};

  let params = {};

  if (id) {
    params._id = id;
  }

  if (username) {
    params.username = username;
  }

  if (roleId) {
    params.roleId = roleId;
  }

  let otherParam = {};

  if (skip) {
    otherParam.skip = parseInt(skip);
  }
  if (limit) {
    otherParam.limit = parseInt(limit);
  }

  let list = [];

  let total = 0;

  await User.count(params).then(async (docCount) => {

    console.log(docCount);

    total = docCount;


  }, (err) => {
    console.log(err);
    result = {
      code: 10012,
      errMsg: "查询失败"
    };
  });

  await User.find(params, {}, otherParam).then(async (docList) => {
    if (docList) {
      for (let i = 0; i < docList.length; i++) {

        let user = docList[i].toObject();
        delete user.password;
        await Role.findById(user.roleId).then((roleDoc) => {

          if (roleDoc) {
            user.roleInfo = roleDoc;
          }

        });

        list.push(user);

      }
    }

    result = {
      code: 200,
      result: list,
      total: total,
    };


  }, (err) => {
    console.log(err);
    result = {
      code: 10012,
      errMsg: "查询失败"
    };
  });

  return result;

}