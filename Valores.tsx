import { useEffect, useRef } from 'react';
import { Leaf, Home, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ValorCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ValorCard = ({ icon, title, description, index }: ValorCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-white shadow-soft hover:shadow-card transition-shadow duration-500 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />

      {/* Icon Container */}
      <motion.div
        className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-green/10 to-brand-green/5 flex items-center justify-center mb-6 overflow-hidden"
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-brand-green"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
        >
          {icon}
        </motion.div>

        {/* Pulse Effect */}
        <motion.span
          className="absolute inset-0 rounded-2xl bg-brand-green/20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Title */}
      <motion.h3
        className="relative text-xl font-bold text-gray-800 mb-3 group-hover:text-brand-green transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.4 }}
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="relative text-gray-600 leading-relaxed max-w-xs"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.5 }}
      >
        {description}
      </motion.p>

      {/* Hover Arrow */}
      <motion.div
        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ x: -10 }}
        whileHover={{ x: 0 }}
      >
        <ArrowRight className="w-5 h-5 text-brand-green" />
      </motion.div>
    </motion.div>
  );
};

const Valores = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.valores-title span',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToServicios = () => {
    const element = document.getElementById('servicios');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const valores = [
    {
      icon: <Leaf className="w-10 h-10" />,
      title: 'Biodegradables Premium',
      description: 'Cuidando la salud y el medio ambiente.',
    },
    {
      icon: <Home className="w-10 h-10" />,
      title: 'Hogares y Empresas Seguros',
      description: 'Ideal para hogares, oficinas e instituciones.',
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: 'Certificación de Calidad',
      description: 'Productos con estándares de calidad superior.',
    },
  ];

  return (
    <section
      id="valores"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
      aria-labelledby="valores-title"
    >
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 bg-brand-blue/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-5 py-2.5 bg-brand-green/10 text-brand-green rounded-full text-sm font-semibold mb-6"
          >
            Nuestros Valores
          </motion.span>

          <h2
            id="valores-title"
            className="valores-title text-4xl lg:text-5xl font-bold text-gray-800 mb-6 overflow-hidden"
          >
            <span className="inline-block">¿Por qué</span>{' '}
            <span className="inline-block text-brand-green">elegirnos?</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Nos comprometemos con tu bienestar y el del planeta, ofreciendo soluciones de limpieza que marcan la diferencia.
          </motion.p>
        </div>

        {/* Valores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto mb-16">
          {valores.map((valor, index) => (
            <ValorCard
              key={valor.title}
              icon={valor.icon}
              title={valor.title}
              description={valor.description}
              index={index}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={scrollToServicios}
              className="group bg-brand-green hover:bg-brand-green-dark text-white px-10 py-6 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-brand-green/30"
            >
              Ver Todos los Productos
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Valores;
