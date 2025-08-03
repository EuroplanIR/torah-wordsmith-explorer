import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Type, MessageCircle, Sparkles } from "lucide-react";

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
        className={`font-hebrew text-hebrew hover:bg-gradient-to-r hover:from-accent/20 hover:to-primary/20 rounded-lg px-2 py-1 mx-0.5 transition-all duration-300 cursor-pointer border-2 relative group transform hover:scale-110 ${
          isActive 
            ? 'border-primary bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg scale-105' 
            : 'border-transparent hover:border-accent/50'
        }`}
      >
        {hebrew}
        {/* Enhanced tooltip */}
        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg">
          <Sparkles className="w-3 h-3 inline mr-1" />
          Нажмите для перевода
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-accent"></div>
        </span>
      </button>
      
      {isActive && (
        <Card className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-96 max-w-[95vw] z-50 shadow-2xl border-0 bg-gradient-to-br from-background via-background/95 to-accent/5 backdrop-blur-sm animate-scale-in">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-50"></div>
          <CardContent className="relative p-6">
            <div className="space-y-4">
              {/* Header Section */}
              <div className="text-center pb-4 border-b border-gradient-to-r from-transparent via-accent/30 to-transparent">
                <div className="relative">
                  <div className="font-hebrew text-3xl text-primary mb-2 drop-shadow-sm">{hebrew}</div>
                  <div className="absolute -top-1 -right-1">
                    <Badge variant="outline" className="text-xs bg-primary/10 border-primary/30">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {position}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground italic mb-2">
                  <Type className="w-4 h-4" />
                  {transliteration}
                </div>
                <Badge variant="secondary" className="text-xs bg-accent/20 text-accent-foreground">
                  Стих {verse}
                </Badge>
              </div>
              
              {/* Translations Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold text-primary">Переводы и значения</h4>
                </div>
                
                <div className="space-y-3">
                  {translations.map((translation, index) => (
                    <div 
                      key={index} 
                      className="group relative rounded-lg bg-gradient-to-r from-card/50 to-accent/5 border border-accent/20 p-4 hover:from-accent/10 hover:to-primary/5 hover:border-accent/40 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent rounded-l-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="pl-3">
                        <div className="font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                          {translation.meaning}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {translation.context && (
                            <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground border-muted-foreground/30">
                              <MessageCircle className="w-3 h-3 mr-1" />
                              {translation.context}
                            </Badge>
                          )}
                          {translation.grammar && (
                            <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/30">
                              <Type className="w-3 h-3 mr-1" />
                              {translation.grammar}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Close hint */}
              <div className="text-center pt-2 border-t border-accent/20">
                <p className="text-xs text-muted-foreground opacity-70">
                  Нажмите на слово еще раз, чтобы закрыть
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};