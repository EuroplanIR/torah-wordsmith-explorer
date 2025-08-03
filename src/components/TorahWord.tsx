
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BookOpen, Type, MessageCircle, Sparkles, X } from "lucide-react";

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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => onToggle(position)}
              className={`font-hebrew text-hebrew hover:bg-gradient-to-r hover:from-accent/20 hover:to-primary/20 rounded-lg px-2 py-1 mx-0.5 transition-all duration-300 cursor-pointer border-2 relative group transform hover:scale-110 ${
                isActive 
                  ? 'border-primary bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg scale-105 active' 
                  : 'border-transparent hover:border-accent/50'
              }`}
            >
              {hebrew}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Нажмите для перевода</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {isActive && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] w-96 max-w-[95vw] max-h-[80vh] overflow-y-auto">
          <Card className="shadow-2xl border-0 bg-background animate-scale-in overflow-hidden">
          {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10 h-8 w-8 p-0 hover:bg-accent/20"
              onClick={() => onToggle(position)}
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
            <CardContent className="relative p-6">
              <div className="space-y-5">
                {/* Header Section */}
                <div className="text-center pb-4 relative">
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
                  <div className="relative">
                    <div className="font-hebrew text-4xl text-primary mb-3 drop-shadow-sm">{hebrew}</div>
                    <div className="absolute -top-1 -right-1">
                      <Badge variant="outline" className="text-xs bg-primary/10 border-primary/30 shadow-sm">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {position}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-base text-muted-foreground italic mb-3">
                    <Type className="w-4 h-4" />
                    {transliteration}
                  </div>
                  <Badge variant="secondary" className="text-xs bg-accent/20 text-accent-foreground shadow-sm">
                    Стих {verse}
                  </Badge>
                </div>
                
                {/* Translations Section */}
                <div className="space-y-4">
                  {translations.map((translation, index) => (
                    <div 
                      key={index} 
                      className="group relative rounded-xl bg-gradient-to-r from-card/60 to-accent/10 border border-accent/20 p-5 hover:from-accent/15 hover:to-primary/10 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary to-accent rounded-l-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="pl-4">
                        <div className="font-semibold text-foreground text-lg mb-3 group-hover:text-primary transition-colors leading-relaxed">
                          {translation.meaning}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {translation.context && (
                            <Badge variant="outline" className="text-xs bg-muted/60 text-muted-foreground border-muted-foreground/30 hover:bg-muted/80 transition-colors">
                              <MessageCircle className="w-3 h-3 mr-1" />
                              {translation.context}
                            </Badge>
                          )}
                          {translation.grammar && (
                            <Badge variant="outline" className="text-xs bg-accent/15 text-accent-foreground border-accent/40 hover:bg-accent/25 transition-colors">
                              <Type className="w-3 h-3 mr-1" />
                              {translation.grammar}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Close hint */}
                <div className="text-center pt-3 relative">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
                  <p className="text-xs text-muted-foreground opacity-70 mt-3">
                    Кликните на X, чтобы закрыть
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
