import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin, MessageCircle } from "lucide-react";
import modestoLogo from "@/assets/modesto-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground py-1 sm:py-2 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-1 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="flex items-center gap-1 sm:gap-2">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-center sm:text-left">
                <span className="hidden sm:inline">Rua das Indústrias, 123 - Centro, Iperó/SP</span>
                <span className="sm:hidden">Iperó/SP</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-1 sm:gap-2">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>(15) 99824-2856</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src={modestoLogo} 
              alt="Modesto Caminhões" 
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gradient">
              <span className="hidden sm:inline">MODESTO CAMINHÕES</span>
              <span className="sm:hidden">MODESTO</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              HOME
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              EMPRESA
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              SEMINOVOS
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              AVALIAÇÃO
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              CONTATO
            </a>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8 sm:h-10 sm:w-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium py-1 sm:py-2">
                HOME
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium py-1 sm:py-2">
                EMPRESA
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium py-1 sm:py-2">
                SEMINOVOS
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium py-1 sm:py-2">
                AVALIAÇÃO
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium py-1 sm:py-2">
                CONTATO
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;