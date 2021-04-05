import { Component } from "react";
import { debounce } from "@/utils/index";
const echarts = require("echarts");

class OtherLine extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.OtherLine);
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
            data: [
              "17:00",
              "18:00",
              "19:00",
              "20:00",
              "21:00",
              "22:00",
              "23:00",
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
            name: "今年人气值",
            type: "line",
            data: [5, 220, 180, 480, 220, 180, 5],
            smooth: true,
            symbol: "circle",
            showSymbol: false,
            lineStyle: {
              width: 0,
            },
            markPoint: {
              data: [
                {
                  name: "最高",
                  value: 480,
                  xAxis: 3,
                  yAxis: 480,
                  symbolSize: 40,
                },
              ],
            },
            itemStyle: {
              color: "#5171fd",
              borderColor: "#fff",
            },
            areaStyle: {
              shadowColor: "rgba(133,203,247,0.75)",
              shadowBlur: 15,
            },
          },
          {
            name: "去年人气值",
            type: "line",
            data: [0, 160, 140, 360, 180, 160, 0],
            smooth: true,
            symbol: "circle",
            showSymbol: false,
            lineStyle: {
              width: 0,
            },
            markPoint: {
              data: [
                {
                  name: "最高",
                  value: 360,
                  xAxis: 3,
                  yAxis: 360,
                  symbolSize: 40,
                },
              ],
            },
            itemStyle: {
              color: "#53fcee",
              borderColor: "#fff",
            },
            areaStyle: {},
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
        ref={(OtherLine) => (this.OtherLine = OtherLine)}
      />
    );
  }
}

export default OtherLine;
