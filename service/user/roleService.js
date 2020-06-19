import {Role} from '../../models/role.model';


export async function createRole(roleName, buildings, menus) {

  let result = {};

  if (!roleName) {
    result = {
      code: 10012,
      errMsg: "角色名eeee不能为空"
    }
    return result
  }

  if(!buildings){
    buildings = [];
  }

  if(!menus){
    menus = [];
  }


  Role.findOne({roleName: roleName}).exec().then((doc) => {

    if (doc) {
      //用户名已存在
      result = {
        code: 10001,
        errMsg: "角色已存在"
      };
    } else {

      let role = {
        roleName: roleName,
        buildings: buildings,
        menus: menus,
      };

      Role.create(role).then((doc)=> {
        if (doc) {
          result = {
            code: 200,
            data: '角色创建成功'
          };
        }
      }, (err) => {
        console.log(err);
        result = {
          code: 10012,
          errMsg: "创建失败"
        };
      });

    }

  });

  return result;
}


export async function updateRole(id, buildings, menus) {

  let result = {};

  if (!id) {
    result = {
      code: 10012,
      errMsg: "ID不能为空"
    }
    return result
  }

  if(!buildings && !menus){
    result = {
      code: 10012,
      errMsg: "楼宇与菜单不能全为空"
    }
    return result
  }

  Role.findById(id).exec().then(async (doc) => {

    if (doc) {

      if(buildings){
        doc.buildings = buildings;
      }

      if(menus){
        doc.menus = menus;
      }

      await doc.save().then((savedDoc) => {
        result = {
          code: 200,
          result: savedDoc
        }

      }, (err)=>{

        console.log(err);
        result = {
          code: 10001,
          errMsg: "更新失败"
        }
      })

    } else {

      result = {
        code: 10001,
        errMsg: "角色不存在"
      }

    }

  });

  return result;
}


export async function deleteRole(id) {

  let result = {};

  if (!id) {
    result = {
      code: 10012,
      errMsg: "参数不能为空"
    }
    return result;
  }

  await Role.remove({_id: id}).then(async (doc) => {

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



export async function listRole(roleName, skip, limit) {

  let result = {};

  let params = {};


  if (roleName) {
    params.roleName = roleName;
  }

  let otherParam = {};

  if (skip) {
    otherParam.skip = parseInt(skip);
  }
  if (limit) {
    otherParam.limit = parseInt(limit);
  }

  let total = 0;

  await Role.count(params).then(async (docCount) => {

    console.log(docCount);

    total = docCount;


  }, (err) => {
    console.log(err);
    result = {
      code: 10012,
      errMsg: "查询失败"
    };
  });

  await Role.find(params, {}, otherParam).then(async (docList) => {

    result = {
      code: 200,
      result: docList,
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


export async function getRoleInfo(id, roleName) {

  let result = {};

  let params = {};

  if (!id && !roleName) {
    result = {
      code: 10012,
      errMsg: "参数不能为空"
    }
    return result
  }

  if (id) {
    params._id = id;
  }

  if (roleName) {
    params.roleName = roleName;
  }

  await Role.findOne(params).exec().then(async (doc) => {
    if (doc) {

      result = {
        code: 200,
        result: doc
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

