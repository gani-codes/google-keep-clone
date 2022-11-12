import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import NotesPage from "./pages/NotesPage";
import ArchiveNotes from "./pages/ArchiveNotes";
import TrashNotes from "./pages/TrashNotes";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<NotesPage />} />
          <Route exact path="/archive" element={<ArchiveNotes />} />
          <Route exact path="/bin" element={<TrashNotes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
