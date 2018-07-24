import {createRole, updateRole, deleteRole, listRole, getRoleInfo} from '../../service/user/roleService';


async function getRoleList(req, res) {

  let params = req.body;

  let skip = params.$skip || 0;
  let limit = params.$limit || 10;
  let roleName = params.roleName;

  console.log(params);

  let result = await listRole(roleName, skip, limit);

  result.params = params;

  res.send(result);

}

async function getRoleInfoDetail(req, res) {

  let params = req.body;

  let id = params.id;
  let roleName = params.roleName;

  console.log(params);

  let result = await getRoleInfo(id, roleName);

  result.params = params;

  res.send(result);

}

async function updateRoleInfo(req, res) {

  let params = req.body;

  let id = params.id;
  let buildings = params.buildings;
  let menus = params.menus;

  console.log(params);

  let result = await updateRole(id, buildings, menus);

  result.params = params;

  res.send(result);

}

async function createRoleInfo(req, res) {

  let params = req.body;

  let roleName = params.roleName;
  let buildings = params.buildings;
  let menus = params.menus;

  console.log(params);

  let result = await createRole(roleName, buildings, menus);

  result.params = params;

  res.send(result);

}

async function deleteRoleInfo(req, res) {

  let params = req.body;

  let id = params.id;

  console.log(params);

  let result = await deleteRole(id);

  result.params = params;

  res.send(result);

}

module.exports = {
  getRoleList,
  getRoleInfoDetail,
  updateRoleInfo,
  createRoleInfo,
  deleteRoleInfo
}