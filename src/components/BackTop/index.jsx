import { BackTop } from "antd";
import SvgIcon from "@/components/SvgIcon/index";

const backTop = () => {
  return (
    <BackTop visibilityHeight={320}>
      <div className="backTop">
        <SvgIcon icon="backTop" />
      </div>
    </BackTop>
  );
};

export default backTop;
