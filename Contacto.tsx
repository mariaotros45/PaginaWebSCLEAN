import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, Send, CheckCircle, Loader2, MessageCircle, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contacto = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const isLeftInView = useInView(leftRef, { once: true, margin: '-100px' });
  const isRightInView = useInView(rightRef, { once: true, margin: '-100px' });

  const phoneNumber = '3219373623';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating elements
      gsap.to('.contact-float-1', {
        y: -25,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.contact-float-2', {
        y: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    if (!formData.servicio) {
      newErrors.servicio = 'Selecciona un tipo de servicio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        servicio: '',
        mensaje: '',
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const openWhatsApp = () => {
    const message = `¡Hola! Soy ${formData.nombre || 'un cliente interesado'}. Me gustaría obtener información sobre ${formData.servicio || 'sus servicios'}. ${formData.mensaje}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'Teléfono',
      value: '321-937-3623',
      href: `tel:${phoneNumber}`,
      color: 'brand-green',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Correo',
      value: 'info@superclean.com',
      href: 'mailto:info@superclean.com',
      color: 'brand-blue',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Ubicación',
      value: 'Ciudad de México',
      href: '#',
      color: 'brand-green',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Horario',
      value: 'Lun - Vie: 9am - 6pm',
      href: '#',
      color: 'brand-blue',
    },
  ];

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-brand-gray relative overflow-hidden"
      aria-labelledby="contacto-title"
    >
      {/* Floating Decorative Elements */}
      <div className="contact-float-1 absolute top-20 left-10 w-40 h-40 bg-brand-green/10 rounded-full blur-3xl" />
      <div className="contact-float-2 absolute bottom-20 right-10 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - CTA Info */}
            <motion.div
              ref={leftRef}
              initial={{ opacity: 0, x: -60 }}
              animate={isLeftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isLeftInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="inline-block px-5 py-2.5 bg-brand-green/10 text-brand-green rounded-full text-sm font-semibold mb-6"
              >
                Contáctanos
              </motion.span>

              <motion.h2
                id="contacto-title"
                initial={{ opacity: 0, y: 30 }}
                animate={isLeftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
              >
                Contáctanos para un{' '}
                <span className="text-brand-green">Plan de Limpieza a Medida</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isLeftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mb-10 text-lg leading-relaxed"
              >
                Recibe una cotización personalizada para tu hogar o negocio. Nuestro equipo está listo para atenderte.
              </motion.p>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLeftInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-soft hover:shadow-card transition-all duration-300"
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-${item.color}/10 flex items-center justify-center group-hover:bg-${item.color} transition-colors duration-300`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                    >
                      <div className={`text-${item.color} group-hover:text-white transition-colors duration-300`}>
                        {item.icon}
                      </div>
                    </motion.div>
                    <div>
                      <p className="text-sm text-gray-500">{item.title}</p>
                      <p className="text-gray-800 font-semibold group-hover:text-brand-green transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLeftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 }}
                className="bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">¿Prefieres WhatsApp?</p>
                    <p className="text-gray-600 text-sm">Escríbenos directamente</p>
                  </div>
                  <motion.a
                    href={`https://wa.me/${phoneNumber}?text=¡Hola! Me interesa obtener información sobre Super Clean Institucional.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full font-medium transition-colors duration-300"
                  >
                    Chatear
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              ref={rightRef}
              initial={{ opacity: 0, x: 60 }}
              animate={isRightInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="bg-white rounded-3xl shadow-card p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Solicita tu Cotización
                </h3>
                <p className="text-gray-500 mb-8">
                  Completa el formulario y te contactaremos pronto
                </p>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="w-24 h-24 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="w-12 h-12 text-brand-green" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">
                        ¡Gracias!
                      </h4>
                      <p className="text-gray-600">
                        Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Nombre */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isRightInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                      >
                        <Label htmlFor="nombre" className="text-gray-700 font-medium">
                          Nombre
                        </Label>
                        <Input
                          id="nombre"
                          type="text"
                          placeholder="Tu nombre completo"
                          value={formData.nombre}
                          onChange={(e) => handleInputChange('nombre', e.target.value)}
                          className={`mt-2 h-12 rounded-xl border-gray-200 focus:border-brand-green focus:ring-brand-green transition-all duration-300 ${
                            errors.nombre ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.nombre && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1"
                          >
                            {errors.nombre}
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Email & Teléfono */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={isRightInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.4 }}
                        >
                          <Label htmlFor="email" className="text-gray-700 font-medium">
                            Correo Electrónico
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`mt-2 h-12 rounded-xl border-gray-200 focus:border-brand-green focus:ring-brand-green transition-all duration-300 ${
                              errors.email ? 'border-red-500' : ''
                            }`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={isRightInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.5 }}
                        >
                          <Label htmlFor="telefono" className="text-gray-700 font-medium">
                            Teléfono
                          </Label>
                          <Input
                            id="telefono"
                            type="tel"
                            placeholder="321-937-3623"
                            value={formData.telefono}
                            onChange={(e) => handleInputChange('telefono', e.target.value)}
                            className={`mt-2 h-12 rounded-xl border-gray-200 focus:border-brand-green focus:ring-brand-green transition-all duration-300 ${
                              errors.telefono ? 'border-red-500' : ''
                            }`}
                          />
                          {errors.telefono && (
                            <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
                          )}
                        </motion.div>
                      </div>

                      {/* Tipo de Servicio */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isRightInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 }}
                      >
                        <Label htmlFor="servicio" className="text-gray-700 font-medium">
                          Tipo de Servicio
                        </Label>
                        <Select
                          value={formData.servicio}
                          onValueChange={(value) => handleInputChange('servicio', value)}
                        >
                          <SelectTrigger
                            id="servicio"
                            className={`mt-2 h-12 rounded-xl border-gray-200 focus:border-brand-green focus:ring-brand-green transition-all duration-300 ${
                              errors.servicio ? 'border-red-500' : ''
                            }`}
                          >
                            <SelectValue placeholder="Selecciona un servicio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hogar">Plan Hogar</SelectItem>
                            <SelectItem value="empresarial">Plan Empresarial</SelectItem>
                            <SelectItem value="institucional">Plan Institucional</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.servicio && (
                          <p className="text-red-500 text-sm mt-1">{errors.servicio}</p>
                        )}
                      </motion.div>

                      {/* Mensaje */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isRightInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.7 }}
                      >
                        <Label htmlFor="mensaje" className="text-gray-700 font-medium">
                          Mensaje
                        </Label>
                        <Textarea
                          id="mensaje"
                          placeholder="Cuéntanos más sobre tus necesidades..."
                          value={formData.mensaje}
                          onChange={(e) => handleInputChange('mensaje', e.target.value)}
                          className="mt-2 min-h-[100px] rounded-xl border-gray-200 focus:border-brand-green focus:ring-brand-green transition-all duration-300 resize-none"
                        />
                      </motion.div>

                      {/* Submit Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isRightInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-3 pt-2"
                      >
                        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 bg-brand-green hover:bg-brand-green-dark text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Enviando...
                              </>
                            ) : (
                              <>
                                <Send className="w-5 h-5 mr-2" />
                                Solicitar Cotización
                              </>
                            )}
                          </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="button"
                            onClick={openWhatsApp}
                            variant="outline"
                            className="w-full sm:w-auto h-12 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-xl font-semibold transition-all duration-300"
                          >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            WhatsApp
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
