/* eslint-disable react/prop-types */
// import "@preline/pin-input";
// import { useState } from "react";

const InputItem = ({ name, ...props }) => {
  return (
    <input
      type="text"
      name={name}
      // data-hs-pin-input-item
      className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-600 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
      autoComplete="off"
      {...props}
    />
  );
};

const InputPin = ({ pin, setPin }) => {
  const handleSetPin = (e) => {
    let { name, value } = e.target;
    if (value.length > 1) value = value.split("")[1];
    setPin({
      ...pin,
      [name]: value,
    });
  };

  return (
    <div
      className="flex space-x-3 items-center justify-center"
      // data-hs-pin-input
    >
      <InputItem name="pin1" value={pin["pin1"]} onChange={handleSetPin} />
      <InputItem name="pin2" value={pin["pin2"]} onChange={handleSetPin} />
      <InputItem name="pin3" value={pin["pin3"]} onChange={handleSetPin} />
      <InputItem name="pin4" value={pin["pin4"]} onChange={handleSetPin} />
      <InputItem name="pin5" value={pin["pin5"]} onChange={handleSetPin} />
    </div>
  );
};

export default InputPin;
