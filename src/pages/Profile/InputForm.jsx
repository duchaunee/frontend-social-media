/* eslint-disable react/prop-types */
import clsx from "clsx";
import { ButtonPrimary } from "../../components/Button";
import TagProffession from "./TagProffession";
import { useState } from "react";
import toast from "react-hot-toast";

const InputForm = (props) => {
  const {
    style = "input",
    clasNameWrap,
    classNameInput,
    register,
    errors,
    label,
    id,
    listProfession,
    setListProfession,
    ...others
  } = props;

  const [profession, setProfession] = useState("");
  const errorMessage = (errors || {})[register?.name]?.message || "";

  const handleSetProfession = (propession, type = "remove") => {
    let newArr = null,
      cloneArr = [...listProfession];
    switch (type) {
      case "remove":
        newArr = listProfession.filter((item) => item !== propession);
        setListProfession(newArr);
        break;

      case "add":
        if (propession == "") break;
        if (listProfession.length == 6) {
          return toast.error("Propession limits the length to 6");
        }
        if (listProfession.find((item) => item === propession)) {
          return toast.error("Profession exist !");
        }
        if (!(profession.length >= 3 && profession.length <= 20)) {
          return toast.error("At least 3 characters (up to 20)");
        } //validate
        cloneArr.push(propession.trim());
        setProfession("");
        setListProfession(cloneArr);
        break;

      default:
        break;
    }
  };

  return (
    <div className={clasNameWrap}>
      <label
        htmlFor={id}
        className="block mb-2 font-medium tracking-wide text-[15px] text-[#111827]"
      >
        {label}
      </label>
      {style !== "profession" ? (
        <input
          className={clsx(
            classNameInput,
            "block bg-[#f9fafb] text-[15px] p-[10px] rounded-md border-[1px] border-gray-300 w-full",
            "focus:border-blue-600",
            errorMessage && "border-red-300"
          )}
          id={id}
          {...others}
          {...register}
        />
      ) : (
        <>
          <div className="flex gap-6">
            <input
              className={clsx(
                classNameInput,
                "block bg-[#f9fafb] text-[15px] p-[10px] rounded-md border-[1px] border-gray-300 flex-1",
                "focus:border-blue-600",
                errorMessage && "border-red-300"
              )}
              id={id}
              {...others}
              onKeyDown={(e) => {
                if (e.key == "Enter")
                  handleSetProfession(e.target.value, "add");
              }}
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
            <ButtonPrimary
              onClick={() => handleSetProfession(profession, "add")}
              text="Add profession"
              className="w-fit bg-[#1d4ed8] px-5 py-3 rounded-lg hover:bg-[#1e40af] duration-100 ease-linear"
            />
          </div>
          <div className="flex flex-wrap">
            {listProfession?.map((p) => (
              <TagProffession
                key={p}
                text={p}
                onClick={() => handleSetProfession(p, "remove")}
              />
            ))}
          </div>
        </>
      )}

      <div className={clsx("text-[12px] mt-1 text-left", "text-red-500")}>
        {errorMessage}
      </div>
    </div>
  );
};

export default InputForm;
