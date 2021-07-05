import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const LogoContainer = styled.div`
  ${tw`


  `};
`;

const ImageContainer = styled.div`
  ${tw`

  `};
`;

const LogoText = styled.div`
  ${tw`

  `};
`;

const Logo = () => {
  return (
    <LogoContainer>
      <ImageContainer>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.imgflip.com%2F2zdcir.jpg&f=1&nofb=1" />
      </ImageContainer>
      <LogoText>Stalker </LogoText>
    </LogoContainer>
  );
};

export default Logo;
