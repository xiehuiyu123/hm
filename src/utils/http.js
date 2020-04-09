import axios from 'axios';
import { Message } from 'element-ui';
import { getToken, removeToken } from '../utils/token.js'
import router from '@/router/router.js'

const http = axios.create({
  baseURL: process.env.VUE_APP_URL,//设置基地址
  timeout: 5000,                   //设置超时事件
  withCredentials: true 		  //跨域照样携带cookie
});
//请求拦截
http.interceptors.request.use(function (config) {
  if (getToken()) { //设置请求头，有就设置，没有就不设置
    config.headers.token = getToken()
  }
  return config;
}, function (err) {
  console.log(err)
})
//响应拦截
http.interceptors.response.use(function (res) {
  //成功、错误集中处理
  if (res.data.code == 200) {
    return res.data;
  } else if (res.data.code == 206) {
    //没有token直接去登录页
    removeToken();
    router.push('/');
    return false
  } else {
    Message.error(res.data.message);
    return Promise.reject("error");
  }
}, function (err) {
  console.log(err)
})

export default http