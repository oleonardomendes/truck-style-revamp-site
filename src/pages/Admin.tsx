import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Vehicle = Tables<'vehicles'>;
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Edit, Trash2, LogOut } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const AdminLogin = ({ onLogin, onSignUp }: { onLogin: (email: string, password: string) => void; onSignUp: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
      await onSignUp(email, password);
    } else {
      await onLogin(email, password);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gradient">
            MODESTO CAMINHÕES
          </CardTitle>
          <p className="text-muted-foreground">Área Administrativa</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignUp ? 'Cadastrar' : 'Entrar'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Já tem conta? Fazer login' : 'Criar nova conta'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const VehicleForm = ({ 
  vehicle, 
  onSubmit, 
  onClose 
}: { 
  vehicle?: Vehicle; 
  onSubmit: (data: any) => void; 
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    brand: vehicle?.brand || '',
    model: vehicle?.model || '',
    year: vehicle?.year || new Date().getFullYear(),
    model_year: vehicle?.model_year || new Date().getFullYear(),
    price: vehicle?.price || 0,
    km: vehicle?.km || 0,
    type: vehicle?.type || 'Caminhão',
    category: vehicle?.category || 'Seminovo',
    traction: vehicle?.traction || '',
    body_type: vehicle?.body_type || '',
    image: vehicle?.image || '',
    owner_phone: vehicle?.owner_phone || '',
    featured: vehicle?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="brand">Marca</Label>
          <Input
            id="brand"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="model">Modelo</Label>
          <Input
            id="model"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="year">Ano</Label>
          <Input
            id="year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="model_year">Ano do Modelo</Label>
          <Input
            id="model_year"
            type="number"
            value={formData.model_year}
            onChange={(e) => setFormData({ ...formData, model_year: parseInt(e.target.value) })}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Preço</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="traction">Tração</Label>
          <Input
            id="traction"
            value={formData.traction}
            onChange={(e) => setFormData({ ...formData, traction: e.target.value })}
            placeholder="ex: 4x2, 6x4"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="km">Quilometragem</Label>
          <Input
            id="km"
            type="number"
            value={formData.km}
            onChange={(e) => setFormData({ ...formData, km: parseInt(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="body_type">Tipo de Carroceria</Label>
          <Input
            id="body_type"
            value={formData.body_type}
            onChange={(e) => setFormData({ ...formData, body_type: e.target.value })}
            placeholder="ex: Baú, Graneleiro, Basculante"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="owner_phone">Telefone do Proprietário</Label>
          <Input
            id="owner_phone"
            value={formData.owner_phone}
            onChange={(e) => setFormData({ ...formData, owner_phone: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Tipo</Label>
          <Input
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="image">URL da Imagem</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="category">Categoria</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="ex: Seminovo, Novo"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
        />
        <Label htmlFor="featured">Veículo em Destaque</Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          {vehicle ? 'Atualizar' : 'Adicionar'} Veículo
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | undefined>();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      toast({
        title: "Erro ao carregar veículos",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async (formData: any) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Veículo adicionado com sucesso!",
      });
      
      setIsDialogOpen(false);
      fetchVehicles();
    } catch (error) {
      toast({
        title: "Erro ao adicionar veículo",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    }
  };

  const handleUpdateVehicle = async (formData: any) => {
    if (!editingVehicle) return;

    try {
      const { error } = await supabase
        .from('vehicles')
        .update(formData)
        .eq('id', editingVehicle.id);

      if (error) throw error;

      toast({
        title: "Veículo atualizado com sucesso!",
      });
      
      setIsDialogOpen(false);
      setEditingVehicle(undefined);
      fetchVehicles();
    } catch (error) {
      toast({
        title: "Erro ao atualizar veículo",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este veículo?')) return;

    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Veículo excluído com sucesso!",
      });
      
      fetchVehicles();
    } catch (error) {
      toast({
        title: "Erro ao excluir veículo",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient">
            MODESTO CAMINHÕES - Administração
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Gerenciar Veículos</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingVehicle(undefined)}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Veículo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingVehicle ? 'Editar Veículo' : 'Adicionar Novo Veículo'}
                </DialogTitle>
              </DialogHeader>
              <VehicleForm
                vehicle={editingVehicle}
                onSubmit={editingVehicle ? handleUpdateVehicle : handleAddVehicle}
                onClose={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden">
              {vehicle.image && (
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                  {vehicle.featured && (
                    <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                      Destaque
                    </Badge>
                  )}
                </div>
              )}
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <span>Ano: {vehicle.year}</span>
                    <span>KM: {vehicle.km.toLocaleString()}</span>
                    <span>Categoria: {vehicle.category}</span>
                    <span>Tipo: {vehicle.type}</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    R$ {vehicle.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm">
                    <strong>Tel. Proprietário:</strong> {vehicle.owner_phone}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingVehicle(vehicle);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {vehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum veículo cadastrado ainda.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

const AUTHORIZED_ADMIN_EMAIL = 'contato.turi8n@gmail.com';

const Admin = () => {
  const { user, loading, signIn, signUp, signOut } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    if (email !== AUTHORIZED_ADMIN_EMAIL) {
      toast({
        title: "Acesso negado",
        description: "Este email não tem permissão para acessar a área administrativa.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await signIn(email, password);
    if (error) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    if (email !== AUTHORIZED_ADMIN_EMAIL) {
      toast({
        title: "Acesso negado",
        description: "Este email não tem permissão para criar conta administrativa.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await signUp(email, password);
    if (error) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu email para confirmar o cadastro.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={handleLogin} onSignUp={handleSignUp} />;
  }

  // Verificar se o usuário logado é o email autorizado
  if (user.email !== AUTHORIZED_ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gradient">
              Acesso Negado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Você não tem permissão para acessar esta área.
            </p>
            <Button onClick={async () => await signOut()} variant="outline">
              Fazer Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AdminDashboard />;
};

export default Admin;