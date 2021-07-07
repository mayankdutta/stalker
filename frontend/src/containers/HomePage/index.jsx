import React, { useState } from "react";
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
  const [handle, setHandle] = useState("");
  const [fullHandle, setFullHandle] = useState("");

  const captureData = (event) => {
    setHandle(event.target.value);
  };
  const captureHandle = () => {
    setFullHandle(handle);
  };

  return (
    <>
      <Content>
        <div className="flex flex-wrap space-x-4">
          <input
            type="text"
            placeholder="Handle Name"
            value={handle}
            className="border-4 border-transparent focus:outline-none  focus:border-gray-700 rounded-2xl p-1 border-gray-200"
            onChange={captureData}
          />
          <button
            onClick={captureHandle}
            className="rounded-2xl shadow-2xl p-2 bg-gray-500 hover:bg-gray-700 text-white"
          >
            Submit
          </button>
        </div>
      </Content>
      {fullHandle.length > 0 ? <UserPage /> : null}
    </>
  );
};

export default HomePage;
