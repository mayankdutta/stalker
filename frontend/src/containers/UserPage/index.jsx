import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Chart from "../../components/userData/barGraph.jsx";
import PiChart from "../../components/userData/pi.jsx";
import UserTable from "../../components/userData/table.jsx";
import Donut from "../../components/userData/doughtnet.jsx";
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
  const [loading, setLoading] = useState(true);
  const [maxRating, setMaxRating] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [maxUp, setMaxUp] = useState(-10000000000000);
  const [maxDown, setMaxDown] = useState(1000000000000);

  const [userData, setUserData] = useState([]);
  const [language, setLanguage] = useState([]);
  const [freqLanguage, setFreqLanguage] = useState([]);

  const calculationUserRating = () => {
    setMaxRating(
      newRating.reduce((a, b) => {
        return Math.max(a, b);
      })
    );

    setMinRating(
      newRating.reduce((a, b) => {
        return Math.min(a, b);
      })
    );

    for (let i = 1; i < newRating.length; i++) {
      setMaxUp(Math.max(newRating[i] - oldRating[i]), maxUp);
      setMaxDown(Math.min(newRating[i] - oldRating[i]), maxDown);
    }
  };

  const calculationUserStatus = () => {};

  const fetchData = async () => {
    const userRating = await axios(
      `https://codeforces.com/api/user.rating?handle=${props.userName}`
    );
    const userStatus = await axios(
      `https://codeforces.com/api/user.status?handle=${props.userName}`
    );

    Object.entries(userRating.data.result).forEach(([key, values]) => {
      Object.entries(values).forEach(([index, value]) => {
        if (index === "rank") rank.push(value);
        else if (index === "contestName") contestName.push(value);
        else if (index === "newRating") newRating.push(value);
        else if (index === "oldRating") oldRating.push(value);
      });
      setRank(rank);
      setContestName(contestName);
      setNewRating(newRating);
      setOldRating(oldRating);
    });

    // console.log(userStatus.data.result);
    const userLanguage = new Map();

    await userStatus.data.result.map(async (key) => {
      if (userLanguage[key.programmingLanguage]) {
        userLanguage[key.programmingLanguage] += 1;
      } else {
        userLanguage[key.programmingLanguage] = 1;
      }
      // console.log(
      //   key.programmingLanguage + " -> " + userLanguage[key.programmingLanguage]
      // );
      const arr = {
        contestId: key.problem.contestId,
        index: key.problem.index,
        name: key.problem.name,
        rating: key.problem.rating,
        tags: key.problem.tags,
        type: key.problem.type,
      };
      userData.push(arr);
      // console.log(typeof arr);
      // for (let val in arr) {
      //   console.log(val + " -> " + arr[val]);
      // }
    });

    console.log(userLanguage);

    // for - in for key value pair
    for (let value in userLanguage) {
      // console.log("value is : " + value + " and " + userLanguage[value]);
      language.push(value);
      freqLanguage.push(userLanguage[value]);
    }
    setLanguage(language);
    setFreqLanguage(freqLanguage);

    console.log(language);
    console.log(freqLanguage);

    setUserData(userData);

    // for data validation
    // for (let i = 0; i < userData.length; i++) {
    //   const arr = userData[i];
    //   for (let val in arr) {
    //     console.log(val + " -> " + arr[val]);
    //   }
    //   console.log("\n\n");
    // }

    calculationUserRating();
    calculationUserStatus();
    setLoading(false);
  };
  useEffect(async () => {
    await fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <UserData>
          <h1> Ruko BHAISAAB </h1>
        </UserData>
      ) : (
        <>
          {}
          <Table>
            <UserTable
              name={props.userName}
              totalContest={contestName.length}
              maxRating={maxRating}
              minRating={minRating}
              maxUp={maxUp}
              maxDown={maxDown}
            />
          </Table>
          <UserData>
            <Pi>
              <PiChart xAxis={language} yAxis={freqLanguage} />
            </Pi>
            <Pi>
              <Donut />
            </Pi>
            <Graph>
              <Chart />
            </Graph>
          </UserData>
        </>
      )}
    </>
  );
};

export default HomePage;
