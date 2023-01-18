import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import ARInvoice from "./pages/ARInvoice";
import APInvoice from "./pages/APInvoice";

export default function App() {
  return (
    <div>
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
    </div>
  );
}
