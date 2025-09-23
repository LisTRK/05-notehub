import axios from "axios";
import type { CreateNoteProps, Note } from "../types/note";

interface NotesDataType {
  "notes": Note[],
  "totalPages": number
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common.Authorization = `Bearer ${ import.meta.env.VITE_NOTEHUB_TOKEN}`;


export const fetchNotes = async (query: string, page: number):Promise<NotesDataType> => {
    
const options = {
    params: {
        ...(query !== "" && {search: query}),
        
        ...(query === "" && {page: page,}),
        perPage: 10,
    }
};

    const response = await axios.get<NotesDataType>("notes", options);
    return response.data;
};






export const createNote =async (newNote: CreateNoteProps):Promise<Note> => {
    const response = await axios.post<Note>('/notes', newNote);
    return response.data;
 };

export const deleteNote =async (noteID: string):Promise<Note> => { 
    const response = await axios.delete<Note>(`/notes/${noteID}`);
     return response.data;
};

