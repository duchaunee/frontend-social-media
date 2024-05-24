// eslint-disable-next-line react/prop-types
const InputSearch = ({ text, Icon }) => {
  return (
    <div className="flex-1 flex items-center justify-center px-2 lg:ml-12">
      <div className="max-w-lg w-full lg:max-w-xs">
        <label htmlFor={text} className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon />
          </div>
          <input
            id={text}
            className="block w-full pl-10 pr-3 py-2 border border-gray-400 rounded-md leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
            placeholder={text}
            type={text}
          />
        </div>
      </div>
    </div>
  );
};

export default InputSearch;
