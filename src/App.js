import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css'
import NotesPage from "./pages/NotesPage";
import ArchiveNotes from "./pages/ArchiveNotes";
import TrashNotes from "./pages/TrashNotes";
import Navbar from "./components/navbar/Navbar";
import { Stack } from "@mui/material";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import UserContext from "./context/user/UserContext";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} >
        <BrowserRouter>
          {user ? <Navbar /> : ''}
          <Routes>
            <Route exact path="/" element={user ? <NotesPage /> : <Navigate to="/login" />} />
            <Route exact path="/archive" element={user ? <ArchiveNotes /> : <Navigate to="/login" />} />
            <Route exact path="/bin" element={user ? <TrashNotes /> : <Navigate to="/login" />} />
            <Route exact path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route exact path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Stack>
    </>
  );
}

export default App;
