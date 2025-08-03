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
        className="font-hebrew text-foreground hover:text-accent transition-colors cursor-pointer underline decoration-dotted underline-offset-4"
      >
        {hebrew}
      </button>
      
      {isActive && (
        <Card className="absolute z-10 mt-2 w-80 shadow-lg border-2 border-accent/30">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="text-center border-b border-border pb-2">
                <div className="text-xl font-hebrew text-hebrew-accent mb-1">{hebrew}</div>
                <div className="text-sm text-muted-foreground font-body italic">{transliteration}</div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-primary font-elegant">Переводы:</h4>
                {translations.map((translation, index) => (
                  <div key={index} className="p-2 bg-secondary/50 rounded-md">
                    <div className="text-translation font-body">{translation.meaning}</div>
                    {translation.context && (
                      <div className="text-xs text-muted-foreground mt-1 font-body italic">
                        Контекст: {translation.context}
                      </div>
                    )}
                    {translation.grammar && (
                      <div className="text-xs text-commentary mt-1 font-body">
                        Грамматика: {translation.grammar}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-xs text-muted-foreground pt-2 border-t border-border font-body">
                Стих {verse}, слово {position}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};