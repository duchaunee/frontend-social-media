import { useEffect, useState } from "react";

import clsx from "clsx";
// images
import {
  emptyScreenshot,
  screenshot1,
  screenshot2,
  screenshot3,
  screenshot4,
} from "../../assets/images";

const screenshots = [screenshot1, screenshot2, screenshot3, screenshot4];

const LoginScreenshot = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisibleIndex((prevIndex) =>
        prevIndex >= screenshots.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [setVisibleIndex]);

  return (
    <div key="" className={clsx("relative", "hidden lg:block h-[581.15px]")}>
      <img src={emptyScreenshot} alt="Screenshot" draggable={false} />
      {screenshots.map((screenshot, index) => (
        <img
          key={screenshot.src}
          className={clsx(
            "absolute right-[60px] bottom-[16px]",
            "transition-all duration-[1.5s] ease-out",
            index === visibleIndex
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          )}
          src={screenshot}
          alt="Screenshot"
          draggable={false}
        />
      ))}
    </div>
  );
};

export default LoginScreenshot;
