import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import Services from "@/components/Services";
import Evaluation from "@/components/Evaluation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedVehicles />
      <Services />
      <Evaluation />
      <Footer />
    </div>
  );
};

export default Index;
