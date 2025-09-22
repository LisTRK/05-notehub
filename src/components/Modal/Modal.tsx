import NoteForm from "../NoteForm/NoteForm";
import css from "./Modal.module.css";

interface ModalProps{
    onChange: (isOpenModal: boolean) => void
}

const Modal = ({onChange}:ModalProps) => {
    
    return <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
    >
        <div className={css.modal}>
            <NoteForm onChange={onChange}  />
            
        </div>
    </div>
};

export default Modal;