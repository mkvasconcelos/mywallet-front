import React, { useState } from "react";
import { Input, Submit } from "./styles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${REACT_APP_API_URL}/users/sign-in`,
        { pwd },
        { headers: { Email: email } }
      );
    } catch (res) {
      console.log(`Error ${res.response.status}: ${res.response.data}`);
    }

    return;
  }
  return (
    <Container>
      <h1>MyWallet</h1>
      <FormStyled onSubmit={submit}>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          value={email}
          setValue={setEmail}
        />
        <Input
          type={"password"}
          placeholder={"Senha"}
          value={pwd}
          setValue={setPwd}
        />
        <Submit type="submit" value={"Entrar"}></Submit>
      </FormStyled>
      <h2 onClick={() => navigate("/cadastro")}>Primeira vez? Cadastre-se!</h2>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  color: #ffffff;
  text-align: center;
  h1 {
    font-family: "Saira Stencil One", cursive, Arial, Helvetica, sans-serif;
    font-size: 32px;
  }
  h2 {
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10%;
`;
