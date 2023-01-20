import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import ARInvoice from "./pages/ARInvoice";
import APInvoice from "./pages/APInvoice";
import { NameContext, TokenContext } from "./context/context";

export default function App() {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  return (
    <div>
      <TokenContext.Provider value={{ token, setToken }}>
        <NameContext.Provider value={{ name, setName }}>
          <BrowserRouter>
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/cadastro" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="nova-entrada" element={<ARInvoice />} />
              <Route path="nova-saida" element={<APInvoice />} />
            </Routes>
          </BrowserRouter>
        </NameContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}
