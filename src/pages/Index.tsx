import { useState } from "react";
import { TorahWord } from "@/components/TorahWord";
import { Commentary } from "@/components/Commentary";
import { TorahNavigation } from "@/components/TorahNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Bookmark, Settings } from "lucide-react";

// Данные для демонстрации разных книг
const TORAH_DATA = {
  Genesis: {
    hebrew: "בראשית",
    russian: "Берешит",
    verse: {
      hebrew: ["בְּרֵאשִׁית", "בָּרָא", "אֱלֹהִים", "אֵת", "הַשָּׁמַיִם", "וְאֵת", "הָאָרֶץ"],
      russian: "В начале сотворил Бог небо и землю.",
      words: [
        {
          hebrew: "בְּרֵאשִׁית",
          transliteration: "b'reshit",
          translations: [
            { meaning: "в начале", context: "временной период", grammar: "наречие" },
            { meaning: "в начале творения", context: "начало всего сущего" },
            { meaning: "сначала", context: "первым делом" }
          ]
        },
        {
          hebrew: "בָּרָא",
          transliteration: "bara",
          translations: [
            { meaning: "создал", context: "творение из ничего", grammar: "глагол прошедшего времени" },
            { meaning: "сотворил", context: "божественное творение" },
            { meaning: "произвел", context: "привел в существование" }
          ]
        },
        {
          hebrew: "אֱלֹהִים",
          transliteration: "Elohim",
          translations: [
            { meaning: "Бог", context: "множественная форма величия", grammar: "имя существительное" },
            { meaning: "Всесильный", context: "одно из имен Всевышнего" },
            { meaning: "Творец", context: "создатель мира" }
          ]
        },
        {
          hebrew: "אֵת",
          transliteration: "et",
          translations: [
            { meaning: "— ", context: "указательная частица", grammar: "частица" },
            { meaning: "[знак прямого дополнения]", context: "грамматическая функция" }
          ]
        },
        {
          hebrew: "הַשָּׁמַיִם",
          transliteration: "ha-shamayim",
          translations: [
            { meaning: "небо", context: "небосвод", grammar: "имя существительное с артиклем" },
            { meaning: "небеса", context: "духовные миры" },
            { meaning: "высь", context: "верхние пределы" }
          ]
        },
        {
          hebrew: "וְאֵת",
          transliteration: "v'et",
          translations: [
            { meaning: "и —", context: "союз + указательная частица", grammar: "союз + частица" },
            { meaning: "и [знак дополнения]", context: "грамматическая функция" }
          ]
        },
        {
          hebrew: "הָאָרֶץ",
          transliteration: "ha-aretz",
          translations: [
            { meaning: "землю", context: "планета Земля", grammar: "имя существительное с артиклем" },
            { meaning: "сушу", context: "твердая поверхность" },
            { meaning: "страну", context: "территория" }
          ]
        }
      ]
    },
    commentaries: [
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
    ]
  },
  Exodus: {
    hebrew: "שמות",
    russian: "Шмот",
    verse: {
      hebrew: ["וְאֵלֶּה", "שְׁמוֹת", "בְּנֵי", "יִשְׂרָאֵל", "הַבָּאִים", "מִצְרָיְמָה"],
      russian: "И вот имена сынов Израилевых, пришедших в Египет.",
      words: [
        {
          hebrew: "וְאֵלֶּה",
          transliteration: "v'eleh",
          translations: [
            { meaning: "и вот", context: "указание", grammar: "союз + местоимение" },
            { meaning: "и эти", context: "перечисление" }
          ]
        },
        {
          hebrew: "שְׁמוֹת",
          transliteration: "shmot",
          translations: [
            { meaning: "имена", context: "названия", grammar: "имя существительное" },
            { meaning: "наименования", context: "обозначения" }
          ]
        },
        {
          hebrew: "בְּנֵי",
          transliteration: "bnei",
          translations: [
            { meaning: "сыновей", context: "потомки", grammar: "имя существительное" },
            { meaning: "сынов", context: "мужское потомство" }
          ]
        },
        {
          hebrew: "יִשְׂרָאֵל",
          transliteration: "Yisrael",
          translations: [
            { meaning: "Израиля", context: "праотец Яаков", grammar: "имя собственное" },
            { meaning: "Израилевых", context: "потомки Яакова" }
          ]
        },
        {
          hebrew: "הַבָּאִים",
          transliteration: "ha-baim",
          translations: [
            { meaning: "пришедших", context: "прибывших", grammar: "причастие с артиклем" },
            { meaning: "приходящих", context: "входящих" }
          ]
        },
        {
          hebrew: "מִצְרָיְמָה",
          transliteration: "mitzrayma",
          translations: [
            { meaning: "в Египет", context: "направление движения", grammar: "имя собственное с окончанием направления" },
            { meaning: "в землю египетскую", context: "географическое место" }
          ]
        }
      ]
    },
    commentaries: [
      {
        author: "Раши",
        text: "И вот имена — хотя уже перечислил их при жизни, вновь перечисляет их после смерти, чтобы показать, насколько они дороги Ему.",
        category: ""
      }
    ]
  },
  Leviticus: {
    hebrew: "ויקרא",
    russian: "Ваикра",
    verse: {
      hebrew: ["וַיִּקְרָא", "אֶל־", "מֹשֶׁה"],
      russian: "И воззвал к Моисею.",
      words: [
        {
          hebrew: "וַיִּקְרָא",
          transliteration: "vayikra",
          translations: [
            { meaning: "и воззвал", context: "обращение", grammar: "глагол" },
            { meaning: "и призвал", context: "приглашение" }
          ]
        },
        {
          hebrew: "אֶל־",
          transliteration: "el",
          translations: [
            { meaning: "к", context: "направление", grammar: "предлог" },
            { meaning: "в сторону", context: "обращение к кому-то" }
          ]
        },
        {
          hebrew: "מֹשֶׁה",
          transliteration: "Moshe",
          translations: [
            { meaning: "Моисею", context: "пророк", grammar: "имя собственное" },
            { meaning: "Моше", context: "еврейское имя" }
          ]
        }
      ]
    },
    commentaries: [
      {
        author: "Раши",
        text: "И воззвал — выражение любви, выражение, которым пользуются ангелы служения.",
        category: ""
      }
    ]
  },
  Numbers: {
    hebrew: "במדבר",
    russian: "Бемидбар",
    verse: {
      hebrew: ["וַיְדַבֵּר", "יְהוָה", "אֶל־", "מֹשֶׁה", "בְּמִדְבַּר", "סִינַי"],
      russian: "И говорил Господь Моисею в пустыне Синайской.",
      words: [
        {
          hebrew: "וַיְדַבֵּר",
          transliteration: "vayedaber",
          translations: [
            { meaning: "и говорил", context: "речь", grammar: "глагол" },
            { meaning: "и сказал", context: "произнесение" }
          ]
        },
        {
          hebrew: "יְהוָה",
          transliteration: "Adonai",
          translations: [
            { meaning: "Господь", context: "имя Всевышнего", grammar: "имя собственное" },
            { meaning: "Всевышний", context: "Творец мира" }
          ]
        },
        {
          hebrew: "אֶל־",
          transliteration: "el",
          translations: [{ meaning: "к", context: "направление", grammar: "предлог" }]
        },
        {
          hebrew: "מֹשֶׁה",
          transliteration: "Moshe",
          translations: [{ meaning: "Моисею", context: "пророк", grammar: "имя собственное" }]
        },
        {
          hebrew: "בְּמִדְבַּר",
          transliteration: "bemidbar",
          translations: [
            { meaning: "в пустыне", context: "географическое место", grammar: "предлог + существительное" },
            { meaning: "в степи", context: "безлюдное место" }
          ]
        },
        {
          hebrew: "סִינַי",
          transliteration: "Sinai",
          translations: [
            { meaning: "Синайской", context: "гора Синай", grammar: "имя собственное" },
            { meaning: "Синай", context: "место дарования Торы" }
          ]
        }
      ]
    },
    commentaries: [
      {
        author: "Раши",
        text: "В пустыне Синайской — почему здесь упоминается место? Чтобы научить, что слова Торы дороги лишь тому, кто делает себя как пустыня.",
        category: ""
      }
    ]
  },
  Deuteronomy: {
    hebrew: "דברים",
    russian: "Дварим",
    verse: {
      hebrew: ["אֵלֶּה", "הַדְּבָרִים", "אֲשֶׁר", "דִּבֶּר", "מֹשֶׁה"],
      russian: "Вот слова, которые говорил Моисей.",
      words: [
        {
          hebrew: "אֵלֶּה",
          transliteration: "eleh",
          translations: [
            { meaning: "вот", context: "указание", grammar: "местоимение" },
            { meaning: "эти", context: "перечисление" }
          ]
        },
        {
          hebrew: "הַדְּבָרִים",
          transliteration: "ha-dvarim",
          translations: [
            { meaning: "слова", context: "речь", grammar: "существительное с артиклем" },
            { meaning: "речи", context: "высказывания" }
          ]
        },
        {
          hebrew: "אֲשֶׁר",
          transliteration: "asher",
          translations: [
            { meaning: "которые", context: "относительное местоимение", grammar: "местоимение" },
            { meaning: "что", context: "союзное слово" }
          ]
        },
        {
          hebrew: "דִּבֶּר",
          transliteration: "diber",
          translations: [
            { meaning: "говорил", context: "речь", grammar: "глагол прошедшего времени" },
            { meaning: "произносил", context: "высказывание" }
          ]
        },
        {
          hebrew: "מֹשֶׁה",
          transliteration: "Moshe",
          translations: [
            { meaning: "Моисей", context: "пророк", grammar: "имя собственное" },
            { meaning: "Моше", context: "еврейское имя" }
          ]
        }
      ]
    },
    commentaries: [
      {
        author: "Раши",
        text: "Вот слова — слова увещевания. Поскольку это слова увещевания, и здесь перечислены все места, где они прогневили Всемогущего, поэтому завуалировал слова и упомянул их только намеком.",
        category: ""
      }
    ]
  }
};

const Index = () => {
  const [currentBook, setCurrentBook] = useState("Genesis");
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [activeWordPosition, setActiveWordPosition] = useState<number | null>(null);

  // Получаем данные текущей книги
  const currentBookData = TORAH_DATA[currentBook as keyof typeof TORAH_DATA];

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
                    {currentBookData.hebrew} {currentChapter}:{currentVerse} • {currentBookData.russian} {currentChapter}:{currentVerse}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hebrew and Russian Text Side by Side */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Hebrew Text */}
                  <div className="order-1">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-lg h-full flex flex-col">
                      <h3 className="text-sm font-elegant text-blue-600 dark:text-blue-400 mb-3 text-center flex items-center justify-center gap-2">
                        עברית • Иврит
                        <span className="text-xs bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded-full">Кликните на слова</span>
                      </h3>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-right leading-loose text-xl text-yellow-600 dark:text-yellow-400 font-bold drop-shadow-sm" dir="rtl" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                          {currentBookData.verse.words.map((word, index) => (
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
                    <div className="bg-gradient-to-bl from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950 dark:via-yellow-950 dark:to-orange-950 p-8 rounded-xl border-2 border-amber-300 dark:border-amber-700 shadow-xl h-full flex flex-col relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 via-transparent to-yellow-100/20 dark:from-amber-900/20 dark:to-yellow-900/20"></div>
                      <h3 className="text-sm font-elegant text-amber-700 dark:text-amber-300 mb-4 text-center flex items-center justify-center gap-2 relative z-10">
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                        Русский перевод
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                      </h3>
                      <div className="flex-1 flex items-center justify-center relative z-10">
                        <div className="text-center">
                          <p className="font-body text-xl leading-relaxed text-amber-900 dark:text-amber-100 font-medium drop-shadow-sm italic px-4 py-6 bg-white/40 dark:bg-black/20 rounded-lg border border-amber-200/50 dark:border-amber-700/50 backdrop-blur-sm">
                            "{currentBookData.verse.russian}"
                          </p>
                        </div>
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
              bookName={currentBookData.russian}
              commentaries={currentBookData.commentaries}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;