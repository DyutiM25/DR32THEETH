import ServicesCard from "./ServicesCard";
import ServicesData from "./ServicesData";
import ImageSlider from "../common/ImageSlider";

const Services = () => {
  const gradientColors = [
    "#e0f7f4", // pastel teal
    "#f3e8ff", // blushed lilac
    "#cdeafe", // baby blue
    "#ffe4b8", // apricot beige
    "#c5f2f7", // aqua pastel
    "#ffd1a6", // pale tangerine
    "#d6e0ff", // soft lavender
    "#ffc2a1", // warm peach
    "#fff3da", // creamy yellow
  ];

  return (
    <section
      id="services"
      className="px-6 md:px-12 py-12 text-center bg-gray-50 min-h-[90vh] flex flex-col justify-center"
    >
      <h3 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-teal-400 to-orange-400 text-transparent bg-clip-text mb-4">
        Our Services
      </h3>
      <h4 className="text-lg text-gray-600 mb-12">
        Led by Expertise, Driven by Care.
      </h4>

      <div>
        <ImageSlider
          data={ServicesData}
          slidesToShow={3}
          slidesToScroll={1}
          dots={true}
          gradientColors={gradientColors}
          autoplay={false}
          renderItem={(item, idx) => {
            const bgColor = gradientColors[idx % gradientColors.length];
            return (
              <ServicesCard
                key={idx}
                title={item.title}
                description={item.description}
                image={item.img}
                bgColor={bgColor}
              />
            );
          }}
        />
      </div>
    </section>
  );
};

export default Services;
