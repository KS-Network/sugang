import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Root from "./pages/Root/Root";

export function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/root" element={<Root />} />
      <Route exact path="*" element={<Main />} />
    </Routes>
  );
}
