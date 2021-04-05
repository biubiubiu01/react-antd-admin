const ADD_TAGS = "ADD_TAGS";
const REMOVE_TAGS = "REMOVE_TAGS";
import { asyncRoute } from "@/router/route";
import { getRouteName } from "@/utils/index";

const defaultState = {
  tagList: [
    {
      path: "/app/index",
      name: "首页",
    },
  ],
};

export default (state = defaultState, action) => {
  let list = state.tagList;
  switch (action.type) {
    case ADD_TAGS:
      const index = state.tagList.findIndex(
        (item) => item.path == action.route.path
      );
      if (index == -1) {
        list.push({
          ...action.route,
        });
      }
      return { ...state, tagList: list };
    case REMOVE_TAGS:
      const removeIndex = list.findIndex((item) => item.path == action.path);
      if (removeIndex != -1) {
        list.splice(removeIndex, 1);
      }
      return { ...state, tagList: list };
    default:
      return state;
  }
};

export const addTag = (path) => {
  const name = getRouteName(asyncRoute, path);

  return {
    type: ADD_TAGS,
    route: {
      name,
      path,
    },
  };
};

export const removeTag = (path) => {
  return {
    type: REMOVE_TAGS,
    path,
  };
};
