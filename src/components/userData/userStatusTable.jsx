import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const UserTable = (props) => {
  console.log(props.newRating);
  return (
    <table className="table-auto">
      <thead className="">
        <tr className="bg-gray-400">
          <th className="p-2 ">Some stats of </th>
          <th className="p-2">{props.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b-2 border-t-2 border-gray-600">
          <td className="p-2">Tried </td>
          <td className="p-2">{props.tried}</td>
        </tr>
        <tr className="border-b-2 border-gray-600">
          <td className="p-2">Solved </td>
          <td className="p-2">{props.solved}</td>
        </tr>
        <tr className="border-b-2 border-gray-600">
          <td className="p-2">Worst Rank</td>
          <td className="p-2">{props.minRating}</td>
        </tr>
        <tr className="border-b-2 border-gray-600">
          <td className="p-2">Max Up</td>
          <td className="p-2">{props.maxUp}</td>
        </tr>
        <tr className="border-b-2 border-gray-600">
          <td className="p-2">Max Down</td>
          <td className="p-2">{props.maxDown}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserTable;
