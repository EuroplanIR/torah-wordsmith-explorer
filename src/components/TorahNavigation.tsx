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
        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Book Selection */}
            <div className="relative">
              <div className="text-xs font-medium text-primary-foreground/80 mb-1">Книга</div>
              <Select value={currentBook} onValueChange={(value) => onNavigate(value, 1, 1)}>
                <SelectTrigger className="w-56 bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-2 border-blue-300/50 text-primary-foreground shadow-lg backdrop-blur-sm hover:from-blue-500/40 hover:to-blue-400/30 transition-all duration-300">
                  <SelectValue placeholder="Выберите книгу" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-blue-300/30 shadow-xl">
                  {TORAH_BOOKS.map((book) => (
                    <SelectItem key={book.english} value={book.english} className="hover:bg-blue-50">
                      <div className="flex items-center gap-2">
                        <span className="font-hebrew text-blue-600">{book.hebrew}</span>
                        <span className="font-elegant text-blue-800">• {book.russian}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Chapter Selection */}
            <div className="relative">
              <div className="text-xs font-medium text-primary-foreground/80 mb-1">Глава</div>
              <Select value={currentChapter.toString()} onValueChange={(value) => onNavigate(currentBook, parseInt(value), 1)}>
                <SelectTrigger className="w-32 bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-2 border-blue-300/50 text-primary-foreground shadow-lg backdrop-blur-sm hover:from-blue-500/40 hover:to-blue-400/30 transition-all duration-300">
                  <SelectValue placeholder="Глава" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-blue-300/30 shadow-xl">
                  {CHAPTERS.map((chapter) => (
                    <SelectItem key={chapter} value={chapter.toString()} className="hover:bg-blue-50">
                      <span className="font-elegant text-blue-800">Глава {chapter}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Verse Selection */}
            <div className="relative">
              <div className="text-xs font-medium text-primary-foreground/80 mb-1">Стих</div>
              <Select value={currentVerse.toString()} onValueChange={(value) => onNavigate(currentBook, currentChapter, parseInt(value))}>
                <SelectTrigger className="w-32 bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-2 border-blue-300/50 text-primary-foreground shadow-lg backdrop-blur-sm hover:from-blue-500/40 hover:to-blue-400/30 transition-all duration-300">
                  <SelectValue placeholder="Стих" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-blue-300/30 shadow-xl">
                  {VERSES.map((verse) => (
                    <SelectItem key={verse} value={verse.toString()} className="hover:bg-blue-50">
                      <span className="font-elegant text-blue-800">Стих {verse}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(currentBook, currentChapter, Math.max(1, currentVerse - 1))}
              className="text-primary-foreground hover:bg-white/20 bg-white/10 border border-white/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(currentBook, currentChapter, currentVerse + 1)}
              className="text-primary-foreground hover:bg-white/20 bg-white/10 border border-white/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};