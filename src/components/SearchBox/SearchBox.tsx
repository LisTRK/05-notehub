import { useState } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps{
    
    onSearch:(value: string)=>void
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
    const [valueInput, setValueInput] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueInput(event.target.value);
        onSearch(event.target.value)
    }
    
    
    return <input
        defaultValue={valueInput}
        onChange={handleChange}
                className={css.input}
                type="text"
                placeholder="Search notes"
            />
}

export default SearchBox;