import {getUserInfo, listUser, updateUser, deleteUser} from '../../service/user/userService';


async function getUserList(req, res) {

  let params = req.body;

  let skip = params.$skip || 0;
  let limit = params.$limit || 10;
  let id = params.id;
  let username = params.username;
  let roleId = params.roleId;

  console.log(params);

  let result = await listUser(id, username, roleId, skip, limit);

  result.params = params;

  res.send(result);

}

async function getUserInfoDetail(req, res) {

  let params = req.body;

  let skip = params.$skip || 0;
  let limit = params.$limit || 10;
  let id = params.id;
  let username = params.username;

  console.log(params);

  let result = await getUserInfo(id, username);

  result.params = params;

  res.send(result);

}

async function updateUserInfo(req, res) {

  let params = req.body;

  let id = params.id;
  let info = params.info;

  console.log(params);

  let result = await updateUser(id, info);

  result.params = params;

  res.send(result);

}

async function deleteUserInfo(req, res) {

  let params = req.body;

  let id = params.id;

  console.log(params);

  let result = await deleteUser(id);

  result.params = params;

  res.send(result);

}

module.exports = {
  getUserList,
  getUserInfoDetail,
  updateUserInfo,
  deleteUserInfo
}