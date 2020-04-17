
import http from "@/utils/http.js"

function getUserList(params) {
  return http({
    url: "/user/list",
    method: "get",
    params
  });
}

//用户设置
function setUser(data) {
  return http({
    url: "/user/status",
    method: "post",
    data
  });
}

//用户删除
function removeUser(data) {
  return http({
    url: "/user/remove",
    method: "post",
    data
  });
}

//用户添加
function addUser(data) {
  return http({
    url: "/user/add",
    method: "post",
    data
  });
}

//用户编辑
function editUser(data) {
  return http({
    url: "/user/edit",
    method: "post",
    data
  });
}

export { getUserList, setUser, removeUser, addUser, editUser }
