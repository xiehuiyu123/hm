import http from "@/utils/http.js"
//登录模块
function userLogin(data) {
  return http({
    url: "/login",
    method: "post",
    data
  });
}

export { userLogin }
