import { Book } from "../types";
import { BookItem } from "./BookItem";

interface BooksListProps {
  books: Book[];
  favoriteIds: string[];
  onToggleFavorite: (bookId: string) => void;
}

export function BooksList({ books, favoriteIds, onToggleFavorite }: BooksListProps) {
  return (
    <ul style={{ padding: 0, margin: 10 }}>
      {books.map((book: Book) => {
        const isFavorite = favoriteIds.includes(book.id);

        return (
          <BookItem
            key={book.id}
            book={book}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
          />
        );
      })}
    </ul>
  );
}
