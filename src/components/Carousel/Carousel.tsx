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
  const requestIdRef = useRef<number | null>(null);
  const startPositionRef = useRef(0);

  //const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isPortrait = useResize();

  const closeModal = () => {
    setSelectedImage(null);
  };
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const speed = direction === "left" ? -0.3 : 0.3;

    const animate = () => {
      if (!isHoveredRef.current) {
        startPositionRef.current += speed;

        if (startPositionRef.current >= carousel.scrollWidth / 2) {
          startPositionRef.current = 0;
        } else if (startPositionRef.current <= 0) {
          startPositionRef.current = carousel.scrollWidth / 2;
        }

        carousel.scrollLeft = startPositionRef.current;
      }

      requestIdRef.current = requestAnimationFrame(animate);
    };

    requestIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [direction]); // 👈 SOLO depende de direction

  return (
    <>
      <div
        className="carousel-container"
        ref={carouselRef}
        onMouseEnter={() => (isHoveredRef.current = true)}
        onMouseLeave={() => (isHoveredRef.current = false)}
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
