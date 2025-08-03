import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TorahNavigationProps {
  currentBook: string;
  currentChapter: number;
  currentVerse: number;
  onNavigate: (book: string, chapter: number, verse: number) => void;
}

const TORAH_BOOKS = [
  { hebrew: "בראשית", russian: "Берешит", english: "Genesis" },
  { hebrew: "שמות", russian: "Шмот", english: "Exodus" },
  { hebrew: "ויקרא", russian: "Вайикра", english: "Leviticus" },
  { hebrew: "במדבר", russian: "Бамидבר", english: "Numbers" },
  { hebrew: "דברים", russian: "Дварим", english: "Deuteronomy" }
];

const CHAPTERS = Array.from({ length: 50 }, (_, i) => i + 1);
const VERSES = Array.from({ length: 100 }, (_, i) => i + 1);

export const TorahNavigation = ({ currentBook, currentChapter, currentVerse, onNavigate }: TorahNavigationProps) => {
  const currentBookData = TORAH_BOOKS.find(book => book.english === currentBook);

  return (
    <Card className="mb-6 israeli-gradient tehelet-shadow">
      <CardContent className="p-4">
        {/* Book Selection */}
        <div className="mb-4">
          <Select value={currentBook} onValueChange={(value) => onNavigate(value, 1, 1)}>
            <SelectTrigger className="w-64 bg-white/20 border-white/30 text-primary-foreground">
              <SelectValue placeholder="Выберите книгу" />
            </SelectTrigger>
            <SelectContent>
              {TORAH_BOOKS.map((book) => (
                <SelectItem key={book.english} value={book.english}>
                  <div className="flex items-center gap-2">
                    <span className="font-hebrew">{book.hebrew}</span>
                    <span className="font-elegant">• {book.russian}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Select value={currentChapter.toString()} onValueChange={(value) => onNavigate(currentBook, parseInt(value), 1)}>
                <SelectTrigger className="w-28 bg-white/20 border-white/30 text-primary-foreground">
                  <SelectValue placeholder="Глава" />
                </SelectTrigger>
                <SelectContent>
                  {CHAPTERS.map((chapter) => (
                    <SelectItem key={chapter} value={chapter.toString()}>
                      Глава {chapter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={currentVerse.toString()} onValueChange={(value) => onNavigate(currentBook, currentChapter, parseInt(value))}>
                <SelectTrigger className="w-28 bg-white/20 border-white/30 text-primary-foreground">
                  <SelectValue placeholder="Стих" />
                </SelectTrigger>
                <SelectContent>
                  {VERSES.map((verse) => (
                    <SelectItem key={verse} value={verse.toString()}>
                      Стих {verse}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(currentBook, currentChapter, Math.max(1, currentVerse - 1))}
              className="text-primary-foreground hover:bg-white/20"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(currentBook, currentChapter, currentVerse + 1)}
              className="text-primary-foreground hover:bg-white/20"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};