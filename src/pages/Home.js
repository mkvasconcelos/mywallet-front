import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NameContext, TokenContext } from "../context/context";
import { IoExitOutline } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styled from "styled-components";

export default function Home() {
  const { token } = useContext(TokenContext);
  // const { name } = useContext(NameContext);
  const name = "Mateus";
  const navigate = useNavigate();
  console.log(token);
  if (token === null) {
    navigate("/");
  }
  return (
    <Container>
      <div>
        <h1>Olá, {name}</h1>
        <IoExitOutline fontSize={26} />
      </div>
      <section>Não há registros de entrada ou saída</section>
      <div>
        <button>
          <AiOutlinePlusCircle fontSize={22} />
          <h2>
            Nova <br />
            entrada
          </h2>
        </button>
        <button>
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
  section {
    background: #ffffff;
    border-radius: 5px;
    color: #868686;
    margin: 5% 0 2% 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 141px - 10%);
  }
`;
