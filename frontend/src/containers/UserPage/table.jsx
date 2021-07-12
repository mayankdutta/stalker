import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const UserTable = (props) => {
  console.log(props.newRating);
  return (
    <table class="table-auto">
      <thead>
        <tr>
          <th>Contets of </th>
          <th>{props.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Contests</td>
          <td>{props.contestName.legnth}</td>
        </tr>
        <tr class="bg-emerald-200">
          <td>Best Rank</td>
          <td>
            {Math.max(
              props.newRating.reduce((a, b) => {
                return Math.max(a, b);
              }),
              props.oldRating.reduce((a, b) => {
                return Math.max(a, b);
              })
            )}
          </td>
        </tr>
        <tr>
          <td>Worst Rank</td>
          <td>
            {Math.min(
              props.newRating.reduce((a, b) => {
                return Math.min(a, b);
              }),
              props.oldRating.reduce((a, b) => {
                return Math.min(a, b);
              })
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserTable;
