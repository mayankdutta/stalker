import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "../logo/index.jsx";
import NavList from "./navItems.jsx";
import Colors from "../../colorScheme/index.jsx";

const NavbarContainer = styled.div`
  background-color: ${Colors.navbar};
  ${tw`
    flex
    px-2
    mx-2
    py-2

    relative
    top-2

    mx-auto
    max-w-7xl
    justify-between
    rounded-3xl
    shadow-2xl
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
