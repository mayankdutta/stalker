import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
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
  const [platformName, setPlatformName] = useState("codeforces");
  const [url, setUrl] = useState("");
  const [renderUserPage, setRenderUserPage] = useState(false);

  const captureUserName = (event) => {
    setUserName(event.target.value);
  };

  const capturePlatform = (event) => {
    setPlatformName(event.target.value);
  };
  const captureData = () => {
    setUrl("https://codeforces.com/api/user.rating?handle=" + userName);
    setRenderUserPage(true);
  };

  const changeVisiblity = () => {
    setRenderUserPage(!renderUserPage);
  };
  return (
    <>
      {!renderUserPage ? (
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
      ) : (
        <>
          <Content>
            <div className="flex flex-wrap space-x-4 w-screen justify-center">
              <button className="border-4 border-transparent w-2/6 focus:outline-none  focus:border-gray-700 rounded-2xl p-1 border-gray-200">
                {userName}
              </button>
              <button
                onClick={changeVisiblity}
                className="rounded-full px-6 py-3 shadow-2xl p-2 bg-gray-500 hover:bg-red-700 text-white"
              >
                X
              </button>
            </div>
          </Content>
          <UserPage
            url={url}
            userName={userName}
            renderUserPage={renderUserPage}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
