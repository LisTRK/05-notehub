import css from "./SearchBox.module.css";

interface SearchBoxProps{
    value: string,
    onSearch:(value: string)=>void
}

const SearchBox = ({ value, onSearch }: SearchBoxProps) => {
    
    
    return <input
        defaultValue={value}
        onChange={(event)=>{onSearch(event.target.value)}}
                className={css.input}
                type="text"
                placeholder="Search notes"
            />
}

export default SearchBox;