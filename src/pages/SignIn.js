import React, { useContext, useState } from "react";
import { Input, Loading, Submit } from "./SmallComponents";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EmailContext, NameContext, TokenContext } from "../context/context";
import Swal from "sweetalert2";

export default function SignIn() {
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(TokenContext);
  const { setName } = useContext(NameContext);
  const { email, setEmail } = useContext(EmailContext);
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
      setToken(res.data.token);
      setName(res.data.name);
    } catch (res) {
      Swal.fire({
        title: "Houve um problema com o seu acesso.",
        text: `Error ${res.response.status}: ${res.response.data}`,
        icon: "error",
      });
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
