import React, { useContext, useState, useEffect } from "react";
import Loading from "../Loading";
import Input from "../Input";
import Submit from "../Submit";
import { FormStyled, ContainerInvoicesStyled } from "./styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { EmailContext, TokenContext } from "../../context/context";

export default function APInvoice() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
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
        { value: Number(value), description, status: false, date },
        { headers: { Authorization: `Bearer ${token}`, Email: email } }
      );
      setLoading(false);
      navigate("/home");
      console.log(res);
    } catch (res) {
      Swal.fire({
        title: "Houve um problema com o seu lançamento.",
        text: `Error ${res.response.status}: ${res.response.data}`,
        icon: "error",
      });
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
      <h1>Nova saída</h1>
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
        <Input type={"date"} value={date} setValue={setDate} />
        <Submit type="submit" value={"Salvar saída"}></Submit>
      </FormStyled>
    </ContainerInvoicesStyled>
  );
}
