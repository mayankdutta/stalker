import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import UserPage from "../UserPage/index.jsx";
import Colors from "../../colorScheme/index.jsx";
import Comparitor from "../ComparitorPage/index.jsx";
import GIF from "../../gif/LD1.gif";

const Content = styled.div`
  ${tw`
    w-screen
    h-auto
    py-2
    my-8
    flex
    justify-center
    items-center
    container
    mx-auto
    rounded-3xl


    `};
  background-color: ${Colors.body};
`;

const HomePage = () => {
  const [userName, setUserName] = useState("sharma_utkarsh");
  const [platformName, setPlatformName] = useState("codeforces");
  const [url, setUrl] = useState("");

  const [handle1, setHandle1] = useState("sharma_utkarsh");
  const [handle2, setHandle2] = useState("ksridharan829");

  const [renderUserPage, setRenderUserPage] = useState(false);
  const [renderComparingPage, setRenderComparingPage] = useState(false);

  const captureUserName = (event) => {
    setUserName(event.target.value);
  };

  const capturePlatform = (event) => {
    setPlatformName(event.target.value);
  };

  const captureHandle1 = (event) => {
    setHandle1(event.target.value);
  };

  const captureHandle2 = (event) => {
    setHandle2(event.target.value);
  };

  const captureData = () => {
    setUrl("https://codeforces.com/api/user.rating?handle=" + userName);
    setRenderUserPage(true);
  };

  const beginComparing = () => {
    setRenderComparingPage(!renderComparingPage);
  };

  const changeVisiblityFromUserPage = () => {
    setRenderUserPage(!renderUserPage);
  };

  const changeVisiblityFromComparingPage = () => {
    setRenderComparingPage(!renderComparingPage);
  };

  return (
    <>
      {!renderUserPage && !renderComparingPage ? (
        <>
          <Content>
            <div className="flex flex-nowrap flex-col space-y-4 w-screen items-center">
              <img src={GIF} className="rounded-full relative" />
              <input
                type="text"
                placeholder="platform name"
                value={platformName}
                className="border-4 border-transparent w-2/6 focus:outline-none  focus:border-gray-700 rounded-2xl p-1 border-gray-200"
                onChange={capturePlatform}
              />
              <input
                type="text"
                placeholder="handle Name"
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
          <Content>
            <div className="flex flex-nowrap flex-col space-y-4 w-screen items-center">
              <h1> Compare handles </h1>
              <input
                type="text"
                placeholder="handle 1"
                value={handle1}
                className="border-4 border-transparent w-2/6 focus:outline-none  focus:border-gray-700 rounded-2xl p-1 border-gray-200"
                onChange={captureHandle1}
              />
              <input
                type="text"
                placeholder="handle 2"
                value={handle2}
                className="border-4 border-transparent w-2/6 focus:outline-none  focus:border-gray-700 rounded-2xl p-1 border-gray-200"
                onChange={captureHandle2}
              />
              <button
                onClick={beginComparing}
                className="rounded-2xl shadow-2xl p-2 bg-gray-500 hover:bg-gray-700 text-white"
              >
                Compare
              </button>
            </div>
          </Content>
        </>
      ) : renderUserPage ? (
        <>
          <Content>
            <div className="flex flex-nowrap flex-col space-y-4 w-screen items-center">
              <button className="border-4 border-transparent w-2/6 focus:outline-none  focus:border-gray-700 rounded-2xl p-1 border-gray-200">
                {userName}
              </button>
              <button
                onClick={changeVisiblityFromUserPage}
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
      ) : (
        <>
          <Content>
            <div className="flex flex-nowrap flex-col space-y-4 w-screen items-center">
              <h1> Compare handles </h1>
              <button className="border-4 border-transparent w-2/6 focus:outline-none  focus:border-gray-700 rounded-2xl p-1 border-gray-200">
                {handle1}
              </button>
              <button className="border-4 border-transparent w-2/6 focus:outline-none  focus:border-gray-700 rounded-2xl p-1 border-gray-200">
                {handle2}
              </button>
              <button
                onClick={changeVisiblityFromComparingPage}
                className="rounded-full px-6 py-3 shadow-2xl p-2 bg-gray-500 hover:bg-red-700 text-white"
              >
                X
              </button>
            </div>
          </Content>
          <Comparitor handle1={handle1} handle2={handle2} />
        </>
      )}
    </>
  );
};

export default HomePage;
