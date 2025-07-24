import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-trucks.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: heroImage,
      title: "Sua Próxima Oportunidade",
      subtitle: "Caminhões seminovos de qualidade",
      description: "Encontre o veículo ideal para seu negócio com as melhores condições do mercado"
    },
    {
      image: heroImage,
      title: "Tradição e Confiança",
      subtitle: "Mais de 20 anos no mercado",
      description: "Especialistas em caminhões seminovos com garantia e procedência"
    },
    {
      image: heroImage,
      title: "Financiamento Facilitado",
      subtitle: "Condições especiais",
      description: "Parcelamento em até 60x com as menores taxas do mercado"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img 
          src={slides[currentSlide].image} 
          alt="Caminhões Modesto" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <h2 className="text-xl md:text-2xl mb-6 text-orange-300">
            {slides[currentSlide].subtitle}
          </h2>
          <p className="text-lg mb-8 text-white/90">
            {slides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="btn-hero text-lg px-8 py-3"
            >
              Ver Estoque
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary"
            >
              Fale Conosco
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;