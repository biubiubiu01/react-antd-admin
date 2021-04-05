import { Component } from "react";
import { debounce } from "@/utils/index";
const echarts = require("echarts");

class StackLine extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.StackLine);
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
          left: 65,
          right: 20,
          bottom: 40,
          top: 30,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60"],
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
            name: "经济",
            type: "line",
            stack: "总量",
            data: [1800, 4200, 6500, 8600, 17000, 25352],
            smooth: true,
            symbol: "circle",
            showSymbol: false,
            lineStyle: {
              color: "#5171fd", // 线条颜色
            },
            itemStyle: {
              color: "#5171fd",
              borderColor: "#fff",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#5171fd",
                  },
                  {
                    offset: 0.5,
                    color: "#5171fd",
                  },
                  {
                    offset: 1,
                    color: "rgba(127,153,255,0.1)",
                  },
                ],
                false
              ),
            },
          },
          {
            name: "伤害",
            type: "line",
            stack: "总量",
            data: [432, 2200, 4396, 23564, 63520, 81452],
            smooth: true,
            symbol: "circle",
            showSymbol: false,
            lineStyle: {
              color: "#ff874b", // 线条颜色
            },
            itemStyle: {
              color: "#ff874b",
              borderColor: "#fff",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#ff874b",
                  },
                  {
                    offset: 0.5,
                    color: "#ff874b",
                  },
                  {
                    offset: 1,
                    color: "rgba(255,135,75,0.1)",
                  },
                ],
                false
              ),
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
        ref={(StackLine) => (this.StackLine = StackLine)}
      />
    );
  }
}

export default StackLine;
