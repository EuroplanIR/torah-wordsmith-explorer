import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

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
  { hebrew: "במדבר", russian: "Бамидбар", english: "Numbers" },
  { hebrew: "דברים", russian: "Дварим", english: "Deuteronomy" }
];

export const TorahNavigation = ({ currentBook, currentChapter, currentVerse, onNavigate }: TorahNavigationProps) => {
  const [showBooks, setShowBooks] = useState(false);
  
  const currentBookData = TORAH_BOOKS.find(book => book.english === currentBook);

  return (
    <Card className="mb-6 bg-secondary/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBooks(!showBooks)}
              className="font-elegant"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {currentBookData?.russian}
            </Button>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-elegant">
                Глава {currentChapter}
              </Badge>
              <Badge variant="outline" className="font-body">
                Стих {currentVerse}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(currentBook, currentChapter, Math.max(1, currentVerse - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(currentBook, currentChapter, currentVerse + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {showBooks && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {TORAH_BOOKS.map((book) => (
                <Button
                  key={book.english}
                  variant={book.english === currentBook ? "default" : "ghost"}
                  className="h-auto p-3 flex flex-col items-center gap-1"
                  onClick={() => {
                    onNavigate(book.english, 1, 1);
                    setShowBooks(false);
                  }}
                >
                  <div className="font-hebrew text-sm">{book.hebrew}</div>
                  <div className="font-elegant text-xs">{book.russian}</div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};