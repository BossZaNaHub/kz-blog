"use client";
import { FC, HTMLProps, ReactNode, useEffect, useState } from "react";

type ModalProps = HTMLProps<HTMLDivElement> & {
  isOpen: boolean;
  onClose: () => void;
  headerTitle?: string;
  headerDisabledCloseButton?: boolean;
  footerContent?: ReactNode;
  controlKeyboard?: boolean;
};

interface ModalBodyProps {
  children?: ReactNode;
}

interface ModalFooterProps {
  children?: ReactNode;
}

const ModalBody: FC<ModalBodyProps> = ({ children }) => {
  return <div className="space-y-6 p-6">{children}</div>;
};

const ModalFooter: FC<ModalFooterProps> = ({ children }) => {
  return (
    <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
      {children}
    </div>
  );
};

const Modal: FC<ModalProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(props.isOpen);

    if (props.controlKeyboard) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          close();
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  });

  const close = () => {
    setIsOpen(false);
    props.onClose();
  };

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 ${
        props.isOpen ? "bg-block bg-black/[.5]" : "hidden bg-transparent"
      }`}
    >
      <div
        className={`relative mx-auto max-h-full w-full max-w-2xl transition-all ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        {/* Modal Content */}
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          {/* Modal Header */}
          <div className="item-start flex justify-between rounded-t border-b p-4 dark:border-gray-600">
            <h3>{props.headerTitle}</h3>
            {props.headerDisabledCloseButton ? (
              <></>
            ) : (
              <button
                type="button"
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
                onClick={() => close()}
              >
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
                <span className="sr-only">Close modal</span>
              </button>
            )}
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export { Modal, ModalBody, ModalFooter };
