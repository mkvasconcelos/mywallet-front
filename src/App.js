import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import ARInvoice from "./pages/ARInvoice";
import APInvoice from "./pages/APInvoice";
import EditAPInvoice from "./pages/EditAPInvoice";
import EditARInvoice from "./pages/EditARInvoice";
import { EmailContext, NameContext, TokenContext } from "./context/context";

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
              </Routes>
            </BrowserRouter>
          </NameContext.Provider>
        </EmailContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}
