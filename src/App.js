import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import Home from "./components/pages/Home";
import ARInvoice from "./components/pages/ARInvoice";
import APInvoice from "./components/pages/APInvoice";
import EditAPInvoice from "./components/pages/EditAPInvoice";
import EditARInvoice from "./components/pages/EditARInvoice";
import { EmailContext, NameContext, TokenContext } from "./context/context";
import EditUser from "./components/pages/EditUser";

export default function App() {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div>
      <TokenContext.Provider value={{ token, setToken }}>
        <EmailContext.Provider value={{ email, setEmail }}>
          <NameContext.Provider value={{ name, setName }}>
            <BrowserRouter>
              <GlobalStyle />
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/cadastro" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="nova-entrada" element={<ARInvoice />} />
                <Route path="nova-saida" element={<APInvoice />} />
                <Route
                  path="editar-entrada/:idExpense"
                  element={<EditARInvoice />}
                />
                <Route
                  path="editar-saida/:idExpense"
                  element={<EditAPInvoice />}
                />
                <Route path="editar-usuario/" element={<EditUser />} />
              </Routes>
            </BrowserRouter>
          </NameContext.Provider>
        </EmailContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}
