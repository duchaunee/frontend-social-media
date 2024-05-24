import { Toaster } from "react-hot-toast";
import useRouteElement from "./hooks/useRouteElement";
// import "react-responsive-modal/styles.css";
// import { Login, Profile } from "./pages";
// import { Routes, Route } from "react-router-dom";

function App() {
  const routeElements = useRouteElement();
  return (
    <>
      {routeElements}
      <Toaster />
    </>
  );
}

export default App;
