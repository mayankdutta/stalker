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
  const [userData, setUserData] = useState([[]]);
  const fetchData = () => {
    return axios
      .get(props.url)
      .then((res) => {
        /* console.log(res.data.result); */

        Object.entries(res.data.result).forEach(([key, values]) => {
          let object = new Array(1);
          object[0] = new Array(1);
          Object.entries(values).forEach(([index, value]) => {
            object[0].push([index, value]);
          });
          userData.push(object);
          /* console.log("Object: " + object); */
          setUserData(userData);
        });
        console.log(userData);
      })
      .then({})
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

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
