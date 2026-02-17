import { useEffect, useRef, useState } from 'react';
import { Home, Building2, Check, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicioCardProps {
  icon: React.ReactNode;
  title: string;
  features: string[];
  buttonText: string;
  buttonVariant: 'green' | 'blue';
  image: string;
  index: number;
}

const ServicioCard = ({
  icon,
  title,
  features,
  buttonText,
  buttonVariant,
  image,
  index,
}: ServicioCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isGreen = buttonVariant === 'green';
  const bgColor = isGreen ? 'bg-brand-green' : 'bg-brand-blue';
  const hoverBg = isGreen ? 'hover:bg-brand-green-dark' : 'hover:bg-brand-blue-dark';
  const lightBg = isGreen ? 'bg-brand-green/10' : 'bg-brand-blue/10';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateY: index === 0 ? -10 : 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      {/* Glow Effect */}
      <motion.div
        className={`absolute -inset-1 rounded-3xl ${bgColor} opacity-0 blur-xl transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 0.3 : 0 }}
      />

      <motion.div
        className="relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-hover transition-shadow duration-500"
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ duration: 0.4 }}
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Floating Badge */}
          <motion.div
            className={`absolute top-4 left-4 ${lightBg} backdrop-blur-sm px-4 py-2 rounded-full`}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2 + 0.4 }}
          >
            <span className={`text-sm font-semibold ${isGreen ? 'text-brand-green' : 'text-brand-blue'}`}>
              {index === 0 ? 'Para tu familia' : 'Para tu negocio'}
            </span>
          </motion.div>

          {/* Sparkle Animation */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 right-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className={`w-6 h-6 ${isGreen ? 'text-brand-green-light' : 'text-brand-blue-light'}`} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-8">
          {/* Title */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className={`w-14 h-14 rounded-2xl ${lightBg} flex items-center justify-center`}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={isGreen ? 'text-brand-green' : 'text-brand-blue'}>
                {icon}
              </div>
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-brand-green transition-colors duration-300">
              {title}
            </h3>
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-8">
            {features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.5 + i * 0.1 }}
              >
                <motion.div
                  className={`w-6 h-6 rounded-full ${lightBg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                  whileHover={{ scale: 1.2 }}
                >
                  <Check className={`w-4 h-4 ${isGreen ? 'text-brand-green' : 'text-brand-blue'}`} />
                </motion.div>
                <span className="text-gray-600">{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={scrollToContact}
              className={`w-full py-6 rounded-xl text-base font-semibold transition-all duration-300 ${bgColor} ${hoverBg} text-white hover:shadow-lg`}
            >
              <span className="flex items-center justify-center">
                {buttonText}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight className="w-5 h-5 ml-2" />
                </motion.span>
              </span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Servicios = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating decorative elements
      gsap.to('.service-float-1', {
        y: -30,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.service-float-2', {
        y: 20,
        x: -15,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const servicios = [
    {
      icon: <Home className="w-7 h-7" />,
      title: 'Plan Hogar',
      features: [
        'Limpieza segura y efectiva',
        'Amigables con niños y mascotas',
        'Mantén un hogar saludable',
      ],
      buttonText: 'Cotizar Plan Hogar',
      buttonVariant: 'green' as const,
      image: '/images/hero-reference.png',
    },
    {
      icon: <Building2 className="w-7 h-7" />,
      title: 'Plan Empresarial',
      features: [
        'Soluciones para oficinas e instituciones',
        'Ambientes de trabajo saludables',
        'Servicio profesional certificado',
      ],
      buttonText: 'Cotizar Plan Empresarial',
      buttonVariant: 'blue' as const,
      image: '/images/hero-reference.png',
    },
  ];

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-brand-gray relative overflow-hidden"
      aria-labelledby="servicios-title"
    >
      {/* Floating Decorative Elements */}
      <div className="service-float-1 absolute top-20 left-10 w-32 h-32 bg-brand-green/10 rounded-full blur-2xl" />
      <div className="service-float-2 absolute bottom-20 right-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-2xl" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-5 py-2.5 bg-brand-green/10 text-brand-green rounded-full text-sm font-semibold mb-6"
          >
            Nuestros Servicios
          </motion.span>

          <motion.h2
            id="servicios-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
          >
            Soluciones para cada{' '}
            <span className="text-brand-green">necesidad</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Descubre ambientes de limpieza en hogares e instituciones.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {servicios.map((servicio, index) => (
            <ServicioCard
              key={servicio.title}
              {...servicio}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicios;
