import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, Truck, Wrench } from "lucide-react";
import truckVolvo from "@/assets/truck-volvo.jpg";
import truckScania from "@/assets/truck-scania.jpg";
import truckMercedes from "@/assets/truck-mercedes.jpg";

const FeaturedVehicles = () => {
  const vehicles = [
    {
      id: 1,
      brand: "VOLVO",
      model: "FH 540",
      year: "2015/2016",
      type: "Cavalo 6x4",
      km: "800.000",
      category: "Cavalo Mecânico",
      price: "R$ 415.000,00",
      image: truckVolvo,
      featured: true
    },
    {
      id: 2,
      brand: "SCANIA",
      model: "G420",
      year: "2010/2011",
      type: "Cavalo 6x2",
      km: "1.300.000",
      category: "Cavalo Mecânico",
      price: "R$ 235.000,00",
      image: truckScania,
      featured: false
    },
    {
      id: 3,
      brand: "SCANIA",
      model: "R400",
      year: "2014/2014",
      type: "Cavalo 6x2",
      km: "572.000",
      category: "Cavalo Mecânico",
      price: "R$ 300.000,00",
      image: truckScania,
      featured: false
    },
    {
      id: 4,
      brand: "MERCEDES",
      model: "Actros 2644",
      year: "2016/2017",
      type: "Cavalo 6x4",
      km: "650.000",
      category: "Cavalo Mecânico",
      price: "R$ 380.000,00",
      image: truckMercedes,
      featured: true
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gradient mb-4">
            Veículos em Destaque
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Confira nossa seleção especial de caminhões seminovos com as melhores condições e garantia de qualidade
          </p>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <Card 
              key={vehicle.id} 
              className="group card-hover bg-gradient-card border-0 shadow-card overflow-hidden"
            >
              <div className="relative overflow-hidden">
                {vehicle.featured && (
                  <Badge className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground">
                    Destaque
                  </Badge>
                )}
                <img 
                  src={vehicle.image} 
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <Badge variant="outline" className="text-xs mb-2">
                    {vehicle.brand}
                  </Badge>
                  <h3 className="font-bold text-lg mb-1">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {vehicle.year}
                  </p>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Wrench className="h-4 w-4" />
                    <span>{vehicle.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>{vehicle.km} km</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{vehicle.category}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-2xl font-bold text-primary">
                    {vehicle.price}
                  </p>
                </div>

                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  variant="outline"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Mais detalhes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="btn-hero text-lg px-8 py-3"
          >
            Ver Todos os Veículos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;