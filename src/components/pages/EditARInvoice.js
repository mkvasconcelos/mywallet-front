import React, { useContext, useState, useEffect } from "react";
import Loading from "../Loading";
import Input from "../Input";
import Submit from "../Submit";
import { FormStyled, ContainerInvoicesStyled } from "./styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { EmailContext, TokenContext } from "../../context/context";

export default function EditARInvoice() {
  const { state } = useLocation();
  const [value, setValue] = useState(state.value);
  const [description, setDescription] = useState(state.description);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(TokenContext);
  const { email } = useContext(EmailContext);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  const { idExpense } = useParams();
  useEffect(() => {
    !token && navigate("/");
  }, [token, navigate]);
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${REACT_APP_API_URL}/expenses/${idExpense}`,
        { value: Number(value), description, status: true },
        { headers: { Authorization: `Bearer ${token}`, Email: email } }
      );
      setLoading(false);
      navigate("/home");
      console.log(res);
    } catch (res) {
      console.log(`Error ${res.response.status}: ${res.response.data}`);
      setLoading(false);
    }
    return;
  }
  if (!token) {
    console.log(Boolean(!token));
    return navigate("/");
  }
  if (loading) return <Loading />;
  return (
    <ContainerInvoicesStyled>
      <h1>Editar entrada</h1>
      <FormStyled onSubmit={submit}>
        <Input
          type={"number"}
          placeholder={"Valor"}
          value={value}
          setValue={setValue}
        />
        <Input
          type={"text"}
          placeholder={"Descrição"}
          value={description}
          setValue={setDescription}
        />
        <Submit type="submit" value={"Atualizar entrada"}></Submit>
      </FormStyled>
    </ContainerInvoicesStyled>
  );
}
