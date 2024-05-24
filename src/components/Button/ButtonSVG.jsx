/* eslint-disable react/prop-types */
const ButtonSVG = ({ children }) => {
  return (
    <button
      className="flex-shrink-0 p-1 border-transparent text-gray-700 rounded-full hover:text-gray-600 focus:outline-none focus:text-gray-600 transition duration-150 ease-in-out"
      aria-label="Notifications"
    >
      {children}
    </button>
  );
};

export default ButtonSVG;
