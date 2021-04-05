import { Component } from "react";
import { debounce } from "@/utils/index";
const echarts = require("echarts");

class RadiusPie extends Component {
  resizeHandler = debounce(() => {
    if (this.myChart) {
      this.myChart.resize();
    }
  }, 100);

  myChart = null;

  async componentDidMount() {
    this.initResizeEvent();
    this.myChart = echarts.init(this.RadiusPie);
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
          data: ["裤子", "外套", "卫衣", "短袖", "鞋子", "棉袄"],
        },
        series: [
          {
            name: "技术占比",
            type: "pie",
            icon: "circle",
            radius: ["35%", "55%"],
            center: ["48%", "55%"],
            roseType: "radius",
            data: [
              {
                name: "裤子",
                value: 254,
              },
              {
                name: "外套",
                value: 136,
              },
              {
                name: "卫衣",
                value: 292,
              },
              {
                name: "短袖",
                value: 192,
              },
              {
                name: "鞋子",
                value: 650,
              },
              {
                name: "棉袄",
                value: 450,
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
        ref={(RadiusPie) => (this.RadiusPie = RadiusPie)}
      />
    );
  }
}

export default RadiusPie;
