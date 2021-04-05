import PropTypes from "prop-types";

const SvgIcon = (props) => {
  const { size, color, icon, className, fill } = props;
  const style = {
    fontSize: size + "px",
    color: color,
    fill: fill,
  };
  return (
    <svg className={`svgClass ${className}`} style={style} aria-hidden="true">
      <use xlinkHref={`#icon-${icon}`} />
    </svg>
  );
};

SvgIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  fill: PropTypes.string,
};
SvgIcon.defaultProps = {
  size: 16,
  color: "rgba(0, 0, 0, 0.65)",
  className: "",
  fill: "",
};

export default SvgIcon;
