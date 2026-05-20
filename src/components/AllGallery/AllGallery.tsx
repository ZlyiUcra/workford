import Carousel from "../Carousel";
import { useResize } from "../../hooks/";

const AllGallery = () => {
  const isPortrait = useResize();

  return (
    <div style={{ pointerEvents: isPortrait ? undefined : "none" }}>
      <Carousel direction="left" />
      <Carousel direction="right" />
    </div>
  );
};

export default AllGallery;
