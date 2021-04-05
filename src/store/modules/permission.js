import { asyncRoute } from "@/router/route";

const SET_ROUTE = "SET_ROUTE";

const defaultState = {
  route: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_ROUTE:
      return { ...state, route: filterAsyncRoute(asyncRoute, action.role) };
    default:
      return state;
  }
};

export const setRoute = (role) => {
  return { type: SET_ROUTE, role };
};

export function filterAsyncRoute(routes, role) {
  let arr = [];
  routes.forEach((item) => {
    const temp = { ...item };
    if (hasChildren(temp, role)) {
      if (temp.children) {
        temp.children = filterAsyncRoute(temp.children, role);
      }
      arr.push(temp);
    }
  });
  return arr;
}

export function hasChildren(route, role) {
  if (route.meta && route.meta.role) {
    return route.meta.role.some((item) => item == role);
  } else {
    return true;
  }
}
