export interface NotesDataType {
  "notes": NoteType[],
  "totalPages": number
}

export interface NoteType  {
      "id": string,
      "title": string,
      "content": string,
      "createdAt": string,
      "updatedAt": string,
      "tag": string
}
    
export interface CreateNodeProps{
                title: string,
                content: string,
                tag: string,
}

