import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import "./ModalMenu.css";

interface ModalMenuProps {
  show: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const ModalMenu = ({ show, onClose, children }: ModalMenuProps) => {
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
      className={`modal-menu-backdrop ${show ? "show" : ""}`}
      style={{ display: isVisible ? "flex" : "none" }}
      onClick={onClose}
    >
      <div className="modal-menu-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalMenu;
