import React, { useContext, useState, useEffect } from "react";
import { Input, Loading, Submit } from "./SmallComponents";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { EmailContext, TokenContext } from "../context/context";

export default function EditAPInvoice() {
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
        { value: Number(value), description, status: false },
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
    <Container>
      <h1>Editar saída</h1>
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
        <Submit type="submit" value={"Atualizar saída"}></Submit>
      </FormStyled>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: center;
  h1 {
    margin: 10% 10% 0 10%;
    text-align: start;
    font-weight: 700;
    font-size: 26px;
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