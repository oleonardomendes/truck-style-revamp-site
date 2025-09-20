import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin, MessageCircle } from "lucide-react";
const modestoLogo = "/lovable-uploads/modesto-logo-new.jpeg";

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
            <a 
              href="https://wa.me/5515998242856" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 hover:text-primary-foreground/80 transition-colors"
            >
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Text */}
          <div className="flex flex-col items-start leading-none">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1a4b5c] tracking-wide uppercase" 
                  style={{ fontFamily: 'serif', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              MODESTO
            </span>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#1a4b5c] -mt-1 sm:-mt-2 italic font-semibold"
                  style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
              Caminhões
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              HOME
            </a>
            <a href="/#empresa" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              EMPRESA
            </a>
            <a href="/veiculos" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              SEMINOVOS
            </a>
            <a href="/#avaliacao" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              AVALIAÇÃO
            </a>
            <a href="/#contato" className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base">
              CONTATO
            </a>
            <a href="/admin" className="text-muted-foreground hover:text-primary transition-colors font-medium text-xs xl:text-sm">
              ADMIN
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
              <a href="/" className="text-foreground hover:text-primary transition-colors font-medium py-1 sm:py-2">
                HOME
              </a>
              <a href="/#empresa" className="text-foreground hover:text-primary transition-colors font-medium py-1 sm:py-2">
                EMPRESA
              </a>
              <a href="/veiculos" className="text-foreground hover:text-primary transition-colors font-medium py-1 sm:py-2">
                SEMINOVOS
              </a>
              <a href="/#avaliacao" className="text-foreground hover:text-primary transition-colors font-medium py-1 sm:py-2">
                AVALIAÇÃO
              </a>
              <a href="/#contato" className="text-foreground hover:text-primary transition-colors font-medium py-1 sm:py-2">
                CONTATO
              </a>
              <a href="/admin" className="text-muted-foreground hover:text-primary transition-colors font-medium py-1 sm:py-2 text-sm">
                ADMIN
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;