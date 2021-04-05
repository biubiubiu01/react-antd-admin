import { Component } from "react";
import { debounce } from "@/utils/index";
const echarts = require("echarts");

class MoreBar extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.MoreBar);
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
        legend: {
          show: true,
          itemWidth: 16,
          itemHeight: 12,
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
            name: "篮球",
            type: "bar",
            data: [30, 40, 50, 50, 55, 60, 40],
            barWidth: "8",
            barGap: "20%",
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
          {
            name: "羽毛球",
            type: "bar",
            data: [60, 60, 90, 90, 120, 120, 90],
            barWidth: "8",
            barGap: "20%",
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#3dadf6",
                },
                {
                  offset: 1,
                  color: "#737bfc",
                },
              ]),
            },
          },
          {
            name: "乒乓球",
            type: "bar",
            data: [40, 40, 60, 60, 80, 80, 60],
            barWidth: "8",
            barGap: "20%",
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#ea677c",
                },
                {
                  offset: 1,
                  color: "#ef9b5f",
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
        ref={(MoreBar) => (this.MoreBar = MoreBar)}
      />
    );
  }
}

export default MoreBar;
