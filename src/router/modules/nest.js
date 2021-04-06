import MainLayout from "@/layouts/container/index";
import loadable from "@loadable/component";

const nestRouter = {
  path: "/app/nest",
  component: MainLayout,
  meta: {
    role: ["admin", "test"],
    title: "嵌套路由",
    icon: "nest",
  },
  exact: false,
  children: [
    {
      path: "/app/nest/menu1",
      component: loadable(() => import("@/pages/nest/menu1/index")),
      meta: { title: "路由菜单1" },
      exact: false,
      children: [
        {
          path: "/app/nest/menu1/menu1-1",
          component: loadable(() => import("@/pages/nest/menu1/menu1-1/index")),
          meta: { title: "路由菜单1-1" },
          exact: true,
        },
        {
          path: "/app/nest/menu1/menu1-2",
          component: loadable(() => import("@/pages/nest/menu1/menu1-2/index")),
          meta: { title: "路由菜单1-2" },
          exact: false,
          children: [
            {
              path: "/app/nest/menu1/menu1-2/menu1-2-1",
              component: loadable(() =>
                import("@/pages/nest/menu1/menu1-2/menu1-2-1/index")
              ),
              exact: true,
              meta: { title: "路由菜单1-2-1" },
            },
          ],
        },
      ],
    },
    {
      path: "/app/nest/menu2",
      component: loadable(() => import("@/pages/nest/menu2/index")),
      meta: { title: "路由菜单2" },
    },
  ],
};

export default nestRouter;
