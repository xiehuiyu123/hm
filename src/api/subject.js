import http from "@/utils/http.js"

function getSubjectData(params) {
  return http({
    url: "/subject/list",
    method: "get",
    params: params
  });
}

function setStatus(data) {
  return http({
    url: "/subject/status",
    method: "post",
    data
  });
}

function removeSubject(data) {
  return http({
    url: "/subject/remove",
    method: "post",
    data
  });
}

//新增学科
function addSubject(data) {
  return http({
    url: "/subject/add",
    method: "post",
    data
  });
}

//学科编辑
function editSubject(data) {
  return http({
    url: "/subject/edit",
    method: "post",
    data
  });
}

export { getSubjectData, setStatus, removeSubject, addSubject, editSubject }