import { Field, Form, Formik, ErrorMessage  } from "formik";
import css from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";
import { useMutation, useQueryClient} from '@tanstack/react-query';
import * as Yup from 'yup';
import type { CreateNoteProps } from "../../types/note";

interface NoteFormProps {
    onClose: ()=>void,
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newTodo: CreateNoteProps) => createNote(newTodo),
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    },
    onError:(error)=>{console.log("error: ", error);
    },
    
  })
    const handleClick = () => {
      onClose();
      
    }

    const SignupSchema = Yup.object().shape({
   title: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Title is required'),
        content: Yup.string()
          .max(500, 'Too Long!')
            .required('Content is required'),
        tag: Yup.string().oneOf(["Todo" ,"Work","Personal","Meeting","Shopping"] ).required(),
 });

    
    return <Formik
        initialValues={ 
            {
                title: '',
                content: '',
                tag: 'Todo',
            }
        }
        validationSchema={SignupSchema}
        onSubmit={(value, actions) => {
          mutation.mutate(value);
          actions.resetForm();
        }}
    >
    {({isValid , dirty})=>(<Form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <Field id="title" type="text" name="title" className={css.input} />
    <ErrorMessage component="span" name="title" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
                <Field as="textarea"
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
    <ErrorMessage component="span" name="content" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <Field as="select" id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <ErrorMessage component="span" name="tag" className={css.error} />
  </div>

  <div className={css.actions}>
    <button onClick={handleClick} type="button" className={css.cancelButton}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={!isValid || !dirty}
    >
      Create note
    </button>
  </div>
        </Form>)}
        </Formik>
}

export default NoteForm;