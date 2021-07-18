import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Chart from "../../components/userData/barGraph.jsx";
import LineChart from "../../components/userData/lineChart.jsx";
import PiChart from "../../components/userData/pi.jsx";
import UserTable from "../../components/userData/table.jsx";
import UserStatusTable from "../../components/userData/userStatusTable.jsx";
import axios from "axios";
import Colors from "../../colorScheme/index.jsx";
import WaitGIF from "../../gif/waiting.gif";

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
  h-full 
  w-10/12
  `}
`;

const Table = styled.div`
  ${tw`
py-8
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
  const [maxUp, setMaxUp] = useState();
  const [maxDown, setMaxDown] = useState();

  // user Status
  const [language, setLanguage] = useState([]);
  const [verdict, setVerdict] = useState([]);
  const [tags, setTags] = useState([]);
  const [problemRating, setProblemRating] = useState([]);
  const [problemLevel, setProblemLevel] = useState([]);
  const [attempt, setAttempt] = useState([]);
  const [solve, setSolve] = useState([]);

  const [freqLanguage, setFreqLanguage] = useState([]);
  const [freqVerdict, setFreqVerdict] = useState([]);
  const [freqTags, setFreqTags] = useState([]);
  const [freqProblemRating, setFreqProblemRating] = useState([]);
  const [freqProblemLevel, setFreqProblemLevel] = useState([]);
  const [freqAttempt, setFreqAttempt] = useState([]);
  const [freqSolve, setFreqsolve] = useState([]);

  const [loading, setLoading] = useState(true);

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

  const analyzeUserRating = (data) => {
    let arrRank = [],
      arrContestName = [],
      arrNewRating = [],
      arrOldRating = [];

    data.data.result.map((key) => {
      for (let val in key) {
        if (val === "rank") arrRank.push(key[val]);
        else if (val === "contestName") arrContestName.push(key[val]);
        else if (val === "newRating") arrNewRating.push(key[val]);
        else if (val === "oldRating") arrOldRating.push(key[val]);
      }
    });
    let mx = 0;
    let mn = 1000000000;
    for (let i = 1; i < arrNewRating.length; i++) {
      console.log(arrNewRating[i] - arrOldRating[i]);
      mx = Math.max(arrNewRating[i] - arrOldRating[i], mx);
      mn = Math.min(arrNewRating[i] - arrOldRating[i], mn);
    }
    return [arrRank, arrContestName, arrNewRating, arrOldRating, mx, mn];
  };

  useEffect(() => {
    fetchUserRating()
      .then((data) => {
        return analyzeUserRating(data);
      })
      .then(([arrRank, arrContestName, arrNewRating, arrOldRating, mx, mn]) => {
        setMaxRating(
          arrNewRating.reduce((a, b) => {
            return Math.max(a, b);
          })
        );

        setMinRating(
          arrNewRating.reduce((a, b) => {
            return Math.min(a, b);
          })
        );

        setRank(arrRank);
        setContestName(arrContestName);
        setNewRating(arrNewRating);
        setOldRating(arrOldRating);
        setMaxDown(mn);
        setMaxUp(mx);
      });

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
          setVerdict(verdName);
          setTags(tags);
          setProblemRating(problemRating);
          setProblemLevel(problemLevel);
          setAttempt(tried);
          setSolve(solved);

          setFreqLanguage(langFreq);
          setFreqVerdict(verdFreq);
          setFreqTags(tagsFreq);
          setFreqProblemRating(problemRatingFreq);
          setFreqProblemLevel(problemLevelFreq);
          setFreqAttempt(triedFreq);
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
              <Table>
                <UserStatusTable
                  name={props.userName}
                  tried={attempt.length}
                  solved={solve.length}
                  maxRating={maxRating}
                  minRating={minRating}
                  maxUp={maxUp}
                />
              </Table>
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
            // TODO make this into table
            <Graph>
              <LineChart xAxis={contestName} yAxis={newRating} />
            </Graph>
          </UserData>
        </>
      )}
    </>
  );
};

export default HomePage;
