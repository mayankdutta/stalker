import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import UserPage from "../UserPage/index.jsx";

const Content = styled.div`
  ${tw`
    w-screen
    h-2/5
    flex
    justify-center
    items-center
    `};
`;

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [platformName, setPlatformName] = useState("");
  const [url, setUrl] = useState("");
  const [call, setCall] = useState(false);

  const captureUserName = (event) => {
    setUserName(event.target.value);
  };

  const capturePlatform = (event) => {
    setPlatformName(event.target.value);
  };
  const captureData = () => {
    setUrl(
      "https://competitive-coding-api.herokuapp.com/api/" +
        platformName +
        "/" +
        userName
    );
    setCall(true);
  };

  return (
    <>
      <Content>
        <div className="flex flex-wrap space-x-4 w-screen justify-center">
          <input
            type="text"
            placeholder="platform name"
            value={platformName}
            className="border-4 border-transparent w-2/6 focus:outline-none  focus:border-gray-700 rounded-2xl p-1 border-gray-200"
            onChange={capturePlatform}
          />
          <input
            type="text"
            placeholder="'codeforces\{userNamename}"
            value={userName}
            className="border-4 border-transparent w-2/6 focus:outline-none  focus:border-gray-700 rounded-2xl p-1 border-gray-200"
            onChange={captureUserName}
          />
          <button
            onClick={captureData}
            className="rounded-2xl shadow-2xl p-2 bg-gray-500 hover:bg-gray-700 text-white"
          >
            Submit
          </button>
        </div>
      </Content>
      <h1> {platformName} </h1>
      <h1> {userName} </h1>
      {call ? (
        <>
          <h1> {url} </h1>
          <UserPage url={url} userName={userName} />
        </>
      ) : null}
    </>
  );
};

export default HomePage;
