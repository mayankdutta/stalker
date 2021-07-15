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

  // user Status
  const [language, setLanguage] = useState([]);
  const [freqLanguage, setFreqLanguage] = useState([]);
  const [verdict, setVerdict] = useState([]);
  const [freqVerdict, setFreqVerdict] = useState([]);

  const [tempData, setTempData] = useState([]);

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

    calculationUserRating();
  };

  const fetchUserStatus = async () => {
    const data = await axios(
      `https://codeforces.com/api/user.status?handle=${props.userName}`
    );
    console.log("called");
    return data;
  };
  useEffect(async () => {
    fetchData();
    // const [x1, y1, x2, y2, tempData] = await fetchUserStatus();
    fetchUserStatus()
      .then((data) => {
        const tempData = [];
        const userLanguage = new Map();
        const userVerdict = new Map();

        data.data.result.map((key) => {
          if (userVerdict[key.verdict]) {
            userVerdict[key.verdict] += 1;
          } else {
            userVerdict[key.verdict] = 1;
          }
          if (key.verdict == "OK") {
            if (userLanguage[key.programmingLanguage]) {
              userLanguage[key.programmingLanguage] += 1;
            } else {
              userLanguage[key.programmingLanguage] = 1;
            }
          }
          tempData.push(key);
        });

        // console.log(data); console.log(userLanguage); console.log(userVerdict);
        const langName = [],
          langFreq = [],
          verdName = [],
          verdFreq = [];

        for (let val in userVerdict) {
          verdName.push(val);
          verdFreq.push(userVerdict[val]);
        }

        for (let val in userLanguage) {
          langName.push(val);
          langFreq.push(userLanguage[val]);
        }
        return [langName, langFreq, verdName, verdFreq, tempData];
      })
      .then(([x1, y1, x2, y2, tempData]) => {
        setLanguage(x1);
        setFreqLanguage(y1);
        setVerdict(x2);
        setFreqVerdict(y2);
        setTempData(tempData);
      });
    // console.log("x1"); console.log(x1); console.log("y1"); console.log(y1);

    // setLanguage(x1);
    // setFreqLanguage(y1);
    // setVerdict(x2);
    // setFreqVerdict(y2);
    // setTempData(tempData);
    // });

    // console.log("here"); console.log(language); console.log("there"); console.log(freqLanguage); console.log("hhere"); console.log(verdict); console.log("tthere"); console.log(freqVerdict); console.log([ verdict.length, language.length, freqLanguage.length, freqVerdict.length, ]);

    // console.log(tempData);
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <UserData>
          <h1> Ruko BHAISAAB </h1>
        </UserData>
      ) : (
        <>
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
              <PiChart xAxis={verdict} yAxis={freqVerdict} />
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
