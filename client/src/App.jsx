import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";
const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <AppRoutes />
    </>
  );
};

export default App;
