import { useEffect, useState } from "react";

import { Book, Tag } from "./types";
import { fetchBooks } from "./api/BookApi";
import { BooksList } from "./components/BookList";
import { TagFilter } from "./components/TagsFilter";
import { MinRatingFilter } from "./components/MinRatingFilter";
import { SortSelector } from "./components/SortSelector";

function App() {
  //PART 1
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //PART 2
  const [filterText, setFilterText] = useState("");

  //PART 3
  const [selectedTag, setSelectedTag] = useState<Tag | "all">("all");
  const [minRating, setMinRating] = useState<number>(0);
  const allTags: Tag[] = [
    "tech",
    "non-fiction",
    "fiction",
    "fantasy",
    "history",
    "self-help",
    "science",
  ];

  //PART 4
  type SortOption = "none" | "title-asc" | "title-desc" | "rating-asc" | "rating-desc";
  const [sortOption, setSortOption] = useState<SortOption>("none");

  //PART 5
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);


  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "An error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("favoriteBookIds");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as string[];
        setFavoriteIds(parsed);
      } catch { }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteBookIds", JSON.stringify(favoriteIds));
  }, [favoriteIds]);



  if (loading) {
    return <div>Loading books…</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  const filteredBooks = books.filter((book) => {
    const text = filterText.toLowerCase();
    return (
      book.title.toLowerCase().includes(text) ||
      book.author.toLowerCase().includes(text)
    );
  });

  const filteredByTags =
    selectedTag === "all"
      ? filteredBooks
      : filteredBooks.filter((b) => b.tags.includes(selectedTag));

  const filteredByRating = filteredByTags.filter(
    (b) => b.rating >= minRating
  );

  const sortedBooks = [...filteredByRating].sort((a, b) => {
    switch (sortOption) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "rating-asc":
        return a.rating - b.rating;
      case "rating-desc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  const visibleBooks = showFavoritesOnly
    ? sortedBooks.filter((b) => favoriteIds.includes(b.id))
    : sortedBooks;

  function handleToggleFavorite(bookId: string) {
    setFavoriteIds((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  }

  function handleResetFilters() {
    setFilterText("");
    setSelectedTag("all");
    setMinRating(0);
    setSortOption('none');
    setShowFavoritesOnly(false);
    setFavoriteIds([]); 
  }


  return (
    <main style={{ padding: "1rem" }}>

      <h1 style={{ marginRight: 100 }}>Library Explorer</h1>
      <input type='text'
        placeholder="Search title or author"
        style={{ margin: '15px', padding: '5px', borderRadius: '50px' }}
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}>
      </input>

      <TagFilter selectedTag={selectedTag} onChange={setSelectedTag} tags={allTags} />

      <MinRatingFilter value={minRating} onChange={setMinRating} />

      <SortSelector value={sortOption} onChange={setSortOption} />
      <button
        type="button"
        onClick={handleResetFilters}
        style={{
          marginLeft: 8,
          padding: "6px 10px",
          borderRadius: 6,
          border: "1px solid #d0d0d0",
          background: "#fff",
          cursor: "pointer",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        }}
      >
        Reset
      </button>
      <label style={{ marginLeft: 8 }}>
        <input
          type="checkbox"
          checked={showFavoritesOnly}
          onChange={(e) => setShowFavoritesOnly(e.target.checked)}
        />
        {" "}Show favorites only
      </label>


      <BooksList
        books={visibleBooks}
        favoriteIds={favoriteIds}
        onToggleFavorite={handleToggleFavorite}
      />

    </main>
  );
}

export default App;
