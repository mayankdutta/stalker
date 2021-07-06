import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { slide as Menu } from "react-burger-menu";
import SCREENS from "../../responsive/index.jsx";
import menuStyle from "./menuStyle.jsx";
import { useMediaQuery } from "react-responsive";

const List = styled.ul`
  ${tw`
    flex 
    list-none
    divide-x
    divide-gray-800
    `};
`;

const Items = styled.li`
  ${tw`
    flex
    px-2
    justify-center
    items-center
    `};
`;
const NavList = () => {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  if (isMobile)
    return (
      <Menu right styles={menuStyle} width={"50%"}>
        <List>
          <Items>
            <a href="#"> Home</a>
          </Items>
          <Items>
            <a href="#"> Compare </a>
          </Items>
          <Items>
            <a href="#"> Virtual Rating</a>
          </Items>
          <Items>
            <a href="#"> Kuch kehna hai</a>
          </Items>
        </List>
      </Menu>
    );
  else
    return (
      <>
        <List>
          <Items>
            <a href="#"> Home</a>
          </Items>
          <Items>
            <a href="#"> Compare </a>
          </Items>
          <Items>
            <a href="#"> Virtual Rating</a>
          </Items>
          <Items>
            <a href="#"> Kuch kehna hai </a>
          </Items>
        </List>
      </>
    );
};

export default NavList;
