import css from './App.module.css'
import { useState } from 'react'

import {  fetchNotes } from '../../services/noteService'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';

import Pagination from '../Pagination/Pagination';
import { createPortal } from 'react-dom';
import Modal from '../Modal/Modal';
import { useDebouncedCallback } from 'use-debounce';
import Loader from '../Loader/loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';



function App() {
  // const [noteData, setNoteData] = useState<NotesDataType>();
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const queryDebounced = useDebouncedCallback(
    (value) => {
      setQuery(value);
    },
    1000
  );
  const [isOpenModal, setIsOpanModal] = useState(false);

  
  
  const {
    data,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(
    {
      queryKey: ["query", {query, page}],
      queryFn: () => getTodo(query, page),
      placeholderData: keepPreviousData,
    },
    )
  
  const getTodo = async (query: string, page: number) => {
    try {
      const fetchTodo = await fetchNotes(query, page);
      return fetchTodo;
    } catch (error) {
      console.log(error);
    }
    
  };
  
  const handleCreateNote = () => {
    setIsOpanModal(true);
  }

  const handleChengeModal = () => {
    setIsOpanModal(false);
  }
 
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
		{/* Компонент SearchBox */}
        <SearchBox value={ query} onSearch={queryDebounced} />
        
		{/* Пагінація */}
        {isSuccess &&
          <Pagination
            page={page}
            totalPages={data?.totalPages??1}
            setPage={setPage}
          />}
        {/* Кнопка створення нотатки */}
        <button onClick={handleCreateNote}  className={css.button}>Create note +</button>
      
      </header>
      {isLoading && <Loader />}
      {isError&& <ErrorMessage/>}
      
      {isSuccess && <NoteList notes={data?.notes ?? []} />}
      {isOpenModal && createPortal(<Modal onChange={handleChengeModal} />, document.getElementById('modal') as HTMLElement)}
    </div>
    
  )
}

  export default App;
