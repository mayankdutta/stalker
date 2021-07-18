import React, { useEffect, useState, useContext } from "react";
import UserPage from "../containers/UserPage/index.jsx";
import axios from "axios";

const AuthContext = React.createContext(); // added this
const Data = (props) => {
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

  const analyzeUserStatus = (data) => {
    const userLanguage = new Map();
    const userVerdict = new Map();
    const userTags = new Map();
    const userProblemRating = new Map();
    const userProblemLevel = new Map();
    const userAttemptedProblem = new Map();
    const userSolvedProblem = new Map();

    data.data.result.map((key) => {
      if (userVerdict[key.verdict]) {
        userVerdict[key.verdict] += 1;
      } else {
        userVerdict[key.verdict] = 1;
      }
      if (userAttemptedProblem[key.problem.name]) {
        userAttemptedProblem[key.problem.name] += 1;
      } else {
        userAttemptedProblem[key.problem.name] = 1;
      }
      if (key.verdict == "OK") {
        if (userSolvedProblem[key.problem.name]) {
          userSolvedProblem[key.problem.name] += 1;
        } else {
          userSolvedProblem[key.problem.name] = 1;
        }
        if (userLanguage[key.programmingLanguage]) {
          userLanguage[key.programmingLanguage] += 1;
        } else {
          userLanguage[key.programmingLanguage] = 1;
        }
        if (userProblemRating[key.problem.rating]) {
          userProblemRating[key.problem.rating] += 1;
        } else {
          userProblemRating[key.problem.rating] = 1;
        }
        if (userProblemRating[key.problem.index]) {
          userProblemRating[key.problem.rating] += 1;
        } else {
          userProblemRating[key.problem.rating] = 1;
        }
        for (let tag of key.problem.tags) {
          if (userTags[tag]) {
            userTags[tag] += 1;
          } else {
            userTags[tag] = 1;
          }
        }
      }
    });

    // console.log(data); console.log(userLanguage); console.log(userVerdict);
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

    // console.log(userVerdict);
    for (let val in userVerdict) {
      verdName.push(val);
      verdFreq.push(userVerdict[val]);
    }

    for (let val in userLanguage) {
      langName.push(val);
      langFreq.push(userLanguage[val]);
    }

    for (let val in userTags) {
      tags.push(val);
      tagsFreq.push(userTags[val]);
    }

    for (let val in userProblemRating) {
      problemRating.push(val);
      problemRatingFreq.push(userProblemRating[val]);
    }

    for (let val in userProblemLevel) {
      problemLevel.push(val);
      problemLevelFreq.push(userProblemLevel[val]);
    }

    for (let val in userAttemptedProblem) {
      tried.push(val);
      triedFreq.push(userAttemptedProblem[val]);
    }

    for (let val in userSolvedProblem) {
      solved.push(val);
      solvedFreq.push(userSolvedProblem[val]);
    }

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
        const [
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
        ] = analyzeUserStatus(data);

        return [
          langName, // x1
          langFreq, // y2
          verdName, // x2
          verdFreq, // y2
          tags, // x3
          tagsFreq, // y3
          problemRating, // x4
          problemRatingFreq, // y4
          problemLevel, // x5
          problemLevelFreq, // y5
          tried, // x6
          triedFreq, // y6
          solved, // x7
          solvedFreq, // y7
        ];
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
      .then(() => {});
  }, []);

  return (
    <>
      <AuthContext.Provider value={4}>
        <UserPage />
      </AuthContext.Provider>
      <UserPage />
    </>
  );
};

export default Data;
export { AuthContext };
// export { language };
// export { freqLanguage };
// export { verdict };
// export { freqVerdict };
// export { tags };
// export { freqTags };
// export { problemRating };
// export { freqProblemRating };
// export { problemLevel };
// export { freqProblemLevel };
// export { attempt };
// export { freqAttempt };
// export { solve };
// export { freqSolve };
