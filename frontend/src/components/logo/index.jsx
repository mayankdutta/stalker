import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const LogoContainer = styled.div`
  ${tw`
    flex
    flex-row
    space-x-2
  `};
`;

const ImageContainer = styled.div`
  ${tw`
    w-24
  `};
`;

const LogoText = styled.div`
  ${tw`

    flex
    px-2
    justify-center
    items-center
  `};
`;

const Logo = () => {
  return (
    <LogoContainer>
      <ImageContainer>
        <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fanimevn247.com%2Fwp-content%2Fuploads%2F2021%2F03%2Fthumbnail-768x403.png&f=1&nofb=1" />
      </ImageContainer>
      <LogoText>stalker</LogoText>
    </LogoContainer>
  );
};

export default Logo;
