import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Optional: customize arrows or make them props if needed
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
        borderRadius: "9999px",
        width: "40px",
        height: "40px",
        zIndex: 10,
        right: "-30px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
        borderRadius: "9999px",
        width: "40px",
        height: "40px",
        zIndex: 10,
        left: "-30px",
      }}
      onClick={onClick}
    />
  );
}

const ImageSlider = ({
  data,
  renderItem,
  slidesToShow = 3,
  slidesToScroll = 1,
  dots = true,
  gradientColors = [],
  autoplay = false,
  autoplaySpeed = 3000,
  arrows = true,
}) => {
  const settings = {
    dots,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    autoplay, // ✅ Now this won't throw an error
    autoplaySpeed,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows,
    ...(arrows && {
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    }),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {data.map((item, idx) => (
        <div key={idx} className="px-4">
          {renderItem(item, idx, gradientColors[idx % gradientColors.length])}
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
