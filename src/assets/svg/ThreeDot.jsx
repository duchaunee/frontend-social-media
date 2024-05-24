/* eslint-disable react/prop-types */
const MoreOption = ({ ...props }) => {
  const { className, ...other } = props;
  return (
    <svg
      aria-label="More options"
      className={className}
      fill="currentColor"
      height={24}
      role="img"
      viewBox="0 0 24 24"
      width={24}
      {...other}
    >
      <title>More options</title>
      <circle cx={12} cy={12} r="1.5" />
      <circle cx={6} cy={12} r="1.5" />
      <circle cx={18} cy={12} r="1.5" />
    </svg>
  );
};

export default MoreOption;
