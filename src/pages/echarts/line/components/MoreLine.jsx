import { Component } from "react";
import { debounce } from "@/utils/index";
const echarts = require("echarts");

class MoreLine extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.MoreLine);
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
            type: "cross",
          },
        },
        grid: {
          left: 50,
          right: 20,
          bottom: 40,
          top: 65,
        },
        legend: {
          show: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["10-1", "10-2", "10-3", "10-4", "10-5", "10-6", "10-7"],
            axisLine: {
              color: "#cecece",
            },
            axisLabel: {
              color: "#666",
            },
            axisTick: {
              show: false,
            },
            axisPointer: {
              snap: true,
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
            axisPointer: {
              snap: true,
            },
          },
        ],
        series: [
          {
            name: "最高气温",
            type: "line",
            data: [32, 34, 39, 35, 38, 36, 34],
            smooth: true,
            symbol: "circle",
            showSymbol: true,
            markPoint: {
              data: [
                {
                  name: "周最高",
                  value: 39,
                  xAxis: 2,
                  yAxis: 39,
                  symbolSize: 40,
                },
              ],
            },
            lineStyle: {
              width: 4,
              color: "#F6D06F", // 线条颜色
              shadowColor: "rgba(246,208,111, 0.85)",
              shadowBlur: 10,
              shadowOffsetY: 6,
            },
            itemStyle: {
              color: "#F6D06F",
              borderColor: "#F6D06F",
              borderWidth: 0,
            },
          },
          {
            name: "最低气温",
            type: "line",
            data: [25, 22, 26, 28, 27, 26, 23],
            smooth: true,
            symbol: "circle",
            showSymbol: true,
            markPoint: {
              data: [
                {
                  name: "周最低",
                  value: 22,
                  xAxis: 1,
                  yAxis: 22,
                  symbolSize: 40,
                },
              ],
            },
            lineStyle: {
              width: 4,
              color: "#5171fd", // 线条颜色
              shadowColor: "rgba(66,102,247, 0.55)",
              shadowBlur: 10,
              shadowOffsetY: 6,
            },
            itemStyle: {
              color: "#5171fd",
              borderColor: "#5171fd",
              borderWidth: 0,
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
        ref={(MoreLine) => (this.MoreLine = MoreLine)}
      />
    );
  }
}

export default MoreLine;
