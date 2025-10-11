import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import Services from "../components/services/Services";
import Center from "../components/center/Center";
import Team from "../components/team/Team";
import Appointment from "../components/appointment/Appointment";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

export default function HomePage() {
  return (
    <>
      <ScrollToTop /> {/* ensures you start at top when navigating */}
      <Navbar />
      <Hero />
      <Services />
      <Center />
      <Team />
      <Appointment />
      <Footer />
    </>
  );
}
