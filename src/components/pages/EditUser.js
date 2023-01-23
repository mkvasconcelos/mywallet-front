import React, { useContext, useState, useEffect } from "react";
import Loading from "../Loading";
import Input from "../Input";
import Submit from "../Submit";
import { FormStyled, ContainerInvoicesStyled } from "./styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { EmailContext, NameContext, TokenContext } from "../../context/context";

export default function EditUser() {
  const { name, setName } = useContext(NameContext);
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [repeatNewPwd, setRepeatNewPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(TokenContext);
  const { email } = useContext(EmailContext);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  useEffect(() => {
    !token && navigate("/");
  }, [token, navigate]);
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${REACT_APP_API_URL}/users`,
        { name, oldPwd, newPwd, repeatNewPwd },
        { headers: { Authorization: `Bearer ${token}`, Email: email } }
      );
      setLoading(false);
      navigate("/home");
      console.log(res);
    } catch (res) {
      Swal.fire({
        title: "Houve um problema com a sua atualização.",
        text: `Error ${res.response.status}: ${res.response.data}`,
        icon: "error",
      });
      setLoading(false);
    }
    return;
  }
  if (!token) {
    return navigate("/");
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <ContainerInvoicesStyled>
      <h1>Editar usuário</h1>
      <FormStyled onSubmit={submit}>
        <Input
          type={"text"}
          placeholder={"Nome"}
          value={name}
          setValue={setName}
        />
        <Input
          type={"password"}
          placeholder={"Senha atual"}
          value={oldPwd}
          setValue={setOldPwd}
        />
        <Input
          type={"password"}
          placeholder={"Nova senha"}
          value={newPwd}
          setValue={setNewPwd}
        />
        <Input
          type={"password"}
          placeholder={"Confirme a nova senha"}
          value={repeatNewPwd}
          setValue={setRepeatNewPwd}
        />
        <Submit type="submit" value={"Atualizar usuário"}></Submit>
      </FormStyled>
    </ContainerInvoicesStyled>
  );
}
