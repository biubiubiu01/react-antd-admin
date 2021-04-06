import MainLayout from "@/layouts/container/index";
import loadable from "@loadable/component";

const echartRouter = {
  path: "/app/echarts",
  component: MainLayout,
  exact: false,
  meta: {
    role: ["admin", "test"],
    title: "图表",
    icon: "echarts",
  },
  children: [
    {
      path: "/app/echarts/bar",
      component: loadable(() => import("@/pages/echarts/bar/index")),
      meta: { title: "柱状图" },
      exact: true,
    },
    {
      path: "/app/echarts/line",
      component: loadable(() => import("@/pages/echarts/line/index")),
      meta: { title: "折线图" },
      exact: true,
    },
    {
      path: "/app/echarts/pie",
      component: loadable(() => import("@/pages/echarts/pie/index")),
      meta: { title: "饼图" },
      exact: true,
    },
    {
      path: "/app/echarts/graph",
      component: loadable(() => import("@/pages/echarts/graph/index")),
      meta: {
        role: ["admin"],
        title: "关系图",
      },
      exact: true,
    },
    {
      path: "/app/echarts/map",
      component: loadable(() => import("@/pages/echarts/map/index")),
      meta: {
        role: ["admin"],
        title: "地图",
      },
      exact: true,
    },
    {
      path: "/app/echarts/other",
      component: loadable(() => import("@/pages/echarts/other/index")),
      meta: {
        role: ["admin"],
        title: "其他图表",
      },
      exact: true,
    },
  ],
};

export default echartRouter;
