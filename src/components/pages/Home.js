import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading";
import { IoExitOutline } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { ContainerHomeStyled, ExpensesStyled, BalanceStyled } from "./styles";
import { EmailContext, NameContext, TokenContext } from "../../context/context";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState({});
  const { token } = useContext(TokenContext);
  const { name } = useContext(NameContext);
  const { email } = useContext(EmailContext);
  const [loading, setLoading] = useState(true);
  const { REACT_APP_API_URL } = process.env;
  const navigate = useNavigate();
  useEffect(() => {
    !token && navigate("/");
    const res = axios.get(`${REACT_APP_API_URL}/expenses`, {
      headers: { Authorization: `Bearer ${token}`, Email: email },
    });
    res.then((res) => {
      const newExpenses = res.data;
      setLoading(false);
      setExpenses(newExpenses);
    });
    res.catch(() => {
      console.log(`Error ${res.response.status}: ${res.response.data}`);
      setLoading(false);
    });
    const resUser = axios.get(`${REACT_APP_API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}`, Email: email },
    });
    resUser.then((res) => {
      setBalance(res.data);
    });
    resUser.catch(() => {
      console.log(`Error ${res.response.status}: ${res.response.data}`);
    });
  }, [REACT_APP_API_URL, email, token, navigate]);

  function deleteExpense(id) {
    Swal.fire({
      title: "Quer mesmo apagar este lançamento?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim!",
      confirmButtonColor: "green",
      cancelButtonText: "Não.",
      cancelButtonColor: "red",
    }).then(async (result) => {
      console.log(result);
      if (!result.isConfirmed) {
        return Swal.close();
      } else {
        setLoading(true);
        try {
          const res = await axios.delete(
            `${REACT_APP_API_URL}/expenses/${id}`,
            {
              headers: { Authorization: `Bearer ${token}`, Email: email },
            }
          );
          const newExpenses = res.data;
          setLoading(false);
          setExpenses(newExpenses);
          const resUser = await axios.get(`${REACT_APP_API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}`, Email: email },
          });
          setBalance(resUser.data);
        } catch (res) {
          console.log(`Error ${res.response.status}: ${res.response.data}`);
          setLoading(false);
        }
        return;
      }
    });
  }
  if (loading) return <Loading />;
  return (
    <ContainerHomeStyled statusExpenses={expenses.length !== 0}>
      <div>
        <h1>Olá, {name}</h1>
        <div
          onClick={() => {
            navigate("/");
          }}>
          <IoExitOutline fontSize={26} />
        </div>
      </div>
      <main>
        <section>
          {expenses.length === 0
            ? "Não há registros de entrada ou saída"
            : expenses.map((e) => (
                <ExpensesStyled key={e._id} status={e.status}>
                  <div>{e.date}</div>{" "}
                  <div
                    onClick={() =>
                      e.status
                        ? navigate(`/editar-entrada/${e._id}`, {
                            state: {
                              value: e.value,
                              description: e.description,
                            },
                          })
                        : navigate(`/editar-saida/${e._id}`, {
                            state: {
                              value: e.value,
                              description: e.description,
                            },
                          })
                    }>
                    {e.description}
                  </div>
                  <div>{e.value?.toFixed(2)?.replace(".", ",")}</div>
                  <div>
                    <FcCancel
                      onClick={() => {
                        deleteExpense(e._id);
                      }}
                    />
                  </div>
                </ExpensesStyled>
              ))}
        </section>
        {expenses.length !== 0 && (
          <BalanceStyled status={balance.status}>
            <div>SALDO</div>
            <div>
              {balance.total < 0
                ? (-balance.total)?.toFixed(2)?.replace(".", ",")
                : balance.total?.toFixed(2)?.replace(".", ",")}
            </div>
          </BalanceStyled>
        )}
      </main>
      <div>
        <button
          onClick={() => {
            navigate("/nova-entrada");
          }}>
          <AiOutlinePlusCircle fontSize={22} />
          <h2>
            Nova <br />
            entrada
          </h2>
        </button>
        <button
          onClick={() => {
            navigate("/nova-saida");
          }}>
          <AiOutlineMinusCircle fontSize={22} />
          <h2>
            Nova <br />
            saída
          </h2>
        </button>
      </div>
    </ContainerHomeStyled>
  );
}
