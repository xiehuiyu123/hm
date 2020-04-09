
//设置token
function setToken(value, name = "token") {
  localStorage.setItem(name, value);
}

//获取token
function getToken(name = "token") {
  localStorage.getItem(name)
}

//删除token
function removeToken(name = "token") {
  localStorage.removeItem(name)
}

export { setToken, getToken, removeToken }