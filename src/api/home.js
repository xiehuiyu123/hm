import http from "@/utils/http.js"
//登录模块
function getInfo() {
  return http({
    url: "/info",
    method: "get",
  });
}

export { getInfo }