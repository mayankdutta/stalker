import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Chart from "../../components/userData/barGraph.jsx";
import PiChart from "../../components/userData/pi.jsx";
import UserTable from "../../components/userData/table.jsx";
import Donut from "../../components/userData/doughtnet.jsx";
import axios from "axios";
import Colors from "../../colorScheme/index.jsx";

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
  w-3/6
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
  const [loading, setLoading] = useState(true);
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

  const fetchUserRating = async () => {
    const data = await axios(
      `https://codeforces.com/api/user.rating?handle=${props.userName}`
    );
    return data;
  };
  const fetchUserStatus = async () => {
    const data = await axios(
      `https://codeforces.com/api/user.status?handle=${props.userName}`
    );
    return data;
  };

  const analyzeUserStatus = (data) => {
    const userLanguage = new Map();
    const userVerdict = new Map();
    const userTags = new Map();
    const userProblemRating = new Map();

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
        if (userProblemRating[key.problem.rating]) {
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
      problemRatingFreq = [];

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

    return [
      langName,
      langFreq,
      verdName,
      verdFreq,
      tags,
      tagsFreq,
      problemRating,
      problemRatingFreq,
    ];
  };

  useEffect(async () => {
    // fetchData();
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
        ] = analyzeUserStatus(data);

        return [
          langName,
          langFreq,
          verdName,
          verdFreq,
          tags,
          tagsFreq,
          problemRating,
          problemRatingFreq,
        ];
      })
      .then(([x1, y1, x2, y2, x3, y3, x4, y4]) => {
        setLanguage(x1);
        setFreqLanguage(y1);

        setVerdict(x2);
        setFreqVerdict(y2);

        setTags(x3);
        setFreqTags(y3);

        setProblemRating(x4);
        setFreqProblemRating(y4);
      })
      .then(() => {
        setLoading(false);
      });
    // console.log("x1"); console.log(x1); console.log("y1"); console.log(y1);

    // setLanguage(x1);
    // setFreqLanguage(y1);
    // setVerdict(x2);
    // setFreqVerdict(y2);
    // });

    // console.log("here"); console.log(language); console.log("there"); console.log(freqLanguage); console.log("hhere"); console.log(verdict); console.log("tthere"); console.log(freqVerdict); console.log([ verdict.length, language.length, freqLanguage.length, freqVerdict.length, ]);
  }, []);

  return (
    <>
      {loading ? (
        <UserData>
          <h1> Ruko BHAISAAB </h1>
        </UserData>
      ) : (
        <>
          <UserData>
            <UserTable
              name={props.userName}
              totalContest={contestName.length}
              maxRating={maxRating}
              minRating={minRating}
              maxUp={maxUp}
              maxDown={maxDown}
            />
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
          </UserData>
        </>
      )}
    </>
  );
};

export default HomePage;
