import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./Context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message)=>{
    setAlert({
      type: type,
      msg : message
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
}
  return (
    <>
    <NoteState showAlert={showAlert}>
      <BrowserRouter>
      <Navbar showAlert={showAlert}/>
      <Alert alert={alert}/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/login" element={<Login showAlert={showAlert}/>} />
          <Route path="/signup" element={<Signup showAlert={showAlert}/>}/>
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
