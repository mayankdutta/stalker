import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Chart from "./barGraph.jsx";
import PiChart from "./pi.jsx";
import Donut from "./doughtnet.jsx";

const UserData = styled.div`
  ${tw`
    flex
    space-x-4
    flex-wrap
    justify-center
    items-center
  `};
`;

const Graph = styled.div`
  ${tw`
  w-1/2
  h-1/2
  `}
`;

const Pi = styled.div`
  ${tw`

  `}
`;

const HomePage = (props) => {
  return (
    <>
      <UserData>
        <Pi>
          <PiChart />
        </Pi>
        <Pi>
          <Donut />
        </Pi>
        <Graph>
          <Chart />
        </Graph>
      </UserData>
    </>
  );
};

export default HomePage;
