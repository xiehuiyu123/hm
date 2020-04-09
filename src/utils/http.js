import axios from 'axios';
import { Message } from 'element-ui';

const http = axios.create({
  baseURL: process.env.VUE_APP_URL,//设置基地址
  timeout: 5000,                   //设置超时事件
  withCredentials: true 		  //跨域照样携带cookie
});
//请求拦截
http.interceptors.request.use(function (config) {
  return config;
}, function (err) {
  console.log(err)
})
//响应拦截
http.interceptors.response.use(function (res) {
  //成功、错误集中处理
  if (res.data.code == 200) {
    return res.data;
  } else {
    Message.error(res.data.message);
    return Promise.reject("error");
  }
}, function (err) {
  console.log(err)
})

export default http