import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {  NoteType } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";


interface NoteListProb{
  notes: NoteType[],
}

const NoteList = ({ notes }: NoteListProb) => {

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {queryClient.invalidateQueries({queryKey: ["query"]}) },
  })

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  }

  return <ul className={css.list}>
    {/* Набір елементів списку нотаток */}
    {notes.map(note => 
      <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
              <button onClick={()=>handleDelete(note.id)} className={css.button}>Delete</button>
          </div>
      </li>
    )}
  
</ul>
}

export default NoteList;