import { useState } from "react";
import "./Banners.css";
import { useResize } from "../../hooks";

const images = Object.values(
  import.meta.glob<string>("/src/assets/banners/*.{png,jpg,jpeg,svg}", {
    eager: true,
    import: "default",
  }),
);

const Banners = () => {
  const isPortrait = useResize();
  const [visibleRows, setVisibleRows] = useState(2);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imagesPerRow = 4;

  const closeModal = () => {
    setSelectedImage(null);
  };

  const showMoreImages = () => {
    setVisibleRows(visibleRows + 2);
  };

  const renderImages = () => {
    const visibleImages = images.slice(0, visibleRows * imagesPerRow);
    return visibleImages.map((image, index) => (
      <img
        key={index}
        src={image}
        className={isPortrait ? "gallery-image" : "gallery-image mobile"}
        onClick={() => setSelectedImage(image)}
      />
    ));
  };

  return (
    <div>
      {isPortrait ? (
        <div className="image-gallery" style={{ padding: "0 0 15px 0" }}>
          <div
            className="image-grid"
            style={{ "--visible-rows": visibleRows } as React.CSSProperties}
          >
            {renderImages()}
          </div>
          {visibleRows * imagesPerRow < images.length && (
            <button className="show-more-button" onClick={showMoreImages}>
              Show more
              <span className="more-icon"></span>
            </button>
          )}
          {selectedImage && (
            <div className="modal-window-image" onClick={closeModal}>
              <div
                style={{ display: "flex" }}
                onClick={(e) => e.stopPropagation()}
              >
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
        </div>
      ) : (
        <div>
          <div
            className="filter-scrollbar"
            style={{ padding: "2vw", margin: 0 } as React.CSSProperties}
          >
            {renderImages()}
          </div>
          {selectedImage && (
            <div className="modal-window-image" onClick={closeModal}>
              <div
                style={{ display: "flex" }}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={selectedImage} alt="" className="modal-image" />
                <p>
                  <button
                    onClick={closeModal}
                    className="modal-image-close-button mobile"
                  ></button>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Banners;
