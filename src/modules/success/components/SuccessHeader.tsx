// src/app/order-success/components/SuccessHeader.tsx
import React from "react";
import { CheckCircle2 } from "lucide-react";

interface SuccessHeaderProps {
  title: string;
  message: string;
}

export const SuccessHeader: React.FC<SuccessHeaderProps> = ({
  title,
  message,
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <CheckCircle2
        className="h-16 w-16 text-green-500 mb-4"
        strokeWidth={1.5}
      />
      <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-50">
        {title}
      </h1>
      <p className="mt-2 text-md text-neutral-600 dark:text-neutral-400 max-w-md">
        {message}
      </p>
    </div>
  );
};
