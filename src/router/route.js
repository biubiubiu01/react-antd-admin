import loadable from "@loadable/component";
import Login from "@/pages/login/index";
import Layout from "@/layouts/index";
import MainLayout from "@/layouts/container/index";
import echartRouter from "./modules/echarts";

export const baseRoute = [
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/app",
    component: Layout,
    exact: false,
  },
];

export const asyncRoute = [
  {
    path: "/app/index",
    component: loadable(() => import("../pages/index/index")),
    exact: true,
    meta: {
      role: ["admin", "test"],
      title: "首页",
      icon: "dashboard",
    },
  },
  {
    path: "/app/icon",
    component: loadable(() => import("../pages/icon/index")),
    exact: true,
    meta: {
      role: ["admin", "test"],
      title: "图标",
      icon: "icon",
    },
  },
  {
    path: "/app/permission",
    component: loadable(() => import("../pages/permission/index")),
    meta: {
      title: "权限测试页",
      icon: "permission",
    },
  },
  {
    path: "/app/webGl",
    component: MainLayout,
    meta: {
      role: ["admin", "test"],
      title: "地图",
      icon: "webGl",
    },
    children: [
      {
        path: "/app/webGl/ArcGis",
        component: loadable(() => import("../pages/webGl/ArcGis/index")),
        meta: { title: "ArcGis" },
      },
      {
        path: "/app/webGl/OpenLayers",
        component: loadable(() => import("../pages/webGl/OpenLayers/index")),
        meta: { title: "插值分析图" },
      },
    ],
  },
  echartRouter,
];
