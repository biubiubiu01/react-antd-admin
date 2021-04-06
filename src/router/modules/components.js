import MainLayout from "@/layouts/container/index";
import loadable from "@loadable/component";

const componentRouter = {
  path: "/app/components",
  component: MainLayout,
  exact: false,
  meta: {
    title: "组件",
    icon: "component",
  },
  children: [
    {
      path: "/app/components/editor",
      component: loadable(() => import("@/pages/components/editor/index")),
      meta: { title: "富文本编辑器" },
      exact: true,
    },
    {
      path: "/app/components/table",
      component: loadable(() => import("@/pages/components/table/index")),
      meta: { title: "Table表", role: ["admin", "test"] },
      exact: true,
    },
  ],
};

export default componentRouter;
