import React, { useContext, useState, useEffect } from "react";
import Loading from "../Loading";
import Input from "../Input";
import Submit from "../Submit";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EmailContext, TokenContext } from "../../context/context";

export default function ARInvoice() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
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
      const res = await axios.post(
        `${REACT_APP_API_URL}/expenses`,
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
  if (loading) return <Loading />;
  return (
    <Container>
      <h1>Nova entrada</h1>
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
        <Submit type="submit" value={"Salvar entrada"}></Submit>
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
