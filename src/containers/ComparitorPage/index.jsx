import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import tw from "twin.macro";
import Colors from "../../colorScheme/index.jsx";
import UnderConstructionGIF from "../../gif/Untitled.gif";
import Graph from "../../components/comparitorData/barGraph.jsx";

const MainPage = styled.div`
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

const Comparitor = (props) => {
  const [loading, setLoading] = useState(true);
  const [user1, setUser1] = useState({
    rank: [],
    oldRating: [],
    newRating: [],
    contestName: [],
    maxRating: [],
    minRating: [],
    maxUp: 0,
    maxDown: 0,

    language: [],
    verdict: [],
    tags: [],
    problemRating: [],
    problemLevel: [],
    attempt: [],
    solve: [],

    freqLanguage: [],
    freqVerdict: [],
    freqTags: [],
    freqProblemRating: [],
    freqProblemLevel: [],
    freqAttempt: [],
    freqSolve: [],
  });
  const [user2, setUser2] = useState({
    rank: [],
    oldRating: [],
    newRating: [],
    contestName: [],
    maxRating: [],
    minRating: [],
    maxUp: 0,
    maxDown: 0,

    language: [],
    verdict: [],
    tags: [],
    problemRating: [],
    problemLevel: [],
    attempt: [],
    solve: [],

    freqLanguage: [],
    freqVerdict: [],
    freqTags: [],
    freqProblemRating: [],
    freqProblemLevel: [],
    freqAttempt: [],
    freqSolve: [],
  });

  const fetchUserStatusOne = () => {
    const data = axios(
      `https://codeforces.com/api/user.status?handle=${props.handle1}`
    );
    return data;
  };
  const fetchUserStatusTwo = () => {
    const data = axios(
      `https://codeforces.com/api/user.status?handle=${props.handle2}`
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

    return {
      rank: [],
      oldRating: [],
      newRating: [],
      contestName: [],
      maxRating: [],
      minRating: [],
      maxUp: 0,
      maxDown: 0,

      language: langName,
      verdict: verdName,
      tags: tags,
      problemRating: problemRating,
      problemLevel: problemLevel,
      attempt: tried,
      solve: solved,

      freqLanguage: langFreq,
      freqVerdict: verdFreq,
      freqTags: tagsFreq,
      freqProblemRating: problemRatingFreq,
      freqProblemLevel: problemLevelFreq,
      freqAttempt: triedFreq,
      freqSolve: solvedFreq,
    };
  };

  useEffect(() => {
    fetchUserStatusOne()
      .then((data) => {
        return analyzeUserStatus(data);
      })
      .then((obj) => {
        setUser1(obj);
      });

    fetchUserStatusTwo()
      .then((data) => {
        return analyzeUserStatus(data);
      })
      .then((obj) => {
        setUser2(obj);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  return (
    <MainPage>
      {loading ? (
        <img src={UnderConstructionGIF} className="rounded-3xl" />
      ) : (
        <>
          <Graph
            xAxis={user1.problemRating}
            yAxis1={user1.freqProblemRating}
            yAxis2={user2.freqProblemRating}
          />
          <Graph
            xAxis={user1.problemLevel}
            yAxis1={user1.freqProblemLevel}
            yAxis2={user2.freqProblemLevel}
          />
          <Graph
            xAxis={user1.tags}
            yAxis1={user1.freqTags}
            yAxis2={user2.freqTags}
          />
        </>
      )}
    </MainPage>
  );
};

export default Comparitor;
