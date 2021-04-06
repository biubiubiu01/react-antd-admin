import loadable from "@loadable/component";
import Login from "@/pages/login/index";
import Layout from "@/layouts/index";
import MainLayout from "@/layouts/container/index";
import echartRouter from "./modules/echarts";
import componentRouter from "./modules/components";
import nestRouter from "./modules/nest";

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
  {
    path: "/error",
    component: MainLayout,
    exact: false,
    meta: { title: "错误页面", icon: "error" },
    hidden: true,
    children: [
      {
        path: "/error/403",
        component: loadable(() => import("../pages/error/403.jsx")),
        meta: { title: "403" },
        exact: false,
      },
      {
        path: "/error/404",
        component: loadable(() => import("../pages/error/404.jsx")),
        meta: { title: "404" },
        exact: false,
      },
      {
        path: "/error/500",
        component: loadable(() => import("../pages/error/500.jsx")),
        meta: { title: "500" },
        exact: false,
      },
    ],
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
  // {
  //   path: "/app/permission",
  //   component: loadable(() => import("../pages/permission/index")),
  //   exact: true,
  //   meta: {
  //     title: "权限测试页",
  //     icon: "permission",
  //   },
  // },
  {
    path: "/app/webGl",
    component: MainLayout,
    exact: false,
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
        exact: true,
      },
      {
        path: "/app/webGl/OpenLayers",
        component: loadable(() => import("../pages/webGl/OpenLayers/index")),
        meta: { title: "插值分析图" },
        exact: true,
      },
    ],
  },
  echartRouter,
  componentRouter,
  nestRouter,
  {
    path: "/error",
    component: MainLayout,
    exact: false,
    meta: { title: "错误页面", icon: "error" },
    hidden: true,
    children: [
      {
        path: "/error/403",
        component: loadable(() => import("../pages/error/403.jsx")),
        meta: { title: "403" },
        exact: false,
      },
      {
        path: "/error/404",
        component: loadable(() => import("../pages/error/404.jsx")),
        meta: { title: "404" },
        exact: false,
      },
      {
        path: "/error/500",
        component: loadable(() => import("../pages/error/500.jsx")),
        meta: { title: "500" },
        exact: false,
      },
    ],
  },
  {
    component: MainLayout,
    path: "/app/userSystem",
    meta: { title: "个人设置", icon: "user" },
    exact: false,
    children: [
      {
        path: "/app/userSystem/userInfo",
        component: loadable(() => import("../pages/userSystem/userInfo/index")),
        meta: { title: "个人中心" },
        exact: true,
      },
    ],
  },
];
