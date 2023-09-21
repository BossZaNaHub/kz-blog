"use client";

import { useState, ReactNode } from "react";

export default function Loading({ children, loading = false }: { children: ReactNode; loading?: boolean }) {
  const [isLoading, setIsLoading] = useState<string>("Loading...");

  if (!loading) {
    return <>{children}</>;
  } else {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {isLoading.split("").map((v: string, i: number) => {
          if (i % 2 == 0) {
            return (
              <h1 key={i} className="animate-slide-up text-7xl dark:text-white">
                {v}
              </h1>
            );
          } else {
            return (
              <h1 key={i} className="animate-slide-down text-7xl dark:text-white">
                {v}
              </h1>
            );
          }
        })}
      </div>
    );
  }
}
