import http from "@/utils/http.js"
//
function getChart(data) {
  return http({
    url: "/data/title",
    method: "post",
    data
  });
}

//企业题目数据统计
function getstatistics(data) {
  return http({
    url: "/data/statistics",
    method: "post",
    data
  });
}

export { getChart, getstatistics }
