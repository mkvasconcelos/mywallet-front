import React from "react";
import styled from "styled-components";

export default function Submit({ type, value }) {
  return <SubmitStyled type={type} value={value}></SubmitStyled>;
}

const SubmitStyled = styled.input`
  background: #a328d6;
  border-radius: 5px;
  height: 46px;
  font-size: 20px;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;
