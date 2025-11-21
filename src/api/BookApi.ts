import { Book } from "../types";


export async function fetchBooks() : Promise<Book[]>{
    try{
    const res = await fetch('/books.json')
    if (!res.ok) {
        throw new Error('Failed to fetch books');
    }
    const data = await res.json();
    // console.log(data)
    return data as Book[]; 
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}


