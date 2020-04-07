import axios from 'axios';

function getPhoneCode(data) {
  return axios({
    url: process.env.VUE_APP_URL + "/sendsms",
    method: "post",
    data: data,
    withCredentials: true //跨域照样携带cookie
  });
}

export default getPhoneCode;