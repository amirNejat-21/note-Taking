import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNotes, createNote, updateNote, deleteNote } from './notesApi';

export interface Note {
  id: number;
  title: string;
  content: string;
}

export interface NotesState {
  notes: Note[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  status: 'idle',
  error: null,
};

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await getNotes();
  return response;
});

export const addNote = createAsyncThunk('notes/addNote', async ({ title, content }: { title: string, content: string }) => {
  const response = await createNote(title, content);
  return response;
});

export const updateExistingNote = createAsyncThunk('notes/updateExistingNote', async ({ id, title, content }: { id: number, title: string, content: string }) => {
  const response = await updateNote(id, title, content);
  return response;
});

export const removeNote = createAsyncThunk('notes/removeNote', async (id: number) => {
  await deleteNote(id);
  return id;
});

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateExistingNote.fulfilled, (state, action) => {
        const { id, title, content } = action.payload;
        const existingNote = state.notes.find(note => note.id === id);
        if (existingNote) {
          existingNote.title = title;
          existingNote.content = content;
        }
      })
      .addCase(removeNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(note => note.id === action.payload);
        if (index !== -1) {
          state.notes.splice(index, 1);
        }
      });
  },
});

export default notesSlice.reducer;