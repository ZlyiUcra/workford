import { useState, useRef, useEffect } from "react";
import "./Carousel.css";
import { useResize } from "../../hooks";

const images = Object.values(
  import.meta.glob<string>("/src/assets/all/*.{png,jpg,jpeg,svg}", {
    eager: true,
    import: "default",
  }),
);

const Carousel = ({ direction }: { direction: "left" | "right" }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const requestIdRef = useRef<number | null>(null);
  const startPositionref = useRef(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isPortrait = useResize();

  const closeModal = () => {
    setSelectedImage(null);
  };
  useEffect(() => {
    const carousel = carouselRef.current;
    const animate = () => {
      if (!carousel) return;
      if (!isHovered) {
        startPositionref.current += direction === "left" ? -0.3 : 0.3;
        if (startPositionref.current >= carousel.scrollWidth / 2) {
          startPositionref.current = 0;
        } else if (startPositionref.current <= 0) {
          startPositionref.current = carousel.scrollWidth / 2;
        }
        carousel.scrollLeft = startPositionref.current;
      }
      if (requestIdRef.current !== null) {
        cancelAnimationFrame(requestIdRef.current);
      }
      requestIdRef.current = requestAnimationFrame(animate);
    };
    if (requestIdRef.current !== null) {
      cancelAnimationFrame(requestIdRef.current);
    }
    requestIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestIdRef.current !== null) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [isHovered, direction]);

  return (
    <>
      <div
        className="carousel-container"
        ref={carouselRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="carousel-content">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={"carousel-image" + (isPortrait ? " mobile" : "")}
              onClick={() => setSelectedImage(image)}
            />
          ))}
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={"carousel-image" + (isPortrait ? " mobile" : "")}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="modal-window-image" onClick={closeModal}>
          <div style={{ display: "flex" }} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="" className="modal-image" />
            <p>
              <button
                onClick={closeModal}
                className="modal-image-close-button"
              ></button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
