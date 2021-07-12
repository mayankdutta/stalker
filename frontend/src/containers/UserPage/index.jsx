import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Chart from "./barGraph.jsx";
import PiChart from "./pi.jsx";
import UserTable from "./table.jsx";
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

const Table = styled.div`
  ${tw`
flex
justify-center
`};
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
  const [rank, setRank] = useState([]);
  const [oldRating, setOldRating] = useState([]);
  const [newRating, setNewRating] = useState([]);
  const [contestName, setContestName] = useState([]);
  const [renderNow, setRenderNow] = useState(false);

  const fetchData = () => {
    return axios
      .get(props.url)
      .then((res) => {
        /* console.log(res.data.result); */

        Object.entries(res.data.result).forEach(([key, values]) => {
          Object.entries(values).forEach(([index, value]) => {
            if (index == "rank") rank.push(value);
            else if (index == "contestName") contestName.push(value);
            else if (index == "newRating") newRating.push(value);
            else if (index == "oldRating") oldRating.push(value);
          });
          setRank(rank);
          setContestName(contestName);
          setNewRating(newRating);
          setOldRating(oldRating);
        });
        /* console.log(res.data.result); */
        /* console.log("Rank: " + rank); */
        /* console.log("OldRating: " + oldRating); */
        /* console.log("NewRating: " + newRating); */
        /* console.log("ContestName: " + contestName); */
        setRenderNow(true);
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
      {renderNow ? (
        <>
          <h1> {console.log(rank)}</h1>
          <h1> {console.log(contestName)}</h1>
          <h1> {console.log(oldRating)}</h1>
          <h1> {console.log(newRating)}</h1>

          <Table>
            <UserTable
              name={props.userName}
              totalContest={contestName.length}
              maxRating={Math.max(
                oldRating.reduce((a, b) => {
                  return Math.max(a, b);
                }),
                newRating.reduce((a, b) => {
                  return Math.max(a, b);
                })
              )}
              minRating={Math.min(
                oldRating.reduce((a, b) => {
                  return Math.min(a, b);
                }),
                newRating.reduce((a, b) => {
                  return Math.min(a, b);
                })
              )}
            />
          </Table>
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
      ) : null}
    </>
  );
};

export default HomePage;
