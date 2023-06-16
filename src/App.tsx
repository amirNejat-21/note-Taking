import { useState, useEffect } from "react";
import axios from "axios";
import AddNote from "./components/AddNote";
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import Footer from "./components/Footer"
import './App.css';
import NameInput from "./components/NameInput";
import LanguageSwitcher from "./components/LanguageSwitcher";

interface Note {
  id: string;
  title: string;
  text: string;
}

function App(): JSX.Element {

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = async () => {
    const response = await axios.get<Note[]>(`https://jsonplaceholder.typicode.com/posts`);
    setNotes(response.data);
  }

  const createNote = async (note: Note) => {
    const response = await axios.post<Note>(`https://jsonplaceholder.typicode.com/posts`, note);
    setNotes([...notes, response.data]);
  }

  const updateNote = async (editNote: Note) => {
    const response = await axios.put<Note>(`https://jsonplaceholder.typicode.com/posts/${editNote.id}`, {
      title: editNote.title,
      text: editNote.text
    });

    const updatedNotes = notes.map((note) => {
      if (note.id === response.data.id) {
        return { ...editNote };
      }
      return note;
    });

    setNotes([...updatedNotes]);
  }

  const deleteNote = async (id: string) => {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes([...updatedNotes]);
  }

  return <div>
        <Header />   
        <LanguageSwitcher/>
        <NameInput/>
        <AddNote onAddNote={createNote} />
        <NoteList notes={notes}
          onEditNote={updateNote}
          onDeleteNote={deleteNote} />
        <Footer/>
  </div>
}

export default App;