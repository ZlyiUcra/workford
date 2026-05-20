import { useResize } from "../../hooks";
type ReviewProps = {
  name: string;
  link: string;
  text: string;
};

const Review = (props: ReviewProps) => {
  const isPortrait = useResize();

  return (
    <div className={"review-card" + (isPortrait ? "" : " mobile")}>
      <div className={"review-content"}>
        <div style={{ padding: "10px 20px 0 25px" }}>
          <div
            style={{
              display: "flex",
              placeItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ fontSize: isPortrait ? "" : "7vw", color: "black" }}>
              {props.name}
            </h2>
            <a className="link" href={props.link} target="_blank">
              <p className="telegram-icon" />
              <p className="array-corner-icon" />
            </a>
          </div>
          <p className={"review" + (isPortrait ? "" : " mobile")}>
            {props.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
