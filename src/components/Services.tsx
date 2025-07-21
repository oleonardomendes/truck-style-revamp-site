import { Card, CardContent } from "@/components/ui/card";
import { Shield, CreditCard, Wrench, Phone } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: "Garantia de Qualidade",
      description: "Todos os nossos veículos passam por rigorosa inspeção técnica antes da venda."
    },
    {
      icon: CreditCard,
      title: "Financiamento Facilitado",
      description: "Parcele em até 60x com as menores taxas do mercado e aprovação rápida."
    },
    {
      icon: Wrench,
      title: "Pós-Venda Completo",
      description: "Suporte técnico especializado e peças originais para manter seu caminhão rodando."
    },
    {
      icon: Phone,
      title: "Atendimento 24h",
      description: "Nossa equipe está sempre disponível para tirar suas dúvidas e oferecer suporte."
    }
  ];

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Por que escolher a LS7?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Mais de 20 anos de experiência no mercado de caminhões seminovos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {service.title}
                </h3>
                <p className="text-primary-foreground/80">
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