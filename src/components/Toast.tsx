"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { LuCheckCircle, LuInfo } from "react-icons/lu";

export type ToastStatus = "success" | "info" | "failed";

interface ToastProviderConfig {
  children: ReactNode;
}

interface Toast {
  content: string;
  options: ToastOption;
  isVisible: boolean;
}

interface ToastOption {
  duration: number;
  status?: ToastStatus;
  widthPercentage?: number;
  id?: string;
}

const ToastContext = createContext({
  showToast: (content: string, options: ToastOption) => {},
  closeToast: (id: string) => {},
});

export const ToastProvider = ({ children }: ToastProviderConfig) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      let startTime = Date.now();
      setToasts((prevToasts: Toast[]) => {
        prevToasts?.map((toast) => {
          // console.log(toast.options.widthPercentage);
          // toast.options.widthPercentage = (100 / toast.options.duration) * 100;
          // if (toast.options.duration > 0) {
          //   toast.options.duration -= 1000;
          // }
          // const currentTime = Date.now();
          // const elapsedTime = currentTime - startTime;
          // const endTime = startTime + duration;
          // if (currentTime < endTime) {
          // console.log("duration time...", duration);
          // }
        });
        return prevToasts;
      });
    });
    return () => clearInterval(interval);
  }, [toasts]);

  const showToast = (content: string, options?: ToastOption) => {
    const newToast: Toast = {
      content: content,
      options: {
        id: uuid(),
        duration: options?.duration || 3000,
        status: options?.status,
        widthPercentage: 100,
      },
      isVisible: true,
    };
    setToasts((prevToasts: Toast[]) => [...prevToasts, newToast]);
  };

  const closeToast = (id?: string) => {
    setToasts((prevToasts: Toast[]) =>
      prevToasts.filter((toast) => {
        if (toast.options.id !== id) {
          return toast;
        } else {
          toast.isVisible = false;
        }
      })
    );
  };

  const _renderStatusIcon = (toast: Toast) => {
    switch (toast.options.status) {
      case "success":
        return (
          <div
            className={`relative my-4 flex w-full max-w-xs items-center rounded-md bg-green-400 p-4 text-white shadow-md ${
              toast.isVisible ? "animate-fade-in" : "animate-fade-out"
            }`}
            key={toast.options.id}
          >
            <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <LuCheckCircle className="h-4 w-4" />
              <span className="sr-only">Success icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">{toast.content}</div>
            <button
              type="button"
              className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
              aria-label="Close"
              onClick={() => closeToast(toast.options.id)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <div
              className="absolute bottom-0 left-0 h-1 bg-green-300"
              style={{
                transitionProperty: "width",
                transitionDuration: `${toast.options.duration}ms`,
                transitionTimingFunction: "ease-in-out",
                width: `${toast.options.widthPercentage}%`,
              }}
            ></div>
          </div>
        );
      case "info":
        return (
          <div
            className={`relative my-4 flex w-full max-w-xs items-center rounded-md bg-blue-400 p-4 text-white shadow-md ${
              toast.isVisible ? "animate-fade-in" : "animate-fade-out"
            }`}
            key={toast.options.id}
          >
            <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
              <LuInfo className="h-4 w-4" />
              <span className="sr-only">Info icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">{toast.content}</div>
            <button
              type="button"
              className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
              aria-label="Close"
              onClick={() => closeToast(toast.options.id)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <div
              className="absolute bottom-0 left-0 h-1 bg-blue-300"
              style={{
                transitionProperty: "width",
                transitionDuration: `${toast.options.duration}ms`,
                transitionTimingFunction: "ease-in-out",
                width: `${toast.options.widthPercentage}%`,
              }}
            ></div>
          </div>
        );
      case "failed":
        return (
          <div
            className={`relative my-4 flex w-full max-w-xs items-center rounded-md bg-red-400 p-4 text-white shadow-md ${
              toast.isVisible ? "animate-fade-in" : "animate-fade-out"
            }`}
            key={toast.options.id}
          >
            <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <LuInfo className="h-4 w-4" />
              <span className="sr-only">Failed icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">{toast.content}</div>
            <button
              type="button"
              className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
              aria-label="Close"
              onClick={() => closeToast(toast.options.id)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <div
              className="absolute bottom-0 left-0 h-1 bg-red-300"
              style={{
                transitionProperty: "width",
                transitionDuration: `${toast.options.duration}ms`,
                transitionTimingFunction: "ease-in-out",
                width: `${toast.options.widthPercentage}%`,
              }}
            ></div>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      <div className="absolute right-4 top-5 z-50 w-72 max-w-sm">
        <div className="sticky">
          {toasts?.map((v, i) => {
            return <div key={i}>{_renderStatusIcon(v)}</div>;
          })}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
