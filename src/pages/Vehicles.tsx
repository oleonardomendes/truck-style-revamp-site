import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Fuel, Calendar, Gauge, Truck, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  km: number;
  type: string;
  image: string | null;
  featured: boolean | null;
  vehicle_details: string | null;
}

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      // Buscar da tabela principal mas EXCLUIR campos sensíveis como owner_phone
      const { data, error } = await supabase
        .from('vehicles')
        .select(`
          id, brand, model, year, model_year, price, km, type, category, 
          image, featured, created_at, updated_at, traction, body_type,
          color, power_steering, high_roof, air_conditioning, climate_control,
          sleeper_cabin, onboard_computer, automatic_transmission, vehicle_details,
          multiple_units, fleet_renewal, km_range_500_600
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('pt-BR').format(mileage);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando veículos...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          {/* Back Button */}
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              ← Voltar
            </Button>
          </div>

          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Todos os Veículos
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Confira nossa linha completa de caminhões seminovos com qualidade garantida
            </p>
          </div>

          {vehicles.length === 0 ? (
            <div className="text-center py-12">
              <Truck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Nenhum veículo disponível no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <div className="relative">
                    {vehicle.image ? (
                      <img 
                        src={vehicle.image} 
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 sm:h-56 bg-muted flex items-center justify-center">
                        <Truck className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    {vehicle.featured && (
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                        Destaque
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-3 sm:p-4">
                    <div className="mb-3">
                      <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      <p className="text-xl sm:text-2xl font-bold text-primary">
                        {formatPrice(vehicle.price)}
                      </p>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                        <span>{vehicle.year}</span>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <Gauge className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                        <span>{formatMileage(vehicle.km)} km</span>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <Fuel className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                        <span>{vehicle.type}</span>
                      </div>
                    </div>

                    {vehicle.vehicle_details && (
                      <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2">
                        {vehicle.vehicle_details}
                      </p>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        onClick={() => navigate(`/veiculo/${vehicle.id}`)}
                        className="flex-1 text-xs sm:text-sm"
                      >
                        Ver Detalhes
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1 text-xs sm:text-sm"
                        onClick={() => {
                          window.open(`https://wa.me/5515998242856?text=Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`, '_blank');
                        }}
                      >
                        <Phone className="h-3 w-3" />
                        WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Vehicles;