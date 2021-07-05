import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

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
  return (
    <List>
      <Items>
        <a href="#"> Home</a>
      </Items>
      <Items>
        <a href="#"> Compare </a>
      </Items>
      <Items>
        <a href="#"> Virtual rating change</a>
      </Items>
      <Items>
        <a href="#"> kuch kehna hai</a>
      </Items>
    </List>
  );
};
export default NavList;
