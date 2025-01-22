import React, { useState, ReactNode, isValidElement, cloneElement, ReactElement } from "react";

type DialogProps = {
  children: ReactNode;
};

export const Dialog: React.FC<DialogProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (
          isValidElement(child) &&
          (child.type === DialogTrigger ||
            (child as ReactElement<DialogTriggerProps>).props.asChild)
        ) {
          return cloneElement(child, {
            onClick: handleOpen,
          } as any);
        }
        if (isValidElement(child) && child.type === DialogContent) {
          return cloneElement(child, {
            isOpen,
            onClose: handleClose,
          } as any);
        }
        return child;
      })}
    </>
  );
};

type DialogTriggerProps = {
  children: ReactNode;
  onClick?: () => void;
  asChild?: boolean;

};

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, onClick }) => (
  <span onClick={onClick}>{children}</span>
);

type DialogContentProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string; 
};

export const DialogContent: React.FC<DialogContentProps> = ({ children, isOpen, onClose, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Fechar modal"
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        {children}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ×
        </button>
      </div>
    </div>
  );
};

type DialogHeaderProps = {
  children: ReactNode;
};

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

type DialogTitleProps = {
  children: ReactNode;
  className?: string;
};

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-800">{children}</h2>
);
