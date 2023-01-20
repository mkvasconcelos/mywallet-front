import React, { useState } from "react";
import { Input, Submit, Loading } from "./SmallComponents";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import swal from "sweetalert";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [repeatPwd, setRepeatPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${REACT_APP_API_URL}/users/sign-up`,
        { pwd, name, repeatPwd },
        { headers: { Email: email } }
      );
      console.log(res.status);
      // swal({ title: "Cadastro realizado!", icon: "success" });
      setName("");
      setEmail("");
      setPwd("");
      setRepeatPwd("");
      setLoading(false);
      alert("Cadastro concluído com sucesso!");
      navigate("/");
    } catch (res) {
      alert(`Error ${res.response.status}: ${res.response.data}`);
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
          type={"text"}
          placeholder={"Nome"}
          value={name}
          setValue={setName}
        />
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
        <Input
          type={"password"}
          placeholder={"Confirme a senha"}
          value={repeatPwd}
          setValue={setRepeatPwd}
        />
        <Submit type="submit" value={"Cadastrar"}></Submit>
      </FormStyled>
      <h2 onClick={() => navigate("/")}>Já tem uma conta? Entre agora!</h2>
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
