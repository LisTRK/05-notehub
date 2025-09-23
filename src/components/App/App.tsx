import css from './App.module.css'
import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import {  fetchNotes } from '../../services/noteService'

import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import Loader from '../Loader/loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import NoteForm from '../NoteForm/NoteForm';



function App() {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const queryDebounced = useDebouncedCallback(
    (value) => {
      setPage(1);
      setQuery(value);
    },
    500
  );
  const [isOpenModal, setIsOpenModal] = useState(false);

  
  const getTodo = async (query: string, page: number) => {
    try {
      const fetchTodo = await fetchNotes(query, page);
      return fetchTodo;
    } catch (error) {
      console.log(error);
    }
    
  };
  
  const {
    data,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(
    {
      queryKey: ["notes", query, page],
      queryFn: () => getTodo(query, page),
      placeholderData: keepPreviousData,
    },
    )
  
  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
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
        <button onClick={handleOpenModal}  className={css.button}>Create note +</button>
      
      </header>
      {isLoading && <Loader />}
      {isError&& <ErrorMessage/>}
      
      {isSuccess && <NoteList notes={data?.notes ?? []} />}
      {isOpenModal && <Modal onClose={handleOpenModal}>
        <NoteForm onClose={handleOpenModal} />
      </Modal>}
    </div>
    
  )
}

  export default App;
