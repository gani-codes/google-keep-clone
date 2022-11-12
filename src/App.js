import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import NotesPage from "./pages/NotesPage";
import ArchiveNotes from "./pages/ArchiveNotes";
import TrashNotes from "./pages/TrashNotes";
import Navbar from "./components/navbar/Navbar";
import { Stack } from "@mui/material";

function App() {
  return (
    <>

      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<NotesPage />} />
            <Route exact path="/archive" element={<ArchiveNotes />} />
            <Route exact path="/bin" element={<TrashNotes />} />
          </Routes>
        </BrowserRouter>
      </Stack>
    </>
  );
}

export default App;
