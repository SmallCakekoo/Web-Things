import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Note = {
  id: number;
  title: string;
  description: string;
};

type NotesState = {
  list: Note[];
};

const initialState: NotesState = {
  list: [],
};

type AddNotePayload = {
  title: string;
  description: string;
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // El tipado de payload es así porque
    // ts tiene q saber q trae el action.payload en el reducer
    addNote: (state, action: PayloadAction<AddNotePayload>) => {
      state.list.push({
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
      });
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
