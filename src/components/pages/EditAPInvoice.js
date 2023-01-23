import React, { useContext, useState, useEffect } from "react";
import Loading from "../Loading";
import Input from "../Input";
import Submit from "../Submit";
import { FormStyled, ContainerInvoicesStyled } from "./styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { EmailContext, TokenContext } from "../../context/context";

export default function EditAPInvoice() {
  const { state } = useLocation();
  const [value, setValue] = useState(state.value);
  const [description, setDescription] = useState(state.description);
  const [date, setDate] = useState(String(state.date).split("T")[0]);
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
        { value: Number(value), description, status: false, date },
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
  if (loading) return <Loading />;
  return (
    <ContainerInvoicesStyled>
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
        <Input type={"date"} value={date} setValue={setDate} />
        <Submit type="submit" value={"Atualizar saída"}></Submit>
      </FormStyled>
    </ContainerInvoicesStyled>
  );
}
