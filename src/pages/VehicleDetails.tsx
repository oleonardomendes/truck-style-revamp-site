import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, Car, Calendar, Gauge, Wrench, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PublicVehicle = Omit<Tables<'vehicles'>, 'owner_phone'>;

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<PublicVehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchVehicleDetails();
    }
  }, [id]);

  const fetchVehicleDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select(`
          id, brand, model, year, model_year, price, km, type, category, 
          image, featured, created_at, updated_at, traction, body_type
        `)
        .eq('id', id)
        .single();

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
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao início
              </Button>
            </Link>
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
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos Veículos
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gradient">
            {vehicle.brand} {vehicle.model}
          </h1>
          <p className="text-muted-foreground">{vehicle.year}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagem do Veículo */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video relative">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    {vehicle.category}
                  </Badge>
                </div>
                {vehicle.featured && (
                  <div className="absolute top-4 right-4">
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

              {/* Botão de Contato */}
              <div className="pt-6 border-t">
                <Button size="lg" className="w-full">
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