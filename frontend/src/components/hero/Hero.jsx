import SampleImage from "../../assets/images/sample.jpeg";
import Hero1 from "../../assets/images/hero-1.png";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-16 py-12 min-[vh-80] bg-white">
      {/* Text Section */}
      <div className="flex-1 space-y-8 max-w-xl">
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] bg-gradient-to-r from-teal-500 to-orange-400 text-transparent bg-clip-text pb-[12px]">
          Most Renowned Dental Practitioners in Hyderabad
        </h3>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Badge Image */}
          <img
            src={Hero1}
            alt="27 Years of Excellence"
            className="w-32 h-36 object-contain rounded-lg"
          />

          {/* Bullet Points */}
          <ul className="space-y-3 text-gray-700 text-lg font-medium">
            <li className="flex items-start gap-2">
              <span className="text-teal-700 font-bold">✔</span> 27+ Years of
              Dental Excellence
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-700 font-bold">✔</span> Millions of
              Smiles Corrected
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-700 font-bold">✔</span> Advanced
              Implant Treatments
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-700 font-bold">✔</span> Precision and
              Compassionate Care
            </li>
          </ul>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 flex gap-4 justify-end max-w-2xl h-[80%]">
        {/* Left Big Image */}
        <div className="w-2/3">
          <img
            src={SampleImage}
            alt="Main Image"
            className="w-full h-[400px] md:h-[500px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Right Stacked Small Images */}
        <div className="w-1/3 flex flex-col gap-4">
          <img
            src={SampleImage}
            alt="Chair Image"
            className="w-full h-[190px] md:h-[240px] object-cover rounded-xl shadow-md"
          />
          <img
            src={SampleImage}
            alt="Award Image"
            className="w-full h-[190px] md:h-[240px] object-cover rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
