import { useResize } from "../../hooks";
const InstagramStories = () => {
  const isPortrait = useResize();

  return (
    <>
      {isPortrait ? (
        <div style={{ fontSize: "28px", textAlign: "center", margin: "220px" }}>
          No works in this category have been uploaded yet
        </div>
      ) : (
        <div
          style={{ fontSize: "20px", textAlign: "center", margin: "20vw 5vw" }}
        >
          No works in this category have been uploaded yet
        </div>
      )}
    </>
  );
};

export default InstagramStories;
