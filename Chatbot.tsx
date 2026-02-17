import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  Building2, 
  Home, 
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Tipos
interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: Option[];
  timestamp: Date;
}

interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface LeadData {
  nombre: string;
  email: string;
  telefono: string;
  tipoCliente: 'hogar' | 'empresarial' | 'institucional' | '';
  sector?: string;
  tamanoEmpresa?: string;
  numEmpleados?: string;
  superficie?: string;
  frecuenciaLimpieza?: string;
  ubicacion: string;
  presupuestoEstimado?: string;
  urgencia: 'alta' | 'media' | 'baja';
  notasAdicionales: string;
  potencialidad: 'alto' | 'medio' | 'bajo';
  puntajePotencialidad: number;
  fechaRegistro: Date;
}

// Sectores por tipo de cliente
const sectoresEmpresarial = [
  { value: 'oficinas', label: 'Oficinas Corporativas', potencial: 85 },
  { value: 'retail', label: 'Tiendas / Retail', potencial: 90 },
  { value: 'restaurantes', label: 'Restaurantes / Food Service', potencial: 95 },
  { value: 'salud', label: 'Clínicas / Hospitales', potencial: 100 },
  { value: 'educacion', label: 'Escuelas / Universidades', potencial: 80 },
  { value: 'industrial', label: 'Plantas Industriales', potencial: 75 },
  { value: 'hotelero', label: 'Hoteles / Hospitabilidad', potencial: 95 },
  { value: 'gimnasios', label: 'Gimnasios / Spas', potencial: 88 },
  { value: 'otro', label: 'Otro sector', potencial: 70 },
];

const sectoresInstitucional = [
  { value: 'gobierno', label: 'Gobierno / Municipal', potencial: 85 },
  { value: 'educacion', label: 'Instituciones Educativas', potencial: 80 },
  { value: 'salud', label: 'Centros de Salud Pública', potencial: 95 },
  { value: 'ong', label: 'ONG / Organizaciones', potencial: 65 },
  { value: 'otro', label: 'Otro', potencial: 60 },
];

const tamanosEmpresa = [
  { value: 'pequena', label: 'Pequeña (1-20 empleados)', factor: 0.8 },
  { value: 'mediana', label: 'Mediana (21-100 empleados)', factor: 1.0 },
  { value: 'grande', label: 'Grande (101-500 empleados)', factor: 1.2 },
  { value: 'corporativo', label: 'Corporativo (500+ empleados)', factor: 1.5 },
];

const frecuenciasLimpieza = [
  { value: 'diaria', label: 'Diaria', potencial: 100 },
  { value: 'semanal', label: 'Semanal (2-3 veces)', potencial: 85 },
  { value: 'quincenal', label: 'Quincenal', potencial: 70 },
  { value: 'mensual', label: 'Mensual', potencial: 60 },
  { value: 'unica', label: 'Servicio único', potencial: 40 },
];

const presupuestos = [
  { value: 'menos5k', label: 'Menos de $5,000 MXN', factor: 0.6 },
  { value: '5k-15k', label: '$5,000 - $15,000 MXN', factor: 0.8 },
  { value: '15k-50k', label: '$15,000 - $50,000 MXN', factor: 1.0 },
  { value: '50k-100k', label: '$50,000 - $100,000 MXN', factor: 1.2 },
  { value: 'mas100k', label: 'Más de $100,000 MXN', factor: 1.5 },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const phoneNumber = '3219373623';

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, currentStep]);

  // Initialize chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        '¡Hola! 👋 Soy el asistente virtual de Super Clean Institucional.',
        500
      );
      setTimeout(() => {
        addBotMessage(
          'Estoy aquí para ayudarte a encontrar el plan de limpieza perfecto para ti. ¿Empezamos?',
          800
        );
        setTimeout(() => {
          askForName();
        }, 1200);
      }, 1000);
    }
  }, [isOpen]);

  const addBotMessage = (content: string, delay: number = 0, options?: Option[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'bot',
          content,
          options,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, delay);
  };

  const addUserMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'user',
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const askForName = () => {
    setCurrentStep(1);
    addBotMessage('¿Cuál es tu nombre? 😊', 300);
  };

  const handleNameSubmit = () => {
    if (!inputValue.trim()) return;
    
    addUserMessage(inputValue);
    setLeadData((prev) => ({ ...prev, nombre: inputValue }));
    setInputValue('');
    
    setTimeout(() => {
      askForContactType();
    }, 600);
  };

  const askForContactType = () => {
    setCurrentStep(2);
    addBotMessage(
      `¡Mucho gusto, ${leadData.nombre || 'amigo'}! ¿Para quién necesitas el servicio de limpieza?`,
      500,
      [
        { label: 'Para mi hogar', value: 'hogar', icon: <Home className="w-4 h-4" /> },
        { label: 'Para mi empresa', value: 'empresarial', icon: <Building2 className="w-4 h-4" /> },
        { label: 'Para una institución', value: 'institucional', icon: <Briefcase className="w-4 h-4" /> },
      ]
    );
  };

  const handleTypeSelection = (type: string) => {
    addUserMessage(
      type === 'hogar' ? 'Para mi hogar' : 
      type === 'empresarial' ? 'Para mi empresa' : 
      'Para una institución'
    );
    setLeadData((prev) => ({ ...prev, tipoCliente: type as any }));
    
    setTimeout(() => {
      if (type === 'hogar') {
        askHomeDetails();
      } else if (type === 'empresarial') {
        askCompanySector();
      } else {
        askInstitutionalSector();
      }
    }, 600);
  };

  const askHomeDetails = () => {
    setCurrentStep(3);
    addBotMessage(
      '¡Perfecto! Para darte la mejor cotización, necesito saber un poco más:',
      500
    );
    setTimeout(() => {
      addBotMessage(
        '¿De qué tamaño es tu hogar (aproximadamente en metros cuadrados)? 🏠',
        800
      );
    }, 1000);
  };

  const askCompanySector = () => {
    setCurrentStep(4);
    addBotMessage(
      'Excelente. ¿A qué sector pertenece tu empresa?',
      500,
      sectoresEmpresarial.map((s) => ({ label: s.label, value: s.value }))
    );
  };

  const askInstitutionalSector = () => {
    setCurrentStep(5);
    addBotMessage(
      'Perfecto. ¿Qué tipo de institución es?',
      500,
      sectoresInstitucional.map((s) => ({ label: s.label, value: s.value }))
    );
  };

  const handleSectorSelection = (sector: string) => {
    const sectorData = [...sectoresEmpresarial, ...sectoresInstitucional].find(
      (s) => s.value === sector
    );
    addUserMessage(sectorData?.label || sector);
    setLeadData((prev) => ({ ...prev, sector }));
    
    setTimeout(() => {
      askCompanySize();
    }, 600);
  };

  const askCompanySize = () => {
    setCurrentStep(6);
    addBotMessage(
      '¿Cuál es el tamaño de tu organización?',
      500,
      tamanosEmpresa.map((t) => ({ label: t.label, value: t.value }))
    );
  };

  const handleSizeSelection = (size: string) => {
    const sizeData = tamanosEmpresa.find((t) => t.value === size);
    addUserMessage(sizeData?.label || size);
    setLeadData((prev) => ({ ...prev, tamanoEmpresa: size }));
    
    setTimeout(() => {
      askFrequency();
    }, 600);
  };

  const askFrequency = () => {
    setCurrentStep(7);
    addBotMessage(
      '¿Con qué frecuencia necesitas el servicio de limpieza?',
      500,
      frecuenciasLimpieza.map((f) => ({ label: f.label, value: f.value }))
    );
  };

  const handleFrequencySelection = (freq: string) => {
    const freqData = frecuenciasLimpieza.find((f) => f.value === freq);
    addUserMessage(freqData?.label || freq);
    setLeadData((prev) => ({ ...prev, frecuenciaLimpieza: freq }));
    
    setTimeout(() => {
      askBudget();
    }, 600);
  };

  const askBudget = () => {
    setCurrentStep(8);
    addBotMessage(
      '¿Cuál es tu presupuesto aproximado mensual para servicios de limpieza?',
      500,
      presupuestos.map((p) => ({ label: p.label, value: p.value }))
    );
  };

  const handleBudgetSelection = (budget: string) => {
    const budgetData = presupuestos.find((p) => p.value === budget);
    addUserMessage(budgetData?.label || budget);
    setLeadData((prev) => ({ ...prev, presupuestoEstimado: budget }));
    
    setTimeout(() => {
      askLocation();
    }, 600);
  };

  const askLocation = () => {
    setCurrentStep(9);
    addBotMessage(
      '¿En qué ciudad o zona te encuentras? 📍',
      500
    );
  };

  const handleLocationSubmit = () => {
    if (!inputValue.trim()) return;
    
    addUserMessage(inputValue);
    setLeadData((prev) => ({ ...prev, ubicacion: inputValue }));
    setInputValue('');
    
    setTimeout(() => {
      askUrgency();
    }, 600);
  };

  const askUrgency = () => {
    setCurrentStep(10);
    addBotMessage(
      '¿Qué tan urgente necesitas el servicio?',
      500,
      [
        { label: '🔥 Muy urgente (esta semana)', value: 'alta' },
        { label: '⚡ Pronto (próximas 2-4 semanas)', value: 'media' },
        { label: '📅 Planeando para más adelante', value: 'baja' },
      ]
    );
  };

  const handleUrgencySelection = (urgency: string) => {
    const labels: Record<string, string> = {
      alta: 'Muy urgente',
      media: 'Pronto',
      baja: 'Planeando para más adelante',
    };
    addUserMessage(labels[urgency]);
    setLeadData((prev) => ({ ...prev, urgencia: urgency as any }));
    
    setTimeout(() => {
      askContactInfo();
    }, 600);
  };

  const askContactInfo = () => {
    setCurrentStep(11);
    addBotMessage(
      '¡Excelente! Ahora necesito tus datos de contacto para enviarte la cotización personalizada.',
      500
    );
    setTimeout(() => {
      addBotMessage('¿Cuál es tu correo electrónico? 📧', 800);
    }, 1000);
  };

  const handleEmailSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputValue)) {
      addBotMessage('Por favor, ingresa un correo electrónico válido. 📧', 300);
      return;
    }
    
    addUserMessage(inputValue);
    setLeadData((prev) => ({ ...prev, email: inputValue }));
    setInputValue('');
    
    setTimeout(() => {
      addBotMessage('¿Y tu número de teléfono? 📱 (con WhatsApp preferiblemente)', 500);
      setCurrentStep(12);
    }, 600);
  };

  const handlePhoneSubmit = () => {
    if (inputValue.length < 10) {
      addBotMessage('Por favor, ingresa un número de teléfono válido. 📱', 300);
      return;
    }
    
    addUserMessage(inputValue);
    setLeadData((prev) => ({ ...prev, telefono: inputValue }));
    setInputValue('');
    
    setTimeout(() => {
      askAdditionalNotes();
    }, 600);
  };

  const askAdditionalNotes = () => {
    setCurrentStep(13);
    addBotMessage(
      '¿Hay algo más que quieras contarnos sobre tus necesidades de limpieza? (opcional)',
      500
    );
  };

  const handleNotesSubmit = () => {
    addUserMessage(inputValue || 'Nada adicional');
    setLeadData((prev) => ({ ...prev, notasAdicionales: inputValue }));
    setInputValue('');
    
    setTimeout(() => {
      completeChat();
    }, 600);
  };

  const calculatePotencialidad = (data: Partial<LeadData>): { nivel: 'alto' | 'medio' | 'bajo'; puntaje: number } => {
    let puntaje = 0;
    
    // Puntos por tipo de cliente
    if (data.tipoCliente === 'empresarial') puntaje += 30;
    else if (data.tipoCliente === 'institucional') puntaje += 25;
    else puntaje += 20;
    
    // Puntos por sector
    const sectorData = [...sectoresEmpresarial, ...sectoresInstitucional].find(
      (s) => s.value === data.sector
    );
    if (sectorData) {
      puntaje += sectorData.potencial * 0.3;
    }
    
    // Puntos por tamaño
    const sizeData = tamanosEmpresa.find((t) => t.value === data.tamanoEmpresa);
    if (sizeData) {
      puntaje += sizeData.factor * 15;
    }
    
    // Puntos por frecuencia
    const freqData = frecuenciasLimpieza.find((f) => f.value === data.frecuenciaLimpieza);
    if (freqData) {
      puntaje += freqData.potencial * 0.2;
    }
    
    // Puntos por presupuesto
    const budgetData = presupuestos.find((p) => p.value === data.presupuestoEstimado);
    if (budgetData) {
      puntaje += budgetData.factor * 10;
    }
    
    // Puntos por urgencia
    if (data.urgencia === 'alta') puntaje += 15;
    else if (data.urgencia === 'media') puntaje += 10;
    else puntaje += 5;
    
    // Normalizar a 100
    puntaje = Math.min(Math.round(puntaje), 100);
    
    let nivel: 'alto' | 'medio' | 'bajo' = 'medio';
    if (puntaje >= 75) nivel = 'alto';
    else if (puntaje >= 50) nivel = 'medio';
    else nivel = 'bajo';
    
    return { nivel, puntaje };
  };

  const completeChat = () => {
    setCurrentStep(14);
    
    // Calcular potencialidad
    const { nivel, puntaje } = calculatePotencialidad(leadData);
    const finalData = { ...leadData, potencialidad: nivel, puntajePotencialidad: puntaje, fechaRegistro: new Date() };
    setLeadData(finalData);
    
    // Guardar lead en localStorage
    saveLead(finalData as LeadData);
    
    // Mensaje final
    addBotMessage(
      `¡Perfecto, ${finalData.nombre}! 🎉 He registrado toda tu información.`,
      500
    );
    
    setTimeout(() => {
      addBotMessage(
        `Basado en tus necesidades, he calculado que tu perfil tiene un potencial de conversión del **${puntaje}%**.`,
        800
      );
    }, 1200);
    
    setTimeout(() => {
      addBotMessage(
        'Uno de nuestros asesores se pondrá en contacto contigo muy pronto con tu cotización personalizada. 📋',
        1000
      );
    }, 2200);
    
    setTimeout(() => {
      addBotMessage(
        '¿Te gustaría que te contactemos por WhatsApp para una atención más rápida?',
        800,
        [
          { label: 'Sí, por WhatsApp', value: 'whatsapp' },
          { label: 'No, solo correo', value: 'email' },
        ]
      );
      setIsCompleted(true);
    }, 3500);
  };

  const saveLead = (lead: LeadData) => {
    const existingLeads = JSON.parse(localStorage.getItem('superclean_leads') || '[]');
    existingLeads.push(lead);
    localStorage.setItem('superclean_leads', JSON.stringify(existingLeads));
    
    // También enviar por WhatsApp si es posible
    sendLeadToWhatsApp(lead);
  };

  const sendLeadToWhatsApp = (lead: LeadData) => {
    const message = `
🆕 *NUEVO LEAD - SUPER CLEAN*

👤 *Nombre:* ${lead.nombre}
📧 *Email:* ${lead.email}
📱 *Teléfono:* ${lead.telefono}
📍 *Ubicación:* ${lead.ubicacion}

🏢 *Tipo:* ${lead.tipoCliente?.toUpperCase()}
${lead.sector ? `🏭 *Sector:* ${lead.sector}` : ''}
${lead.tamanoEmpresa ? `📊 *Tamaño:* ${lead.tamanoEmpresa}` : ''}
🔄 *Frecuencia:* ${lead.frecuenciaLimpieza}
💰 *Presupuesto:* ${lead.presupuestoEstimado}
🔥 *Urgencia:* ${lead.urgencia?.toUpperCase()}

📈 *Potencialidad:* ${lead.puntajePotencialidad}% (${lead.potencialidad.toUpperCase()})

📝 *Notas:* ${lead.notasAdicionales || 'Ninguna'}
    `.trim();
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFinalOption = (option: string) => {
    if (option === 'whatsapp') {
      addUserMessage('Sí, por WhatsApp');
      const message = `Hola, soy ${leadData.nombre}. Acabo de completar el formulario en su página web y me gustaría recibir más información sobre sus servicios de limpieza.`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      addUserMessage('No, solo correo');
    }
    
    setTimeout(() => {
      addBotMessage(
        '¡Gracias por contactarnos! Estaremos en contacto muy pronto. Que tengas un excelente día. 🌟',
        500
      );
    }, 600);
  };

  const handleInputSubmit = () => {
    if (!inputValue.trim()) return;
    
    switch (currentStep) {
      case 1:
        handleNameSubmit();
        break;
      case 3:
        // Home size
        addUserMessage(inputValue + ' m²');
        setLeadData((prev) => ({ ...prev, superficie: inputValue }));
        setInputValue('');
        setTimeout(() => askFrequency(), 600);
        break;
      case 9:
        handleLocationSubmit();
        break;
      case 11:
        handleEmailSubmit();
        break;
      case 12:
        handlePhoneSubmit();
        break;
      case 13:
        handleNotesSubmit();
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  const getLastBotMessageOptions = () => {
    const botMessages = messages.filter((m) => m.type === 'bot');
    const lastBotMessage = botMessages[botMessages.length - 1];
    return lastBotMessage?.options || [];
  };

  const options = getLastBotMessageOptions();

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-brand-green hover:bg-brand-green-dark rounded-full shadow-lg flex items-center justify-center text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, type: 'spring' }}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-green to-brand-green-dark p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Asistente Super Clean</h4>
                  <p className="text-white/70 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    En línea
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.type === 'user'
                        ? 'bg-brand-green text-white rounded-br-md'
                        : 'bg-white shadow-sm rounded-bl-md'
                    }`}
                  >
                    {message.type === 'bot' && (
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="w-4 h-4 text-brand-green" />
                        <span className="text-xs text-gray-500">Bot</span>
                      </div>
                    )}
                    <p
                      className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-gray-700'}`}
                      dangerouslySetInnerHTML={{
                        __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                      }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white shadow-sm rounded-2xl rounded-bl-md p-3">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-brand-green" />
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Options */}
            {options.length > 0 && !isTyping && (
              <div className="p-3 bg-white border-t">
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => {
                        if (currentStep === 2) {
                          handleTypeSelection(option.value);
                        } else if (currentStep === 4 || currentStep === 5) {
                          handleSectorSelection(option.value);
                        } else if (currentStep === 6) {
                          handleSizeSelection(option.value);
                        } else if (currentStep === 7) {
                          handleFrequencySelection(option.value);
                        } else if (currentStep === 8) {
                          handleBudgetSelection(option.value);
                        } else if (currentStep === 10) {
                          handleUrgencySelection(option.value);
                        } else if (isCompleted) {
                          handleFinalOption(option.value);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-green/10 hover:bg-brand-green hover:text-white text-brand-green rounded-full text-sm font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.icon}
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            {!isCompleted && options.length === 0 && (
              <div className="p-3 bg-white border-t flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu respuesta..."
                  className="flex-1 rounded-full border-gray-200 focus:border-brand-green focus:ring-brand-green"
                />
                <Button
                  onClick={handleInputSubmit}
                  className="w-10 h-10 p-0 rounded-full bg-brand-green hover:bg-brand-green-dark"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
