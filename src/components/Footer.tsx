import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-accent">
              MODESTO CAMINHÕES
            </div>
            <p className="text-sm sm:text-base text-background/80 mb-4 sm:mb-6 leading-relaxed">
              Há mais de 20 anos no mercado de caminhões seminovos, oferecendo qualidade, 
              confiança e as melhores condições para nossos clientes.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Button size="icon" variant="outline" className="border-background/20 hover:bg-accent h-8 w-8 sm:h-10 sm:w-10">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button size="icon" variant="outline" className="border-background/20 hover:bg-accent h-8 w-8 sm:h-10 sm:w-10">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button size="icon" variant="outline" className="border-background/20 hover:bg-accent h-8 w-8 sm:h-10 sm:w-10">
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Contato</h3>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-background/80">
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-accent flex-shrink-0" />
                <div>
                  <p>Rua das Indústrias, 123</p>
                  <p>Centro, Iperó/SP</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                <p className="break-all sm:break-normal">(15) 99824-2856</p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-accent flex-shrink-0" />
                <p className="break-all">modestocaminhoes@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Horário de Funcionamento</h3>
            <div className="space-y-2 text-sm sm:text-base text-background/80">
              <div className="flex items-start gap-2 sm:gap-3">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-accent flex-shrink-0" />
                <div>
                  <p>Segunda a Sexta:</p>
                  <p className="font-medium">8h às 18h</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-accent flex-shrink-0" />
                <div>
                  <p>Sábados:</p>
                  <p className="font-medium">8h às 12h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-xs sm:text-sm text-center md:text-left">
            © 2024 Modesto Caminhões. Todos os direitos reservados.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-background/60">
            <a href="#" className="hover:text-accent transition-colors text-center">Política de Privacidade</a>
            <a href="#" className="hover:text-accent transition-colors text-center">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;