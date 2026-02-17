import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail, ArrowUp, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const phoneNumber = '3219373623';

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Servicios', id: 'servicios' },
    { label: 'Sobre Nosotros', id: 'valores' },
    { label: 'Galería', id: 'galeria' },
    { label: 'Contacto', id: 'contacto' },
  ];

  const services = [
    'Plan Hogar',
    'Plan Empresarial',
    'Plan Institucional',
    'Productos Biodegradables',
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden" role="contentinfo">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-brand-blue/5 rounded-full blur-3xl" />

      {/* Main Footer */}
      <motion.div
        className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/images/logo.jpeg"
                alt="Super Clean Institucional"
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </motion.a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Productos premium biodegradables de limpieza y desinfección para hogares e instituciones.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                >
                  <motion.button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-brand-green-light transition-colors duration-300 text-sm flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand-green-light transition-all duration-300" />
                    {link.label}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6">Servicios</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.4 }}
                >
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green/50" />
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-brand-green-light transition-colors duration-300 group"
                >
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-brand-green transition-colors"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                  >
                    <Phone className="w-4 h-4" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-gray-500">Teléfono / WhatsApp</p>
                    <p className="text-sm font-medium">321-937-3623</p>
                  </div>
                </a>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href="mailto:info@superclean.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-brand-green-light transition-colors duration-300 group"
                >
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-brand-blue transition-colors"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                  >
                    <Mail className="w-4 h-4" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-gray-500">Correo</p>
                    <p className="text-sm font-medium">info@superclean.com</p>
                  </div>
                </a>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-start gap-3 text-gray-400"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ubicación</p>
                  <p className="text-sm font-medium">Ciudad de México, México</p>
                </div>
              </motion.li>
            </ul>

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${phoneNumber}?text=¡Hola! Me interesa obtener información sobre Super Clean Institucional.`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 flex items-center gap-3 p-4 bg-[#25D366]/20 rounded-xl hover:bg-[#25D366]/30 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Escríbenos por WhatsApp</p>
                <p className="text-xs text-gray-400">Respuesta inmediata</p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm text-center sm:text-left"
            >
              © 2026 SUPER CLEAN INSTITUCIONAL. Todos los derechos reservados.
            </motion.p>
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-brand-green hover:bg-brand-green-dark flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/30"
              aria-label="Volver arriba"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
