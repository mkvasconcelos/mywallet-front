import React, { useState } from "react";
import Loading from "../Loading";
import Input from "../Input";
import Submit from "../Submit";
import { ContainerSignStyled, FormStyled } from "./styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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
        `${REACT_APP_API_URL}/sign-up`,
        { pwd, name, repeatPwd },
        { headers: { Email: email } }
      );
      console.log(res.status);
      setName("");
      setEmail("");
      setPwd("");
      setRepeatPwd("");
      setLoading(false);
      Swal.fire({ title: "Cadastro concluído com sucesso!", icon: "success" });
      navigate("/");
    } catch (res) {
      Swal.fire({
        title: "Houve um problema com o seu cadastro.",
        text: `Error ${res.response.status}: ${res.response.data}`,
        icon: "error",
      });
      setLoading(false);
    }

    return;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <ContainerSignStyled>
      <h1>MyWallet</h1>
      <FormStyled onSubmit={submit}>
        <Input
          data-test="name"
          type={"text"}
          placeholder={"Nome"}
          value={name}
          setValue={setName}
        />
        <Input
          data-test="email"
          type={"email"}
          placeholder={"E-mail"}
          value={email}
          setValue={setEmail}
        />
        <Input
          data-test="password"
          type={"password"}
          placeholder={"Senha"}
          value={pwd}
          setValue={setPwd}
        />
        <Input
          data-test="conf-password"
          type={"password"}
          placeholder={"Confirme a senha"}
          value={repeatPwd}
          setValue={setRepeatPwd}
        />
        <Submit
          data-test="sign-up-submit"
          type="submit"
          value={"Cadastrar"}></Submit>
      </FormStyled>
      <h2 onClick={() => navigate("/")}>Já tem uma conta? Entre agora!</h2>
    </ContainerSignStyled>
  );
}
