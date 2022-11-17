import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main/Main";

export function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
    </Routes>
  );
}
