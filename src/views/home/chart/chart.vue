<template>
  <div class="chart">
    <el-card>
      <ul>
        <li>
          <span>{{chartList.increment_users}}</span>
          <p>今日新增用户</p>
        </li>
        <li>
          <span>{{chartList.total_users}}</span>
          <p>总用户量</p>
        </li>
        <li>
          <span>{{chartList.increment_questions}}</span>
          <p>新增试题</p>
        </li>
        <li>
          <span>{{chartList.total_questions}}</span>
          <p>总试题量</p>
        </li>
        <li>
          <span>{{chartList.total_done_questions}}</span>
          <p>总刷题量</p>
        </li>
        <li>
          <span>{{chartList.personal_questions}}</span>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>

    <!-- 图表区域 -->
    <el-card>
      <div class="echarts" ref="echarts"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { getChart, getstatistics } from "@/api/chart.js";
export default {
  data() {
    return {
      chartList: {}
    };
  },
  created() {
    getChart().then(res => {
      this.chartList = res.data;
    });
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.echarts);

    getstatistics().then(res => {
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "整体数据",
          left: "left",
          top: "20"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 80,
          top: "20",
          data: res.data.map(item => item.name)
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: res.data
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  }
};
</script>

<style lang="less">
.chart {
  ul {
    display: flex;
    justify-content: space-around;
    text-align: center;
    p {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(115, 115, 115, 1);
    }
    li span {
      display: block;
      width: 99px;
      height: 99px;
      line-height: 99px;
      border: 2px solid rgba(0, 134, 250, 1);
      border-radius: 50%;
      font-size: 35px;
      font-weight: 400;
      color: rgba(0, 134, 250, 1);
    }
    li:nth-child(n + 3) span {
      border: 2px solid rgba(247, 97, 55, 1);
      color: rgba(247, 97, 55, 1);
    }
    li:nth-child(n + 5) span {
      border: 2px solid rgba(85, 205, 120, 1);
      color: rgba(85, 205, 120, 1);
    }
  }
  .echarts {
    height: 500px;
  }
}
</style>