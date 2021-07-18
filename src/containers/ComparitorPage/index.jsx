import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import tw from "twin.macro";
import UserPage from "../UserPage/index.jsx";
import Colors from "../../colorScheme/index.jsx";
import UnderConstructionGIF from "../../gif/Untitled.gif";

const MainPage = styled.div`
  ${tw`
    flex
    my-4
    py-4
    space-x-4
    flex-nowrap
    flex-col
    justify-center
    items-center
    bg-gray-400
    container
    mx-auto
    rounded-3xl
  `};
  background-color: ${Colors.body};
`;

const analyzeUserStatus = (data) => {};
const fetchUserStatus = () => {};
const Comparitor = (props) => {
  return (
    <MainPage>
      <img src={UnderConstructionGIF} className="rounded-3xl" />
    </MainPage>
  );
};

export default Comparitor;
