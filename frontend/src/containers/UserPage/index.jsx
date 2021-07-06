import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { PieChart } from "react-minimal-pie-chart";

const Content = styled.div`
  ${tw`
    w-screen
    h-4/5
    flex
    justify-center
    items-start
    mt-6
    `};
`;

const UserData = styled.div`
  ${tw`

  `};
`;

const HomePage = () => {
  return (
    <>
      <Content>
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
      </Content>
      <UserData></UserData>
    </>
  );
};

export default HomePage;
