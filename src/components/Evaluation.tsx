import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, FileText, TrendingUp } from "lucide-react";

const Evaluation = () => {
  return (
    <section id="avaliacao" className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-3 sm:mb-4">
            Avalie Seu Caminhão
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Quer vender ou trocar seu caminhão? Fazemos uma avaliação justa e transparente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card className="text-center">
            <CardContent className="p-4 sm:p-6">
              <div className="bg-primary/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">1. Entre em Contato</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Fale conosco pelo WhatsApp ou telefone
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4 sm:p-6">
              <div className="bg-primary/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">2. Envie os Dados</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Informações do veículo e fotos
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4 sm:p-6">
              <div className="bg-primary/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">3. Receba a Avaliação</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Proposta justa e transparente
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="btn-hero text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto"
            onClick={() => window.open('https://wa.me/5515998242856', '_blank')}
          >
            <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Solicitar Avaliação
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Evaluation;
