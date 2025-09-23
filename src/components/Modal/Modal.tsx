// import NoteForm from "../NoteForm/NoteForm";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect } from "react";

interface ModalProps{
    children: React.ReactNode,
    onClose:()=>void,
}

const Modal = ({onClose, children}:ModalProps) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
    };
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };

     }, [onClose]);

    return createPortal((<div
        onClick={handleClick}
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
    >
        <div className={css.modal}>
            {children}
        </div>
    </div>), document.getElementById('modal') as HTMLElement);
};

export default Modal;