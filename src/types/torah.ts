// Torah Data Types

export interface Translation {
  meaning: string;
  context?: string;
  grammar?: string;
  frequency?: 'common' | 'rare' | 'unique';
  etymology?: string;
  relatedWords?: string[];
}

export interface HebrewWord {
  hebrew: string;
  transliteration: string;
  root?: string; // שורש - Hebrew root
  translations: Translation[];
  morphology?: {
    partOfSpeech: string;
    gender?: 'masculine' | 'feminine';
    number?: 'singular' | 'plural' | 'dual';
    person?: '1st' | '2nd' | '3rd';
    tense?: 'past' | 'present' | 'future' | 'imperative';
    binyan?: string; // Hebrew verb form
  };
  occurrences?: number; // How many times this word appears in Torah
  firstOccurrence?: {
    book: string;
    chapter: number;
    verse: number;
  };
}

export interface Verse {
  number: number;
  hebrew: string[];
  russian: string;
  english?: string;
  words: HebrewWord[];
  cantillation?: string[]; // Trope marks
}

export interface Chapter {
  number: number;
  verses: Verse[];
  summary?: string;
}

export interface TorahBook {
  hebrew: string;
  russian: string;
  english: string;
  transliteration: string;
  chapters: Chapter[];
  wordCount?: number;
  uniqueWords?: number;
}

export interface Commentary {
  author: string;
  text: string;
  category: 'peshat' | 'remez' | 'drash' | 'sod' | 'halacha' | 'aggada';
  verse?: {
    book: string;
    chapter: number;
    verse: number;
  };
  language: 'hebrew' | 'russian' | 'english';
}

export interface HebrewLexicon {
  [key: string]: {
    root: string;
    meanings: Translation[];
    frequency: number;
    relatedWords: string[];
    biblicalUsage: Array<{
      book: string;
      chapter: number;
      verse: number;
      form: string;
    }>;
  };
}

export interface TorahDatabase {
  books: TorahBook[];
  lexicon: HebrewLexicon;
  commentaries: Commentary[];
  metadata: {
    totalWords: number;
    uniqueWords: number;
    lastUpdated: string;
    sources: string[];
  };
}