import { useState, useEffect } from 'react';

export interface TorahWord {
  hebrew: string;
  transliteration: string;
  root?: string;
  translations: Array<{
    meaning: string;
    context: string;
    grammar?: string;
  }>;
}

export interface TorahVerse {
  number: number;
  hebrew: string[];
  russian: string;
  words: TorahWord[];
}

export interface TorahChapter {
  number: number;
  verses: TorahVerse[];
}

export interface TorahBook {
  english: string;
  hebrew: string;
  russian: string;
  transliteration: string;
  chapters: TorahChapter[];
}

const BOOK_FILES = {
  Genesis: 'genesis.json',
  Exodus: 'exodus.json',
  Leviticus: 'leviticus.json',
  Numbers: 'numbers.json',
  Deuteronomy: 'deuteronomy.json',
};

export const useTorahData = () => {
  const [books, setBooks] = useState<Record<string, TorahBook>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const loadedBooks: Record<string, TorahBook> = {};

        for (const [bookName, fileName] of Object.entries(BOOK_FILES)) {
          try {
            const response = await fetch(`/data/${fileName}`);
            if (!response.ok) {
              throw new Error(`Failed to load ${fileName}`);
            }
            const bookData = await response.json();
            loadedBooks[bookName] = bookData;
          } catch (bookError) {
            console.error(`Error loading ${bookName}:`, bookError);
          }
        }

        setBooks(loadedBooks);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Torah data');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const getVerse = (book: string, chapter: number, verse: number): TorahVerse | null => {
    const bookData = books[book];
    if (!bookData) return null;

    const chapterData = bookData.chapters.find(ch => ch.number === chapter);
    if (!chapterData) return null;

    const verseData = chapterData.verses.find(v => v.number === verse);
    return verseData || null;
  };

  const getBook = (bookName: string): TorahBook | null => {
    return books[bookName] || null;
  };

  const getChapterVerseCount = (book: string, chapter: number): number => {
    const bookData = books[book];
    if (!bookData) return 0;

    const chapterData = bookData.chapters.find(ch => ch.number === chapter);
    return chapterData ? chapterData.verses.length : 0;
  };

  const getBookChapterCount = (book: string): number => {
    const bookData = books[book];
    return bookData ? bookData.chapters.length : 0;
  };

  return {
    books,
    loading,
    error,
    getVerse,
    getBook,
    getChapterVerseCount,
    getBookChapterCount,
  };
};