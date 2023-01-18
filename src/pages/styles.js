import React from "react";
import styled from "styled-components";

export function Input({ type, placeholder, value, setValue }) {
  return (
    <InputStyled
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}></InputStyled>
  );
}

const InputStyled = styled.input`
  background-color: #ffffff;
  border-radius: 5px;
  height: 58px;
  margin-bottom: 13px;
  border: none;
  font-size: 20px;
  padding-left: 10px;
`;

export function Submit({ type, value }) {
  return <SubmitStyled type={type} value={value}></SubmitStyled>;
}

const SubmitStyled = styled.input`
  background: #a328d6;
  border-radius: 5px;
  height: 46px;
  font-size: 20px;
  font-weight: 700;
  border: none;
  color: #ffffff;
  cursor: pointer;
`;
