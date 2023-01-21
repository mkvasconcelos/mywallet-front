import styled from "styled-components";

export const ContainerSignStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  text-align: center;
  h1 {
    font-family: "Saira Stencil One", cursive, Arial, Helvetica, sans-serif;
    font-size: 32px;
  }
  h2 {
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
  }
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10%;
`;

export const ContainerInvoicesStyled = styled.div`
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

export const ContainerHomeStyled = styled.div`
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
    cursor: pointer;
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

export const ExpensesStyled = styled.article`
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

export const BalanceStyled = styled.article`
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
