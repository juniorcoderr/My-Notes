import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Notes } from "./pages/Notes";
import { CreateNote } from "./pages/CreateNote";
import { EditNote } from "./pages/EditNote";
//import dummyNotes from './dummy_notes'

import { useEffect, useState } from "react";

const App = () => {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("notes")) || [];
    } catch (error) {
      console.error("Error parsing notes from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Error storing notes in localStorage:", error);
    }
  }, [notes]);

  return (
    <main id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notes notes={notes} />} />
          <Route
            path="/create-note"
            element={<CreateNote setNotes={setNotes} />}
          />
          <Route
            path="/edit-note/:id"
            element={<EditNote notes={notes} setNotes={setNotes} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
