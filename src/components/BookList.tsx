import { Book } from "../types";

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
          <li
            key={book.id}
            style={{
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>Title: {book.title}</div>
              <div style={{ color: "#666", fontSize: "0.9rem" }}>
                <b>Author: </b>
                {book.author} — {book.year}
              </div>
              <div style={{ marginTop: 6, color: "#333", fontSize: "0.8rem" }}>
                {book.rating} / 5 <strong>-</strong> Tags: {[book.tags.join(", ")]}
              </div>
              <div style={{fontSize:'0.8rem',paddingTop:'2px'}}><strong>Description :</strong> {book.description}</div>
            </div>

            
            <button
              onClick={() => onToggleFavorite(book.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.5rem",
                marginLeft: "10px"
              }}
              
            >
              {isFavorite ? "⭐" : "☆"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
