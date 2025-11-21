import { Book } from "../types";


export async function fetchBooks() : Promise<Book[]>{
    const res = await fetch('/books.json')
    const data = await res.json();
    // console.log(data)
    return data as Book[];    
}


