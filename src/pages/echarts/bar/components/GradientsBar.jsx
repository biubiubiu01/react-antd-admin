import { Component } from "react";
import { debounce } from "@/utils/index";
const echarts = require("echarts");

class GradientsBar extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.GradientsBar);
    this.setOption();
  }

  componentWillUnmount() {
    this.destroyResizeEvent();
    if (!this.myChart) {
      return;
    }
    this.myChart.off("click");
  }

  setOption() {
    this.myChart.setOption(
      {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          padding: [5, 10],
        },
        grid: {
          left: 50,
          right: 20,
          bottom: 40,
          top: 30,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "星期一",
              "星期二",
              "星期三",
              "星期四",
              "星期五",
              "星期六",
              "星期天",
            ],
            axisLine: {
              lineStyle: {
                color: "#cecece",
              },
            },
            axisLabel: {
              color: "#666",
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#cecece",
              },
            },
            axisLabel: {
              color: "#666",
            },
            splitLine: {
              show: true,
            },
          },
        ],
        series: [
          {
            name: "游戏时长",
            type: "bar",
            data: [60, 75, 55, 40, 100, 140, 160],
            barWidth: "20",
            barGap: "80%",
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#5171fd",
                },
                {
                  offset: 1,
                  color: "#c97afd",
                },
              ]),
            },
          },
        ],
      },
      true
    );
  }

  //监听resize
  initResizeEvent() {
    window.addEventListener("resize", this.resizeHandler);
  }

  //移除resize
  destroyResizeEvent() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  render() {
    return (
      <div
        className="chart-wrapper"
        ref={(GradientsBar) => (this.GradientsBar = GradientsBar)}
      />
    );
  }
}

export default GradientsBar;
