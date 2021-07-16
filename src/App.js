import React, { useContext, Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar/index.jsx";
import HomePage from "./containers/HomePage/index.jsx";
import styled from "styled-components";
import Colors from "./colorScheme/index.jsx";
import tw from "twin.macro";

const MainContainer = styled.div`
  background-color: ${Colors.background};
  ${tw`
     h-screen
`};
`;

function App() {
  return (
    <MainContainer>
      <NavBar />
      <HomePage />
    </MainContainer>
  );
}

export default App;
