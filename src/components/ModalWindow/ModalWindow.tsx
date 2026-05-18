import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import "./ModalWindow.css";

interface ModalWindowProps {
  show: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const ModalWindow = ({ show, onClose, children }: ModalWindowProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => setIsVisible(show), show ? 0 : 800);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [show, handleKeyDown]);

  return (
    <div
      className={`modal-backdrop ${show ? "show" : ""}`}
      style={{ display: isVisible ? "flex" : "none" }}
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="modal-close-button"
          aria-label="Close modal"
        ></button>
        {children}
        <div
          style={{
            display: "flex",
          }}
        >
          <a target="_blank" href="" className="social-button">
            <div className="social telegram" />
            Telegram
          </a>

          <a target="_blank" href="" className="social-button">
            <div className="social instagram" />
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
