import { useState } from "react";
import { TorahWord } from "@/components/TorahWord";
import { Commentary } from "@/components/Commentary";
import { TorahNavigation } from "@/components/TorahNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Bookmark, Settings } from "lucide-react";

// Пример данных для демонстрации
const SAMPLE_VERSE = {
  hebrew: ["בְּרֵאשִׁית", "בָּרָא", "אֱלֹהִים", "אֵת", "הַשָּׁמַיִם", "וְאֵת", "הָאָרֶץ"],
  words: [
    {
      hebrew: "בְּרֵאשִׁית",
      transliteration: "b'reshit",
      translations: [
        { meaning: "в начале", context: "временной период", grammar: "наречие" },
        { meaning: "в начале творения", context: "начало всего сущего" },
        { meaning: "сначала", context: "первым делом" },
        { meaning: "вначале", context: "в самом начале времени" }
      ]
    },
    {
      hebrew: "בָּרָא",
      transliteration: "bara",
      translations: [
        { meaning: "создал", context: "творение из ничего", grammar: "глагол прошедшего времени" },
        { meaning: "сотворил", context: "божественное творение" },
        { meaning: "произвел", context: "привел в существование" },
        { meaning: "образовал", context: "придал форму" },
        { meaning: "устроил", context: "организовал, упорядочил" }
      ]
    },
    {
      hebrew: "אֱלֹהִים",
      transliteration: "Elohim",
      translations: [
        { meaning: "Бог", context: "множественная форма величия", grammar: "имя существительное" },
        { meaning: "Всесильный", context: "одно из имен Всевышнего" },
        { meaning: "Властелин", context: "владыка всего сущего" },
        { meaning: "Творец", context: "создатель мира" },
        { meaning: "Судья", context: "вершащий справедливость" }
      ]
    }
  ]
};

const SAMPLE_COMMENTARIES = [
  {
    author: "Раши",
    text: "В начале творения небес и земли. Если ты пришел объяснить стих в его простом смысле, то следует так: в начале творения небес и земли, когда земля была пуста и необитаема...",
    category: ""
  },
  {
    author: "Рамбан", 
    text: "Тора начинается с буквы бет, чтобы указать на благословение. Как сказали наши мудрецы: 'Мир был сотворен заслугой Торы'.",
    category: ""
  }
];

const Index = () => {
  const [currentBook, setCurrentBook] = useState("Genesis");
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [activeWordPosition, setActiveWordPosition] = useState<number | null>(null);

  const handleNavigate = (book: string, chapter: number, verse: number) => {
    setCurrentBook(book);
    setCurrentChapter(chapter);
    setCurrentVerse(verse);
    setActiveWordPosition(null);
  };

  const handleWordToggle = (position: number) => {
    setActiveWordPosition(activeWordPosition === position ? null : position);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header - в стиле флага Израиля */}
      <header className="israeli-gradient border-b-2 border-accent tehelet-shadow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-elegant font-bold text-primary-foreground drop-shadow-sm">
                תורה Torah
              </h1>
              <Badge variant="secondary" className="font-body star-david-accent">
                Подстрочный перевод • תרגום מילה במילה
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <TorahNavigation
          currentBook={currentBook}
          currentChapter={currentChapter}
          currentVerse={currentVerse}
          onNavigate={handleNavigate}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Text */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="font-elegant text-primary">
                    בראשית {currentChapter}:{currentVerse} • Берешит {currentChapter}:{currentVerse}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hebrew and Russian Text Side by Side */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Hebrew Text */}
                  <div className="order-1">
                    <div className="bg-gradient-to-bl from-yellow-50 to-amber-100 dark:from-yellow-950 dark:to-amber-900 p-6 rounded-xl border-2 border-yellow-200 dark:border-yellow-800 shadow-lg h-full flex flex-col">
                      <h3 className="text-sm font-elegant text-amber-600 dark:text-amber-400 mb-3 text-center flex items-center justify-center gap-2">
                        עברית • Иврит
                        <span className="text-xs bg-amber-200 dark:bg-amber-800 px-2 py-1 rounded-full">Кликните на слова</span>
                      </h3>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-right leading-loose text-xl" dir="rtl">
                          {SAMPLE_VERSE.words.map((word, index) => (
                            <TorahWord
                              key={index}
                              hebrew={word.hebrew}
                              transliteration={word.transliteration}
                              translations={word.translations}
                              verse={`${currentChapter}:${currentVerse}`}
                              position={index + 1}
                              isActive={activeWordPosition === index + 1}
                              onToggle={handleWordToggle}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Russian Translation */}
                  <div className="order-2">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-lg h-full flex flex-col">
                      <h3 className="text-sm font-elegant text-blue-600 dark:text-blue-400 mb-3 text-center">
                        Русский перевод
                      </h3>
                      <div className="flex-1 flex items-center justify-center">
                        <p className="font-body text-lg leading-relaxed text-center text-blue-900 dark:text-blue-100">
                          В начале сотворил Бог небо и землю.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Commentary Sidebar */}
          <div className="space-y-4">
            <Commentary
              verse={`${currentChapter}:${currentVerse}`}
              bookName="Берешит"
              commentaries={SAMPLE_COMMENTARIES}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;