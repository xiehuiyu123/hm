import http from "@/utils/http.js"
//注册模块
function getPhoneCode(data) {
  return http({
    url: "/sendsms",
    method: "post",
    data: data,
  });
}

function register(data) {
  return http({
    url: "/register",
    method: "post",
    data      //data: data   
  })
}

// export default getPhoneCode;
export { getPhoneCode, register }