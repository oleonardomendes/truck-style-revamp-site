import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, Phone, Car, Calendar, Gauge, Wrench, Package, 
  Palette, Settings, Wind, Bed, Computer, Navigation
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Tipo para veículos sem dados sensíveis
interface SafeVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  model_year?: number;
  price: number;
  km: number;
  type: string;
  category: string;
  image?: string;
  images?: string[];
  featured?: boolean;
  created_at: string;
  updated_at: string;
  traction?: string;
  body_type?: string;
  color?: string;
  power_steering?: boolean;
  high_roof?: boolean;
  air_conditioning?: boolean;
  climate_control?: boolean;
  sleeper_cabin?: boolean;
  onboard_computer?: boolean;
  automatic_transmission?: boolean;
  vehicle_details?: string;
  multiple_units?: boolean;
  fleet_renewal?: boolean;
  km_range_500_600?: boolean;
}

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<SafeVehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchVehicleDetails();
    }
  }, [id]);

  const fetchVehicleDetails = async () => {
    try {
      // Buscar da tabela principal mas EXCLUIR campos sensíveis como owner_phone
      const { data, error } = await supabase
        .from('vehicles')
        .select(`
          id, brand, model, year, model_year, price, km, type, category, 
          image, images, featured, created_at, updated_at, traction, body_type,
          color, power_steering, high_roof, air_conditioning, climate_control,
          sleeper_cabin, onboard_computer, automatic_transmission, vehicle_details,
          multiple_units, fleet_renewal, km_range_500_600
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setVehicle(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os detalhes do veículo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatKm = (km: number) => {
    return new Intl.NumberFormat('pt-BR').format(km) + ' km';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Veículo não encontrado</h2>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Cabeçalho com botão voltar */}
        <div className="mb-8">
          <Button variant="outline" className="mb-4" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-gradient">
            {vehicle.brand} {vehicle.model}
          </h1>
          <p className="text-muted-foreground">{vehicle.year}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagens do Veículo - Carousel */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                {vehicle.images && vehicle.images.length > 0 ? (
                  <Carousel className="w-full">
                    <CarouselContent>
                      {vehicle.images.map((imageUrl, index) => (
                        <CarouselItem key={index}>
                          <div className="relative">
                            <img
                              src={imageUrl}
                              alt={`${vehicle.brand} ${vehicle.model} - Imagem ${index + 1}`}
                              className="w-full object-contain"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {vehicle.images.length > 1 && (
                      <>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                      </>
                    )}
                  </Carousel>
                ) : (
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full object-contain"
                  />
                )}
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    {vehicle.category}
                  </Badge>
                </div>
                {vehicle.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-accent text-accent-foreground">
                      Destaque
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Informações Principais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gradient">
                {formatPrice(vehicle.price)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo</p>
                    <p className="font-semibold">{vehicle.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Ano</p>
                    <p className="font-semibold">{vehicle.year}</p>
                  </div>
                </div>

                {vehicle.model_year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ano do Modelo</p>
                      <p className="font-semibold">{vehicle.model_year}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Quilometragem</p>
                    <p className="font-semibold">{formatKm(vehicle.km)}</p>
                  </div>
                </div>

                {vehicle.color && (
                  <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Cor</p>
                      <p className="font-semibold">{vehicle.color}</p>
                    </div>
                  </div>
                )}

                {vehicle.traction && (
                  <div className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tração</p>
                      <p className="font-semibold">{vehicle.traction}</p>
                    </div>
                  </div>
                )}

                {vehicle.body_type && (
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Carroceria</p>
                      <p className="font-semibold">{vehicle.body_type}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Opcionais */}
              {(vehicle.power_steering || vehicle.high_roof || vehicle.air_conditioning || 
                vehicle.climate_control || vehicle.sleeper_cabin || vehicle.onboard_computer || 
                vehicle.automatic_transmission) && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Opcionais
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {vehicle.power_steering && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Direção Hidráulica</span>
                        </div>
                      )}
                      {vehicle.high_roof && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Teto Alto</span>
                        </div>
                      )}
                      {vehicle.air_conditioning && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Ar Condicionado</span>
                        </div>
                      )}
                      {vehicle.climate_control && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Climatizador</span>
                        </div>
                      )}
                      {vehicle.sleeper_cabin && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Cabine Leito</span>
                        </div>
                      )}
                      {vehicle.onboard_computer && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Computador de Bordo</span>
                        </div>
                      )}
                      {vehicle.automatic_transmission && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Câmbio Automático</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Detalhes do Veículo */}
              {vehicle.vehicle_details && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Detalhes do Veículo</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {vehicle.vehicle_details}
                    </p>
                  </div>
                </>
              )}

              {/* Informações Adicionais */}
              {(vehicle.multiple_units || vehicle.fleet_renewal || vehicle.km_range_500_600) && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Informações Adicionais</h3>
                    <div className="space-y-2">
                      {vehicle.multiple_units && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-accent"></div>
                          <span>Várias unidades disponíveis</span>
                        </div>
                      )}
                      {vehicle.fleet_renewal && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-accent"></div>
                          <span>Renovação de frota</span>
                        </div>
                      )}
                      {vehicle.km_range_500_600 && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-accent"></div>
                          <span>Quilometragem entre 500 a 600 mil km</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Botão de Contato */}
              <div className="pt-6 border-t">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    window.open(`https://wa.me/5515998242856?text=Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`, '_blank');
                  }}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Entrar em Contato
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Clique para falar com o vendedor
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
