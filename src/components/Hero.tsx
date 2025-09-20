import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
const modestoLogo = "/lovable-uploads/modesto-logo-new.jpeg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Sua Próxima Oportunidade",
      subtitle: "Caminhões seminovos de qualidade",
      description: "Encontre o veículo ideal para seu negócio com as melhores condições do mercado"
    },
    {
      title: "Tradição e Confiança",
      subtitle: "Mais de 20 anos no mercado",
      description: "Especialistas em caminhões seminovos com garantia e procedência"
    },
    {
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
    <section className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background with logo and overlay */}
      <div className="absolute inset-0">
        <img 
          src={modestoLogo} 
          alt="Modesto Caminhões Logo" 
          className="w-full h-full object-contain object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/60 to-primary/45"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 h-full flex items-center">
        <div className="max-w-xs sm:max-w-lg md:max-w-2xl text-white animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 text-orange-300">
            {slides[currentSlide].subtitle}
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-white/90 leading-relaxed">
            {slides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button 
              size="lg" 
              className="btn-hero text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto"
              onClick={() => {
                window.location.href = '/veiculos';
              }}
            >
              Ver Estoque
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2 sm:py-3 border-white/80 text-white bg-white/10 hover:bg-white hover:text-primary backdrop-blur-sm w-full sm:w-auto"
              onClick={() => {
                window.open('https://wa.me/5515998242856?text=Olá! Tenho interesse em conhecer os caminhões disponíveis.', '_blank');
              }}
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
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </Button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
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