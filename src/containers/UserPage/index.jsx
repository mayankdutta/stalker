import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Chart from "../../components/userData/barGraph.jsx";
import PiChart from "../../components/userData/pi.jsx";
import UserTable from "../../components/userData/table.jsx";
import UserStatusTable from "../../components/userData/userStatusTable.jsx";
import Donut from "../../components/userData/doughtnet.jsx";
import axios from "axios";
import Colors from "../../colorScheme/index.jsx";
import WaitGIF from "../../gif/waiting.gif";

import DataAnalyzer from "../../calculation/index.jsx";
import { AuthContext } from "../../calculation/index.jsx";

const UserData = styled.div`
  ${tw`
    flex
    my-4
    py-4
    space-x-4
    flex-nowrap
    flex-col
    justify-center
    items-center
    bg-gray-400
    container
    mx-auto
    rounded-3xl
  `};
  background-color: ${Colors.body};
`;

const Graph = styled.div`
  ${tw`
  w-4/6
  h-4/5
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
  w-2/5
  h-2/5

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
  const [maxRating, setMaxRating] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [maxUp, setMaxUp] = useState(-10000000000000);
  const [maxDown, setMaxDown] = useState(1000000000000);

  // user Status
  const [language, setLanguage] = useState([]);
  const [freqLanguage, setFreqLanguage] = useState([]);

  const [verdict, setVerdict] = useState([]);
  const [freqVerdict, setFreqVerdict] = useState([]);

  const [tags, setTags] = useState([]);
  const [freqTags, setFreqTags] = useState([]);

  const [problemRating, setProblemRating] = useState([]);
  const [freqProblemRating, setFreqProblemRating] = useState([]);

  const [problemLevel, setProblemLevel] = useState([]);
  const [freqProblemLevel, setFreqProblemLevel] = useState([]);

  const [attempt, setAttempt] = useState([]);
  const [freqAttempt, setFreqAttempt] = useState([]);

  const [solve, setSolve] = useState([]);
  const [freqSolve, setFreqsolve] = useState([]);

  const [loading, setLoading] = useState(true);

  const analyzeUserRating = () => {
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

  const fetchUserRating = () => {
    const data = axios(
      `https://codeforces.com/api/user.rating?handle=${props.userName}`
    );
    return data;
  };
  const fetchUserStatus = () => {
    const data = axios(
      `https://codeforces.com/api/user.status?handle=${props.userName}`
    );
    return data;
  };

  const fillInMap = (userMap, value) => {
    userMap[value] ? (userMap[value] += 1) : (userMap[value] = 1);
  };

  const mapToArray = (userMap, userArr, userArrFreq) => {
    for (let val in userMap) {
      userArr.push(val);
      userArrFreq.push(userMap[val]);
    }
  };

  const analyzeUserStatus = (data) => {
    const userLanguage = new Map();
    const userVerdict = new Map();
    const userTags = new Map();
    const userProblemRating = new Map();
    const userProblemLevel = new Map();
    const userAttemptedProblem = new Map();
    const userSolvedProblem = new Map();

    data.data.result.map((key) => {
      fillInMap(userVerdict, key.verdict);
      fillInMap(userAttemptedProblem, key.problem.name);
      if (key.verdict == "OK") {
        fillInMap(userSolvedProblem, key.problem.name);
        fillInMap(userLanguage, key.programmingLanguage);
        fillInMap(userProblemRating, key.problem.rating);
        fillInMap(userProblemLevel, key.problem.index);
        for (let tag of key.problem.tags) {
          fillInMap(userTags, tag);
        }
      }
    });

    const langName = [],
      langFreq = [],
      verdName = [],
      verdFreq = [],
      tags = [],
      tagsFreq = [],
      problemRating = [],
      problemRatingFreq = [],
      problemLevel = [],
      problemLevelFreq = [],
      tried = [],
      triedFreq = [],
      solved = [],
      solvedFreq = [];

    mapToArray(userVerdict, verdName, verdFreq);
    mapToArray(userLanguage, langName, langFreq);
    mapToArray(userTags, tags, tagsFreq);
    mapToArray(userProblemRating, problemRating, problemRatingFreq);
    mapToArray(userProblemLevel, problemLevel, problemLevelFreq);
    mapToArray(userAttemptedProblem, tried, triedFreq);
    mapToArray(userSolvedProblem, solved, solvedFreq);

    return [
      langName,
      langFreq,
      verdName,
      verdFreq,
      tags,
      tagsFreq,
      problemRating,
      problemRatingFreq,
      problemLevel,
      problemLevelFreq,
      tried,
      triedFreq,
      solved,
      solvedFreq,
    ];
  };

  useEffect(() => {
    fetchUserRating()
      .then((data) => {
        data.data.result.map((key) => {
          for (let val in key) {
            // console.log(val); console.log(key[val]);
            if (val === "rank") rank.push(key[val]);
            else if (val === "contestName") contestName.push(key[val]);
            else if (val === "newRating") newRating.push(key[val]);
            else if (val === "oldRating") oldRating.push(key[val]);
          }
        });
        setRank(rank);
        setContestName(contestName);
        setNewRating(newRating);
        setOldRating(oldRating);
      })
      .then(() => {
        analyzeUserRating();
      });
    // const [x1, y1, x2, y2, tempData] = await fetchUserStatus();
    fetchUserStatus()
      .then((data) => {
        return analyzeUserStatus(data);
      })
      .then(
        ([
          langName,
          langFreq,
          verdName,
          verdFreq,
          tags,
          tagsFreq,
          problemRating,
          problemRatingFreq,
          problemLevel,
          problemLevelFreq,
          tried,
          triedFreq,
          solved,
          solvedFreq,
        ]) => {
          setLanguage(langName);
          setFreqLanguage(langFreq);

          setVerdict(verdName);
          setFreqVerdict(verdFreq);

          setTags(tags);
          setFreqTags(tagsFreq);

          setProblemRating(problemRating);
          setFreqProblemRating(problemRatingFreq);

          setProblemLevel(problemLevel);
          setFreqProblemLevel(problemLevelFreq);

          setAttempt(tried);
          setFreqAttempt(triedFreq);

          setSolve(solved);
          setFreqsolve(solvedFreq);
        }
      )
      .then(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <UserData>
          <h1> Ruko BHAISAAB </h1>
          <img src={WaitGIF} />
        </UserData>
      ) : (
        <>
          <UserData>
            <div className="flex space-x-4">
              <UserTable
                name={props.userName}
                totalContest={contestName.length}
                maxRating={maxRating}
                minRating={minRating}
                maxUp={maxUp}
                maxDown={maxDown}
              />
              <UserStatusTable
                name={props.userName}
                tried={attempt.length}
                solved={solve.length}
                maxRating={maxRating}
                minRating={minRating}
                maxUp={maxUp}
              />
            </div>
            <Pi>
              <PiChart xAxis={language} yAxis={freqLanguage} />
            </Pi>
            <Pi>
              <PiChart xAxis={verdict} yAxis={freqVerdict} />
            </Pi>
            <Graph>
              <Chart xAxis={tags} yAxis={freqTags} />
            </Graph>
            <Graph>
              <Chart xAxis={problemRating} yAxis={freqProblemRating} />
            </Graph>
            <Graph>
              <Chart xAxis={problemLevel} yAxis={freqProblemLevel} />
            </Graph>
          </UserData>
        </>
      )}
    </>
  );
};

export default HomePage;
