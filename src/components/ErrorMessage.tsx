import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = 'Ocurrió un error al cargar los datos',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-red-50 rounded-full p-6 mb-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        ¡Oops! Algo salió mal
      </h3>
      <p className="text-gray-600 max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Intentar nuevamente
        </Button>
      )}
    </div>
  );
};
