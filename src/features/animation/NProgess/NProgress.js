import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./nprogess.override.css";

NProgress.configure({
  minimum: 0.1, // Giá trị tiến trình ban đầu
  speed: 500, // Tốc độ di chuyển của thanh tiến trình (ms)
  trickleSpeed: 200, // Tốc độ tăng tiến trình ngẫu nhiên (ms)
  showSpinner: false,
});

export default NProgress;
