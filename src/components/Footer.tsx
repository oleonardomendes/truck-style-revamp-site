import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-bold mb-4 text-accent">
              MODESTO CAMINHÕES
            </div>
            <p className="text-background/80 mb-6">
              Há mais de 20 anos no mercado de caminhões seminovos, oferecendo qualidade, 
              confiança e as melhores condições para nossos clientes.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="outline" className="border-background/20 hover:bg-accent">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="border-background/20 hover:bg-accent">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="border-background/20 hover:bg-accent">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-3 text-background/80">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 text-accent" />
                <div>
                  <p>Rod. Anhanguera - KM 143, S/N</p>
                  <p>Loiolas, Limeira/SP</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <p>(19) 99610-5675</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <p>contato@ls7caminhoes.com.br</p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Horário de Funcionamento</h3>
            <div className="space-y-2 text-background/80">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-accent" />
                <div>
                  <p>Segunda a Sexta:</p>
                  <p className="font-medium">8h às 18h</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-accent" />
                <div>
                  <p>Sábados:</p>
                  <p className="font-medium">8h às 12h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2024 Modesto Caminhões. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 text-sm text-background/60 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-accent transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;