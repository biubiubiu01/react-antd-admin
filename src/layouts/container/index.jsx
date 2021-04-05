import "./index.less";
import RouterView from "@/router/routerView";

const mainLayout = (props) => {
  return (
    <div className="paddingBox-container border-box">
      <RouterView route={props.routes} />
    </div>
  );
};

export default mainLayout;
