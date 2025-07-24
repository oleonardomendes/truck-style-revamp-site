import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, Truck, Wrench } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import truckVolvo from "@/assets/truck-volvo.jpg";
import truckScania from "@/assets/truck-scania.jpg";
import truckMercedes from "@/assets/truck-mercedes.jpg";

type Vehicle = Tables<'vehicles'>;

const FeaturedVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback images map
  const fallbackImages: Record<string, string> = {
    'Volvo': truckVolvo,
    'Scania': truckScania,
    'Mercedes-Benz': truckMercedes,
    'Mercedes': truckMercedes,
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) {
        console.error('Error fetching vehicles:', error);
        return;
      }

      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

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
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-muted"></div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-8 bg-muted rounded w-1/2"></div>
                    <div className="h-10 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : vehicles.length > 0 ? (
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
                    src={vehicle.image || fallbackImages[vehicle.brand] || truckVolvo} 
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
                      <span>{vehicle.km.toLocaleString()} km</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{vehicle.category}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-2xl font-bold text-primary">
                      R$ {vehicle.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum veículo em destaque no momento.
            </p>
          </div>
        )}

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