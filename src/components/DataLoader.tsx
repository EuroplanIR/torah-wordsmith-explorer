import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { useTorahData } from '@/hooks/useTorahData';

interface DataLoaderProps {
  onDataReady?: () => void;
}

export const DataLoader = ({ onDataReady }: DataLoaderProps) => {
  const { 
    database, 
    isLoading, 
    error, 
    progress, 
    refreshData 
  } = useTorahData();

  useEffect(() => {
    if (database && !isLoading && onDataReady) {
      onDataReady();
    }
  }, [database, isLoading, onDataReady]);

  if (!isLoading && database && !error) {
    return null; // Data is ready, hide loader
  }

  const progressPercentage = progress.total > 0 ? (progress.loaded / progress.total) * 100 : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md israeli-gradient tehelet-shadow">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <BookOpen className="h-12 w-12 text-blue-600" />
              {isLoading && (
                <RefreshCw className="h-4 w-4 text-blue-400 absolute -top-1 -right-1 animate-spin" />
              )}
            </div>
          </div>
          <CardTitle className="text-xl font-hebrew text-blue-800">
            {error ? 'Ошибка загрузки' : 'Загрузка данных Торы'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error ? (
            // Error state
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <p className="text-red-600 text-sm">{error}</p>
              <Button 
                onClick={refreshData}
                className="w-full bg-red-500 hover:bg-red-600 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Попробовать снова
              </Button>
            </div>
          ) : (
            // Loading state
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-blue-700 font-medium mb-2">
                  {progress.currentOperation}
                </p>
                <p className="text-blue-600 text-sm">
                  {progress.loaded} из {progress.total} этапов завершено
                </p>
              </div>

              <Progress 
                value={progressPercentage} 
                className="w-full h-3"
              />

              <div className="text-xs text-blue-600 text-center">
                {Math.round(progressPercentage)}% завершено
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Что загружается:
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      progress.loaded >= 1 ? 'bg-green-500' : 'bg-gray-300'
                    }`}></span>
                    Метаданные
                  </li>
                  <li className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      progress.loaded >= 2 ? 'bg-green-500' : 'bg-gray-300'
                    }`}></span>
                    Словарь иврита
                  </li>
                  <li className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      progress.loaded >= 3 ? 'bg-green-500' : 'bg-gray-300'
                    }`}></span>
                    Тексты книг
                  </li>
                  <li className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      progress.loaded >= 4 ? 'bg-green-500' : 'bg-gray-300'
                    }`}></span>
                    Морфологический анализ
                  </li>
                  <li className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      progress.loaded >= 5 ? 'bg-green-500' : 'bg-gray-300'
                    }`}></span>
                    Финализация
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-xs text-blue-500 italic">
                  Впервые может занять до минуты. 
                  <br />
                  Следующие запуски будут мгновенными.
                </p>
              </div>
            </div>
          )}

          {database && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">
                ✅ Данные готовы!
              </h4>
              <div className="text-sm text-green-700 space-y-1">
                <p>📚 Книг: {database.books.length}</p>
                <p>📝 Всего слов: {database.metadata.totalWords.toLocaleString()}</p>
                <p>🔤 Уникальных слов: {database.metadata.uniqueWords.toLocaleString()}</p>
                <p>📅 Обновлено: {new Date(database.metadata.lastUpdated).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};