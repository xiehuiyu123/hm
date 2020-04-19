import http from "@/utils/http.js"

function getQuestion(params) {
  return http({
    url: "/question/list",
    method: "get",
    params
  });
}

//改变状态
function setStatus(data) {
  return http({
    url: "/question/status",
    method: "post",
    data
  });
}

//新增题目
function addQuestion(data) {
  return http({
    url: "/question/add",
    method: "post",
    data
  });
}

//新增题目
function removeQuestion(data) {
  return http({
    url: "/question/remove",
    method: "post",
    data
  });
}

// 编辑题目
function editQuestion(data) {
  return http({
    url: "/question/edit",
    method: "post",
    data
  });
}

export { getQuestion, setStatus, addQuestion, removeQuestion, editQuestion }
