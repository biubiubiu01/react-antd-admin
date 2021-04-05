import { Component } from "react";
import { debounce } from "@/utils/index";
const echarts = require("echarts");

class HolloPie extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.HolloPie);
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
    const colorList = [
      "#4FD8FF",
      "#C15FFF",
      "#FF5F55",
      "#FFC935",
      "#767BFB",
      "rgb(248,70,102)",
    ];
    this.myChart.setOption(
      {
        color: colorList,
        title: [
          {
            text: "85%",
            textStyle: {
              color: "#5171fd",
              fontSize: 25,
            },
            top: "center",
            left: "center",
          },
        ],
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            return (
              params.marker +
              " " +
              params.name +
              "：" +
              params.value +
              " (" +
              params.percent +
              "%)"
            );
          },
        },
        legend: {
          show: true,
          left: "15",
          top: 0,
          type: "scroll",
          itemWidth: 18,
          itemHeight: 11,
          data: ["炸鸡", "火锅", "烤肉", "料理", "热干面", "奶茶"],
        },
        series: [
          {
            name: "消费类型",
            type: "pie",
            icon: "circle",
            radius: ["35%", "55%"],
            center: ["50%", "50%"],
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            data: [
              {
                name: "炸鸡",
                value: 18,
              },
              {
                name: "火锅",
                value: 35,
              },
              {
                name: "烤肉",
                value: 37,
              },
              {
                name: "料理",
                value: 20,
              },
              {
                name: "热干面",
                value: 36,
              },
              {
                name: "奶茶",
                value: 54,
              },
            ],
            label: {},
            labelLine: {
              show: true,
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
        ref={(HolloPie) => (this.HolloPie = HolloPie)}
      />
    );
  }
}

export default HolloPie;
