import { Component } from "react";
import { debounce } from "@/utils/index";
const echarts = require("echarts");

class PieBar extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.PieBar);
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
        title: [
          {
            text: "85分",
            textStyle: {
              color: "#5171fd",
              fontSize: 35,
            },
            top: "center",
            left: "center",
          },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          padding: [5, 10],
        },
        angleAxis: {
          max: 100,
          clockwise: true,
          show: false,
        },
        radiusAxis: {
          type: "category",
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        polar: {
          center: ["50%", "50%"],
          radius: "150%",
        },
        series: [
          {
            type: "bar",
            data: [85],
            showBackground: true,
            backgroundStyle: {
              color: "#cecece",
            },
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 15,
            itemStyle: {
              opacity: 1,
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
              shadowBlur: 5,
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
      <div className="chart-wrapper" ref={(PieBar) => (this.PieBar = PieBar)} />
    );
  }
}

export default PieBar;
