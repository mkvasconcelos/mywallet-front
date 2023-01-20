import React, { useContext, useState } from "react";
import { Input, Loading, Submit } from "./styles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NameContext, TokenContext } from "../context/context";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(TokenContext);
  const { setName } = useContext(NameContext);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${REACT_APP_API_URL}/users/sign-in`,
        { pwd },
        { headers: { Email: email } }
      );
      setLoading(false);
      navigate("/home");
      setToken(res.data);
      setName(res.data);
    } catch (res) {
      console.log(`Error ${res.response.status}: ${res.response.data}`);
      setLoading(false);
    }

    return;
  }
  if (loading) return <Loading />;
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
