import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Translation {
  meaning: string;
  context?: string;
  grammar?: string;
}

interface TorahWordProps {
  hebrew: string;
  transliteration: string;
  translations: Translation[];
  verse: string;
  position: number;
  isActive: boolean;
  onToggle: (position: number) => void;
}

export const TorahWord = ({ hebrew, transliteration, translations, verse, position, isActive, onToggle }: TorahWordProps) => {
  return (
    <div className="relative inline-block mx-1">
      <button
        onClick={() => onToggle(position)}
        className="font-hebrew text-hebrew hover:bg-accent/20 rounded px-1 mx-0.5 transition-all duration-200 cursor-pointer border-b-2 border-transparent hover:border-accent hover:shadow-md hover:scale-105 relative group"
    >
      {hebrew}
      {/* Tooltip hint */}
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Нажмите для перевода
      </span>
    </button>
      
      {isActive && (
        <Card className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 max-w-[90vw] z-50 shadow-xl border-2 border-accent bg-background">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="text-center border-b pb-2">
                <div className="font-hebrew text-2xl text-foreground mb-1">{hebrew}</div>
                <div className="text-sm text-muted-foreground italic">{transliteration}</div>
                <div className="text-xs text-muted-foreground">Стих {verse}, слово {position}</div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-primary">Переводы:</h4>
                {translations.map((translation, index) => (
                  <div key={index} className="border-l-2 border-accent pl-3 py-1">
                    <div className="font-medium text-foreground">{translation.meaning}</div>
                    {translation.context && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Контекст: {translation.context}
                      </div>
                    )}
                    {translation.grammar && (
                      <div className="text-xs text-accent mt-1">
                        Грамматика: {translation.grammar}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};