import { Component } from "react";
import { debounce } from "@/utils/index";
const echarts = require("echarts");

class OnlyLine extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.OnlyLine);
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
          top: 30,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["6:00", "9:00", "12:00", "15:00", "18:00", "21:00", "24:00"],
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
              color: "#cecece",
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
            name: "运动时长",
            type: "line",
            data: [60, 75, 55, 40, 100, 140, 160],
            smooth: true,
            symbol: "circle",
            showSymbol: true,
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
        ref={(OnlyLine) => (this.OnlyLine = OnlyLine)}
      />
    );
  }
}

export default OnlyLine;
