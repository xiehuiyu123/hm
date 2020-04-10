import http from "@/utils/http.js"
//登录模块
function getInfo() {
  return http({
    url: "/info",
    method: "get",
  });
}
function logOut() {
  return http({
    url: "/logout",
    method: "get",
  });
}

export { getInfo, logOut }