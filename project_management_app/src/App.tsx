import { useState } from "react";
// import { useLocation,BrowserRouter,Routes,Route } from 'react-router';
// import { Outlet, Link } from 'react-router'
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
// import Sidebar from "./components/Sidebar";
// import Home from "./pages/Home"
import AppRouter from './Router';

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <AppRouter />
  );
}

export default App;
