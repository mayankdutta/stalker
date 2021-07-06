import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Chart from "./barGraph.jsx";
import PiChart from "./pi.jsx";
import Donut from "./doughtnet.jsx";

const UserContent = styled.div`
  ${tw`
    w-screen
    flex
    justify-center
    items-start
    mt-6
    `};
`;

const UserData = styled.div`
  ${tw`
    w-screen
    h-screen
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

const HomePage = () => {
  return (
    <>
      <UserContent>
        <div className="flex flex-wrap space-x-4">
          <input
            type="text"
            placeholder="Handle Name"
            value=""
            className="border-4 border-transparent focus:outline-none  focus:border-gray-700 rounded-2xl p-1 border-gray-200"
          />
          <button className="rounded-2xl shadow-2xl p-2 bg-gray-500 hover:bg-gray-700 text-white">
            Submit
          </button>
        </div>
      </UserContent>
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
