import axios from "axios";
import type { CreateNodeProps, NotesDataType } from "../types/note";


axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common.Authorization = `Bearer ${ import.meta.env.VITE_NOTEHUB_TOKEN}`;


export const fetchNotes = async (query: string, page: number):Promise<NotesDataType> => {
    
const options = {
    params: {
        search: query,
        ...(query !== "" && {search: query}),
        
        ...(query === "" && {page: page,}),
        perPage: 10,
    }
};

    const response = await axios.get<NotesDataType>("notes", options);
    return response.data;
};






export const createNote =async (newNote: CreateNodeProps) => {
    axios.post('/notes', newNote);
 };

export const deleteNote =async (noteID: string) => { 
   await axios.delete(`/notes/${noteID}`);
};

