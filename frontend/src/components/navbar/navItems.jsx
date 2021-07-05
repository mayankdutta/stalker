import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const List = styled.ul`
  ${tw``};
`;

const Items = styled.li`
  ${tw``};
`;

const NavList = () => {
  return (
    <List>
      <Items>
        <a href="#"> Link1</a>
      </Items>
      <Items>
        <a href="#"> Link1</a>
      </Items>
      <Items>
        <a href="#"> Link1</a>
      </Items>
      <Items>
        <a href="#"> Link1</a>
      </Items>
    </List>
  );
};
export default NavList;
