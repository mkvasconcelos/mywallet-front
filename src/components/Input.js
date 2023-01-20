import React from "react";
import styled from "styled-components";

export default function Input({ type, placeholder, value, setValue }) {
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
  color: #000000;
  font-size: 20px;
  padding-left: 10px;
`;
