import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailContext, NameContext, TokenContext } from "../context/context";
import { IoExitOutline } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styled from "styled-components";
import axios from "axios";
import { Loading } from "./SmallComponents";
import Swal from "sweetalert2";

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
    <Container statusExpenses={expenses.length !== 0}>
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
                <Expenses key={e._id} status={e.status}>
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
                </Expenses>
              ))}
        </section>
        {expenses.length !== 0 && (
          <Balance status={balance.status}>
            <div>SALDO</div>
            <div>
              {balance.total < 0
                ? (-balance.total)?.toFixed(2)?.replace(".", ",")
                : balance.total?.toFixed(2)?.replace(".", ",")}
            </div>
          </Balance>
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
    </Container>
  );
}

const Container = styled.div`
  padding: 5%;
  button {
    height: 115px;
    width: 100%;
    background-color: #a328d6;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: start;
    padding: 3%;
  }
  button:first-child {
    margin-right: 10px;
  }
  div:first-child {
    display: flex;
    justify-content: space-between;
    height: fit-content;
    div {
      cursor: pointer;
    }
  }
  div:last-child {
    display: flex;
    justify-content: space-between;
    height: fit-content;
  }
  h1 {
    font-weight: 700;
    font-size: 26px;
  }
  h2 {
    font-weight: 700;
    font-size: 17px;
  }
  main {
    position: relative;
    background: #ffffff;
    border-radius: 5px;
    margin: 5% 0 2% 0;
    padding: 7% 4% 7% 4%;
    height: calc(100vh - 141px - 10%);
  }
  section {
    color: #868686;
    height: 100%;
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    justify-content: ${(props) => (props.statusExpenses ? "start" : "center")};
    align-items: ${(props) =>
      props.statusExpenses ? "space-between" : "center"};
  }
`;

const Expenses = styled.article`
  display: flex;
  margin-bottom: 20px;
  div:first-child {
    color: #c6c6c6;
    width: 20%;
  }
  div:nth-child(2) {
    color: black;
    width: 50%;
    cursor: pointer;
  }
  div:nth-child(2):hover {
    background-color: #a328d6;
    color: white;
  }
  div:nth-child(3) {
    color: ${(props) => (props.status ? "#03AC00" : "#C70000")};
    width: 20%;
    text-align: end;
  }
  div:last-child {
    width: 10%;
    justify-content: center;
    cursor: pointer;
  }
`;

const Balance = styled.article`
  position: absolute;
  z-index: 2;
  bottom: 2%;
  display: flex;
  width: 93%;
  div:first-child {
    color: black;
    font-weight: 700;
    width: 20%;
  }
  div:last-child {
    color: ${(props) => (props.status ? "#03AC00" : "#C70000")};
    width: 80%;
    justify-content: end;
  }
`;
