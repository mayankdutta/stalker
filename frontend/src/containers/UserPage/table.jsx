import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const UserTable = (props) => {
  console.log(props.newRating);
  return (
    <table className=" bg-gray-200 table-auto border-4 border-gray-800">
      <thead className="">
        <tr className="bg-gray-400">
          <th className="p-2 ">Contets of </th>
          <th className="p-2">{props.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b-2 border-t-2 border-gray-600">
          <td className="p-2">Number of Contests</td>
          <td className="p-2">{props.totalContest}</td>
        </tr>
        <tr className="border-b-2 border-gray-600">
          <td className="p-2">Best Rank</td>
          <td className="p-2">{props.maxRating}</td>
        </tr>
        <tr className="border-b-2 border-gray-600">
          <td className="p-2">Worst Rank</td>
          <td className="p-2">{props.minRating}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserTable;
