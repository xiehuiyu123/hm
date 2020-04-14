import http from "@/utils/http.js"
//企业模块
function getBusinessList(params) {
  return http({
    url: "/enterprise/list",
    method: "get",
    params
  });
}

//状态设置
function setStatus(data) {
  return http({
    url: "/enterprise/status",
    method: "post",
    data
  });
}

//企业删除
function removeBusiness(data) {
  return http({
    url: "/enterprise/remove",
    method: "post",
    data
  });
}

//企业添加
function addBusiness(data) {
  return http({
    url: "/enterprise/add",
    method: "post",
    data
  });
}

//企业编辑
function editBusiness(data) {
  return http({
    url: "/enterprise/edit",
    method: "post",
    data
  });
}

export { getBusinessList, setStatus, removeBusiness, addBusiness, editBusiness }
