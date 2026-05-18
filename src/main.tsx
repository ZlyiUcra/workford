import { useState, useEffect, useRef } from "react";

import {
  ModalWindow,
  AllGallery,
  Banners,
  InstagramStories,
  Review,
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

const reviews = [
  <Review
    key={1}
    name="Vladislav M."
    link="https://t.me"
    text="A review left by a client in a Telegram channel, which can be opened by clicking the button in the top right corner of this block."
  />,
  <Review
    key={2}
    name="Maxim L."
    link="https://t.me"
    text="A review left by Maxim"
  />,
  <Review
    key={3}
    name="Vyacheslav K."
    link="https://t.me"
    text="Subscribe to the Telegram channel t.me"
  />,
];

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

  const containerReviewRef = useRef<HTMLDivElement>(null);
  const reviewWidthRef = useRef(0);
  const visibleReviews = 3;
  const handleScroll = () => {
    const box = containerReviewRef.current;
    if (!box) return;
    const loopWidth = reviewWidthRef.current * visibleReviews;

    if (box.scrollLeft <= 0) {
      box.style.scrollBehavior = "auto";
      box.scrollLeft += loopWidth;
      box.style.scrollBehavior = "smooth";
    }

    if (box.scrollLeft >= loopWidth * 2) {
      box.style.scrollBehavior = "auto";
      box.scrollLeft -= loopWidth;
      box.style.scrollBehavior = "smooth";
    }
  };

  const btnPrevReview = () => {
    const box = containerReviewRef.current;
    if (!box) return;
    box.scrollLeft -= reviewWidthRef.current;
  };

  const btnNextReview = () => {
    const box = containerReviewRef.current;
    if (!box) return;
    box.scrollLeft += reviewWidthRef.current;
  };

  useEffect(() => {
    const box = containerReviewRef.current;
    if (!box) return;
    const firstReview = box.querySelector(".review-card");
    if (!firstReview) return;
    reviewWidthRef.current = firstReview.clientWidth;
    const width = reviewWidthRef.current * visibleReviews;

    box.scrollLeft = (box.scrollWidth - width) / 2;
    box.addEventListener("scroll", handleScroll);

    return () => {
      box.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "16px" }}>
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
            <div className="tag">
              <span className="tag-icon" />
              Instagram design
            </div>
            <div className="tag">
              <span className="tag-icon" />
              Facebook design
            </div>
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

      <div className="review-block">
        <h1>REVIEWS</h1>
        <p className="description">
          Client reviews, written from their own
          <span className="selecting"> personal accounts </span>
          on Telegram. Everything is transparent! <br /> Any review can be
          <span className="selecting"> opened </span> in Telegram, and you can
          <span className="selecting"> ask </span> about the experience of
          working with me <br />
          from the review's author directly.
        </p>

        <div className="review-carousel">
          <div className="review-container" ref={containerReviewRef}>
            {reviews.slice(-visibleReviews)}
            {reviews}
            {reviews.slice(0, visibleReviews)}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="next-button" style={{ transform: "rotate(180deg)" }}>
            <p className="array-next-icon" onClick={btnPrevReview} />
          </div>
          <div className="next-button">
            <p className="array-next-icon" onClick={btnNextReview} />
          </div>
        </div>
      </div>

      <div className="guarantees-block">
        <h1 style={{ fontSize: "52px", paddingBottom: "20px" }}>GUARANTEES</h1>

        <ol className="guarantees-points">
          <li className="point">
            I accept payment through the
            <span style={{ color: "#4824ff" }}> Name* </span>
            payment system, which ensures <br />
            the security of money transfers.
          </li>
          <li className="point">
            You can verify my responsibility and professionalism by
            <span style={{ color: "#4824ff" }}> messaging the clients </span>
            <br /> who left reviews
            <span style={{ color: "#4824ff" }}> directly </span>
            at any time (client reviews are above).
          </li>
          <li className="point">
            All
            <span style={{ color: "#4824ff" }}> copyright </span>
            for the work passes to the client after the order is completed.
          </li>
          <li className="point">
            In my work I use materials strictly
            <span style={{ color: "#4824ff" }}>
              {" "}
              licensed for personal <br /> and commercial use
            </span>
            .
          </li>
        </ol>
      </div>
      <div className="footer"> Workford </div>
    </div>
  );
}

export default Main;
