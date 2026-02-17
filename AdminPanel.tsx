import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Building2,
  Home,
  Briefcase,
  Star,
  Download,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Lead {
  nombre: string;
  email: string;
  telefono: string;
  tipoCliente: 'hogar' | 'empresarial' | 'institucional';
  sector?: string;
  tamanoEmpresa?: string;
  frecuenciaLimpieza?: string;
  ubicacion: string;
  presupuestoEstimado?: string;
  urgencia: 'alta' | 'media' | 'baja';
  notasAdicionales: string;
  potencialidad: 'alto' | 'medio' | 'bajo';
  puntajePotencialidad: number;
  fechaRegistro: string;
  estado?: 'nuevo' | 'contactado' | 'cotizado' | 'cerrado' | 'descartado';
}

const AdminPanel = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'hogar' | 'empresarial' | 'institucional'>('all');
  const [filterPotential, setFilterPotential] = useState<'all' | 'alto' | 'medio' | 'bajo'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'fecha' | 'potencial'>('fecha');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    filterAndSortLeads();
  }, [leads, searchTerm, filterType, filterPotential, sortBy, sortOrder]);

  const loadLeads = () => {
    const storedLeads = JSON.parse(localStorage.getItem('superclean_leads') || '[]');
    // Add default status if not present
    const leadsWithStatus = storedLeads.map((lead: Lead) => ({
      ...lead,
      estado: lead.estado || 'nuevo',
    }));
    setLeads(leadsWithStatus);
  };

  const filterAndSortLeads = () => {
    let result = [...leads];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (lead) =>
          lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.telefono.includes(searchTerm) ||
          lead.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      result = result.filter((lead) => lead.tipoCliente === filterType);
    }

    // Potential filter
    if (filterPotential !== 'all') {
      result = result.filter((lead) => lead.potencialidad === filterPotential);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'fecha') {
        const dateA = new Date(a.fechaRegistro).getTime();
        const dateB = new Date(b.fechaRegistro).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === 'asc'
          ? a.puntajePotencialidad - b.puntajePotencialidad
          : b.puntajePotencialidad - a.puntajePotencialidad;
      }
    });

    setFilteredLeads(result);
  };

  const updateLeadStatus = (lead: Lead, newStatus: Lead['estado']) => {
    const updatedLeads = leads.map((l) =>
      l.email === lead.email && l.fechaRegistro === lead.fechaRegistro
        ? { ...l, estado: newStatus }
        : l
    );
    setLeads(updatedLeads);
    localStorage.setItem('superclean_leads', JSON.stringify(updatedLeads));
  };

  const deleteLead = (lead: Lead) => {
    const updatedLeads = leads.filter(
      (l) => !(l.email === lead.email && l.fechaRegistro === lead.fechaRegistro)
    );
    setLeads(updatedLeads);
    localStorage.setItem('superclean_leads', JSON.stringify(updatedLeads));
    setIsDetailOpen(false);
  };

  const exportToCSV = () => {
    const headers = [
      'Nombre',
      'Email',
      'Teléfono',
      'Tipo Cliente',
      'Sector',
      'Tamaño',
      'Ubicación',
      'Presupuesto',
      'Urgencia',
      'Potencialidad',
      'Puntaje',
      'Fecha Registro',
      'Estado',
    ];

    const rows = filteredLeads.map((lead) => [
      lead.nombre,
      lead.email,
      lead.telefono,
      lead.tipoCliente,
      lead.sector || '',
      lead.tamanoEmpresa || '',
      lead.ubicacion,
      lead.presupuestoEstimado || '',
      lead.urgencia,
      lead.potencialidad,
      lead.puntajePotencialidad,
      new Date(lead.fechaRegistro).toLocaleString(),
      lead.estado || 'nuevo',
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads-superclean-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const contactViaWhatsApp = (lead: Lead) => {
    const message = `Hola ${lead.nombre}, soy de Super Clean Institucional. Recibimos tu solicitud de cotización y me gustaría darte más información. ¿Tienes un momento?`;
    const whatsappUrl = `https://wa.me/${lead.telefono.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    updateLeadStatus(lead, 'contactado');
  };

  const getStats = () => {
    const total = leads.length;
    const altoPotencial = leads.filter((l) => l.potencialidad === 'alto').length;
    const medioPotencial = leads.filter((l) => l.potencialidad === 'medio').length;
    const bajoPotencial = leads.filter((l) => l.potencialidad === 'bajo').length;
    const empresarial = leads.filter((l) => l.tipoCliente === 'empresarial').length;
    const hogar = leads.filter((l) => l.tipoCliente === 'hogar').length;
    const institucional = leads.filter((l) => l.tipoCliente === 'institucional').length;

    const promedioPuntaje = total > 0
      ? Math.round(leads.reduce((sum, l) => sum + l.puntajePotencialidad, 0) / total)
      : 0;

    return {
      total,
      altoPotencial,
      medioPotencial,
      bajoPotencial,
      empresarial,
      hogar,
      institucional,
      promedioPuntaje,
    };
  };

  const stats = getStats();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nuevo':
        return 'bg-blue-100 text-blue-700';
      case 'contactado':
        return 'bg-yellow-100 text-yellow-700';
      case 'cotizado':
        return 'bg-purple-100 text-purple-700';
      case 'cerrado':
        return 'bg-green-100 text-green-700';
      case 'descartado':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'nuevo':
        return <Star className="w-3 h-3" />;
      case 'contactado':
        return <Phone className="w-3 h-3" />;
      case 'cotizado':
        return <BarChart3 className="w-3 h-3" />;
      case 'cerrado':
        return <CheckCircle className="w-3 h-3" />;
      case 'descartado':
        return <X className="w-3 h-3" />;
      default:
        return <Star className="w-3 h-3" />;
    }
  };

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'alto':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medio':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'bajo':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Panel de Leads</h1>
            <p className="text-gray-500 mt-1">Gestiona los clientes potenciales capturados por el chatbot</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </Button>
            <Button
              onClick={loadLeads}
              className="bg-brand-green hover:bg-brand-green-dark flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Actualizar
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-500 text-sm">Total Leads</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-gray-500 text-sm">Alto Potencial</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.altoPotencial}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-gray-500 text-sm">Empresarial</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.empresarial}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-gray-500 text-sm">Promedio Score</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.promedioPuntaje}%</p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, email, teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              >
                <option value="all">Todos los tipos</option>
                <option value="hogar">Hogar</option>
                <option value="empresarial">Empresarial</option>
                <option value="institucional">Institucional</option>
              </select>
              <select
                value={filterPotential}
                onChange={(e) => setFilterPotential(e.target.value as any)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              >
                <option value="all">Toda potencialidad</option>
                <option value="alto">Alto potencial</option>
                <option value="medio">Medio potencial</option>
                <option value="bajo">Bajo potencial</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              >
                <option value="fecha">Ordenar por fecha</option>
                <option value="potencial">Ordenar por potencial</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
              >
                {sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="max-w-7xl mx-auto">
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay leads registrados</h3>
            <p className="text-gray-500">Los leads capturados por el chatbot aparecerán aquí.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredLeads.map((lead, index) => (
              <motion.div
                key={`${lead.email}-${lead.fechaRegistro}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setSelectedLead(lead);
                  setIsDetailOpen(true);
                }}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      lead.tipoCliente === 'hogar' ? 'bg-green-100' :
                      lead.tipoCliente === 'empresarial' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {lead.tipoCliente === 'hogar' ? <Home className="w-6 h-6 text-green-600" /> :
                       lead.tipoCliente === 'empresarial' ? <Building2 className="w-6 h-6 text-blue-600" /> :
                       <Briefcase className="w-6 h-6 text-purple-600" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{lead.nombre}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {lead.telefono}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {lead.ubicacion}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(lead.estado || 'nuevo')}`}>
                      {getStatusIcon(lead.estado || 'nuevo')}
                      {(lead.estado || 'nuevo').charAt(0).toUpperCase() + (lead.estado || 'nuevo').slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPotentialColor(lead.potencialidad)}`}>
                      {lead.puntajePotencialidad}% {lead.potencialidad}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(lead.fechaRegistro).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lead Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedLead.tipoCliente === 'hogar' ? 'bg-green-100' :
                    selectedLead.tipoCliente === 'empresarial' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {selectedLead.tipoCliente === 'hogar' ? <Home className="w-5 h-5 text-green-600" /> :
                     selectedLead.tipoCliente === 'empresarial' ? <Building2 className="w-5 h-5 text-blue-600" /> :
                     <Briefcase className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div>
                    <span className="text-xl">{selectedLead.nombre}</span>
                    <span className={`ml-3 px-2 py-0.5 rounded-full text-xs ${getPotentialColor(selectedLead.potencialidad)}`}>
                      {selectedLead.puntajePotencialidad}% {selectedLead.potencialidad}
                    </span>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {selectedLead.email}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                    <p className="font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {selectedLead.telefono}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Tipo de Cliente</p>
                    <p className="font-medium capitalize">{selectedLead.tipoCliente}</p>
                  </div>
                  {selectedLead.sector && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Sector</p>
                      <p className="font-medium capitalize">{selectedLead.sector}</p>
                    </div>
                  )}
                  {selectedLead.tamanoEmpresa && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Tamaño</p>
                      <p className="font-medium capitalize">{selectedLead.tamanoEmpresa}</p>
                    </div>
                  )}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Ubicación</p>
                    <p className="font-medium">{selectedLead.ubicacion}</p>
                  </div>
                  {selectedLead.frecuenciaLimpieza && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Frecuencia</p>
                      <p className="font-medium capitalize">{selectedLead.frecuenciaLimpieza}</p>
                    </div>
                  )}
                  {selectedLead.presupuestoEstimado && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Presupuesto</p>
                      <p className="font-medium">{selectedLead.presupuestoEstimado}</p>
                    </div>
                  )}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Urgencia</p>
                    <p className="font-medium capitalize flex items-center gap-2">
                      {selectedLead.urgencia === 'alta' && <AlertCircle className="w-4 h-4 text-red-500" />}
                      {selectedLead.urgencia}
                    </p>
                  </div>
                </div>

                {selectedLead.notasAdicionales && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Notas Adicionales</p>
                    <p className="text-gray-700">{selectedLead.notasAdicionales}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  <Button
                    onClick={() => contactViaWhatsApp(selectedLead)}
                    className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contactar WhatsApp
                  </Button>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar Email
                    </Button>
                  </a>
                </div>

                {/* Status Update */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-3">Actualizar Estado</p>
                  <div className="flex flex-wrap gap-2">
                    {(['nuevo', 'contactado', 'cotizado', 'cerrado', 'descartado'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => updateLeadStatus(selectedLead, status)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedLead.estado === status
                            ? getStatusColor(status)
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delete */}
                <div className="pt-4 border-t flex justify-end">
                  <Button
                    variant="ghost"
                    onClick={() => deleteLead(selectedLead)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar Lead
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
