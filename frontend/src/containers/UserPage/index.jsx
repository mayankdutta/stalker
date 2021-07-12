import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Chart from "./barGraph.jsx";
import PiChart from "./pi.jsx";
import Donut from "./doughtnet.jsx";
import axios from "axios";

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

const Content = styled.div`
  ${tw`
    w-screen
    h-2/5
    flex
    justify-center
    items-center
    `};
`;

const HomePage = (props) => {
  const fetchData = () => {
    return axios
      .get(props.url)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Content>
        <div className="flex flex-wrap space-x-4 w-screen justify-center">
          <input
            type="text"
            placeholder="'codeforces\{handlename}"
            value={props.userName}
            className="border-4 border-transparent w-2/6 focus:outline-none  focus:border-gray-700 rounded-2xl p-1 border-gray-200"
          />
          <button className="rounded-2xl shadow-2xl p-2 bg-gray-500 hover:bg-gray-700 text-white">
            Submit
          </button>
        </div>
      </Content>

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
