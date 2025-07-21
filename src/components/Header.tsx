import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin, MessageCircle } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Rod. Anhanguera - KM 143, S/N - Loiolas, Limeira/SP</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(19) 99610-5675</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gradient">
              MODESTO CAMINHÕES
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              HOME
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              EMPRESA
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              SEMINOVOS
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              AVALIAÇÃO
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              CONTATO
            </a>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                HOME
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                EMPRESA
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                SEMINOVOS
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
                AVALIAÇÃO
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
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