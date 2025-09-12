import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin, MessageCircle } from "lucide-react";
const modestoLogo = "/lovable-uploads/21f890e2-f157-4fc9-9288-de21d73ddf32.png";

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
          <div className="flex items-center">
            <img 
              src={modestoLogo} 
              alt="Modesto Caminhões" 
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto max-w-[480px] sm:max-w-[600px] md:max-w-[720px] lg:max-w-[840px] xl:max-w-[960px]"
            />
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