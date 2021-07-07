import React, { useContext, Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar/index.jsx";
import HomePage from "./containers/HomePage/index.jsx";
import { HandleContext } from "./containers/HomePage/index.jsx";

function App() {
  return (
    <div className="h-screen">
      <NavBar />
      <HomePage />
    </div>
  );
}

export default App;
