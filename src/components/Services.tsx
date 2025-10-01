import { Card, CardContent } from "@/components/ui/card";
import { Award, CheckCircle, Wrench, Phone, TrendingUp, FileCheck } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Award,
      title: "Confiança e Tradição",
      description: "Mais de 20 anos no mercado, construindo relações duradouras com nossos clientes."
    },
    {
      icon: CheckCircle,
      title: "Qualidade Garantida",
      description: "Todos os caminhões passam por rigorosa inspeção técnica antes da venda."
    },
    {
      icon: FileCheck,
      title: "Procedência Certificada",
      description: "Veículos com documentação completa e histórico de manutenção verificado."
    },
    {
      icon: TrendingUp,
      title: "Melhor Custo-Benefício",
      description: "Preços justos e competitivos para você fazer o melhor negócio."
    },
    {
      icon: Wrench,
      title: "Pós-Venda Completo",
      description: "Suporte técnico especializado e peças originais para manter seu caminhão rodando."
    },
    {
      icon: Phone,
      title: "Atendimento Personalizado",
      description: "Nossa equipe está sempre disponível para tirar suas dúvidas e oferecer suporte."
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Por que escolher a Modesto Caminhões?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto px-4">
            Mais de 20 anos de experiência no mercado de caminhões seminovos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="bg-accent rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-accent-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-primary-foreground/80 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;