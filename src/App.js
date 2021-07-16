import React from "react";
import "./App.css";
import NavBar from "./components/navbar/index.jsx";
import HomePage from "./containers/HomePage/index.jsx";
import styled from "styled-components";
import Colors from "./colorScheme/index.jsx";
import tw from "twin.macro";

const MainContainer = styled.div`
  background-color: ${Colors.background};
  ${tw`
     min-h-screen
     py-4
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
