import { Toaster } from "react-hot-toast";
import useRouteElement from "./hooks/useRouteElement";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NProgress from "./features/animation/NProgess/NProgress";
import OverlayPost from "./components/Posts/OverlayPost";
// import "react-responsive-modal/styles.css";
// import { Login, Profile } from "./pages";
// import { Routes, Route } from "react-router-dom";

function App() {
  const route = useLocation();
  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [route]);

  const routeElements = useRouteElement();
  return (
    <div className="w-full h-svh">
      {routeElements}
      <Toaster />
      <OverlayPost />
    </div>
  );
}

export default App;
