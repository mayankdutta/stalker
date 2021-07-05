import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "../logo/index.jsx";
import NavList from "./navItems.jsx";

const NavbarContainer = styled.div`
  ${tw`


    `};
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo />
      <NavList />
    </NavbarContainer>
  );
};

export default Navbar;
