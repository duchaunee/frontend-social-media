// eslint-disable-next-line react/prop-types
const Check = ({ className, size, color = "#4caf50", bg = "#f0f0f0" }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 48 48"
      >
        <path
          fill={bg}
          d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
        />
        <polyline
          fill="none"
          stroke={color}
          strokeMiterlimit={10}
          strokeWidth={4}
          points="14,24 21,31 36,16"
        />
      </svg>
    </div>
  );
};

export default Check;
