import http from "@/utils/http.js"
//登录模块
function getSubjectData(params) {
  return http({
    url: "/subject/list",
    method: "get",
    params:params
  });
}

export { getSubjectData }