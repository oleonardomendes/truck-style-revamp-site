import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, Truck, Wrench } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import truckVolvo from "@/assets/truck-volvo.jpg";
import truckScania from "@/assets/truck-scania.jpg";
import truckMercedes from "@/assets/truck-mercedes.jpg";

// Public vehicle type that excludes sensitive data
type PublicVehicle = Omit<Tables<'vehicles'>, 'owner_phone'>;

const FeaturedVehicles = () => {
  const [vehicles, setVehicles] = useState<PublicVehicle[]>([]);
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
        .select('id, brand, model, year, model_year, price, km, type, category, image, featured, created_at, updated_at, traction, body_type')
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
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-3 sm:mb-4">
            Veículos em Destaque
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Confira nossa seleção especial de caminhões seminovos com as melhores condições e garantia de qualidade
          </p>
        </div>

        {/* Vehicles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-40 sm:h-48 bg-muted"></div>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-2 sm:space-y-3">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {vehicles.map((vehicle) => (
              <Link key={vehicle.id} to={`/veiculo/${vehicle.id}`}>
                <Card 
                  className="group card-hover bg-gradient-card border-0 shadow-card overflow-hidden cursor-pointer"
                >
                <div className="relative overflow-hidden">
                  {vehicle.featured && (
                    <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-accent text-accent-foreground text-xs">
                      Destaque
                    </Badge>
                  )}
                  <img 
                    src={vehicle.image || fallbackImages[vehicle.brand] || truckVolvo} 
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <CardContent className="p-4 sm:p-6">
                  <div className="mb-3">
                    <Badge variant="outline" className="text-xs mb-2">
                      {vehicle.brand}
                    </Badge>
                    <h3 className="font-bold text-base sm:text-lg mb-1">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                      {vehicle.year}
                    </p>
                  </div>

                  <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Wrench className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="truncate">{vehicle.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Truck className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{vehicle.km.toLocaleString()} km</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="truncate">{vehicle.category}</span>
                    </div>
                  </div>

                  <div className="mb-3 sm:mb-4">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                      R$ {vehicle.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <Button 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-xs sm:text-sm"
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Mais detalhes
                  </Button>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-muted-foreground text-base sm:text-lg">
              Nenhum veículo em destaque no momento.
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Button 
            size="lg" 
            className="btn-hero text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto"
          >
            Ver Todos os Veículos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;