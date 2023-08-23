import React from "react";
import styles from "./App.module.scss";
import AppRoutes from "./AppRoutes";

function App() {
  if (window.location.pathname !== "/") {
    window.location.pathname = "/";
  }
  return <AppRoutes />;
}

export default App;
