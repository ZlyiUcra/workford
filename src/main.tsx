import { useState } from "react";
import {
  ModalWindow,
  AllGallery,
  Banners,
  InstagramStories,
  YouTubeThumbnails,
  YouTubeDesign,
} from "./components";

const CATEGORY_COMPONENTS = {
  AllGallery,
  Banners,
  InstagramStories,
  YouTubeThumbnails,
  YouTubeDesign,
} as const;

type Category = keyof typeof CATEGORY_COMPONENTS;
const CATEGORY_LABELS: Record<Category, string> = {
  AllGallery: "All works",
  Banners: "Banners",
  YouTubeThumbnails: "YouTube thumbnails",
  YouTubeDesign: "YouTube design",
  InstagramStories: "Instagram stories",
};

function Main() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("AllGallery");

  const RenderComponent = CATEGORY_COMPONENTS[selectedCategory];

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <header>
        <div className="menu">
          <a>About us</a>
          <a>Services</a>
          <a>Portfolio</a>
          <a>Feedback</a>
          <a>Warranties</a>
        </div>
        <button onClick={handleOpenModal} className="btn">
          Contact us
        </button>
        <ModalWindow show={showModal} onClose={handleCloseModal}>
          <h2 style={{ color: "#4824ff", fontSize: "40px" }}>Contacts</h2>
          <p style={{ fontSize: "22px" }}>
            You can contact us via Telergam <br />
            or Instagram👇
          </p>
        </ModalWindow>
        <a target="_blank" href="" className="icon telegram" />
        <a target="_blank" href="" className="icon instagram" />

        <div className="switch">
          <div className="theme light"></div>
        </div>
      </header>

      <div className="welcome-block">
        <div className="first-block">
          <h1>
            Web designer <span className="title">Workford</span>
          </h1>
          <h2 style={{ marginBottom: "7%", marginTop: "7%" }}>
            I create <span style={{ color: "#4824ff" }}>marketable</span>
            <br />
            and <span style={{ color: "#4824ff" }}>unique </span>
            design <br /> tailored to your needs
          </h2>
          <h3>
            I've been doing web design
            <br />
            for <span style={{ color: "#4824ff" }}> 9 years</span>
          </h3>
        </div>
        <div className="main-image-box">
          <img
            className="first-image-layer"
            src="./images/1.png"
            draggable="false"
          />
          <img
            className="second-image-layer"
            src="./images/2.png"
            draggable="false"
          />
          <img
            className="third-image-layer"
            src="./images/3.png"
            draggable="false"
          />
          <img
            className="fourth-image-layer"
            src="./images/4.png"
            draggable="false"
          />
          <img
            className="fifth-image-layer"
            src="./images/5.png"
            draggable="false"
          />
        </div>
      </div>

      <div className="service-block" draggable={false}>
        <h1 style={{ fontSize: "52px" }}>SERVICES</h1>
        <p style={{ fontSize: "27px" }}>
          I create <span style={{ color: "#4824ff" }}> static design </span> in
          the following areas:
        </p>

        <div style={{ display: "flex" }}>
          <div className="tag">
            <span className="tag-icon" />
            Advertising banners
          </div>
          <div className="tag">
            <span className="tag-icon" />
            YouTube video thumbnails
          </div>
          <div className="tag">
            <span className="tag-icon" />
            YouTube channel design
          </div>
          <div className="tag">
            <span className="tag-icon" />
            Infographics
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "16px" }}>
          <div className="tag">
            <span className="tag-icon" />
            Instagram design
          </div>
          <div className="tag">
            <span className="tag-icon" />
            Facebook design
          </div>
        </div>
        <p style={{ fontSize: "27px" }}>
          Open to discussing design creation and other areas. <br />
          I'm ready to discuss the details in{" "}
          <span
            style={{ color: "#4824ff", cursor: "pointer" }}
            onClick={handleOpenModal}
          >
            a private chat
          </span>
          .
        </p>
      </div>
      <div className="portfolio-block">
        <div className="first-block">
          <h1 className="main-title">Portfolio</h1>
          <div style={{ position: "absolute", marginLeft: "-660px" }}>
            <p className="gradient-part-one"></p>
            <p className="title-border">Portf</p>
          </div>
          <div style={{ position: "absolute", marginLeft: "620px" }}>
            <p className="gradient-part-two"></p>
            <p className="title-border">Folio</p>
          </div>
          <img
            className="array-icon"
            src="src/assets/icons/array.svg"
            draggable={false}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((category) => (
            <p
              key={category}
              className={`tag ${selectedCategory === category ? "selected" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {CATEGORY_LABELS[category]}
            </p>
          ))}
        </div>

        <div
          className="content"
          style={{ marginLeft: "-5vw", marginRight: "-5vw" }}
        >
          <RenderComponent />
        </div>
      </div>
    </div>
  );
}

export default Main;
