import { useState, useEffect, useRef } from 'react';
import { Play, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image zoom and fade
      tl.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5 }
      );

      // Title animation with split text effect
      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, rotateX: -30 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1 },
        '-=1'
      );

      // Subtitle fade in
      tl.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );

      // Buttons stagger in
      tl.fromTo(
        buttonsRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
        '-=0.4'
      );

      // Floating animation for decorative elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      role="banner"
      aria-label="Banner principal"
    >
      {/* Background Image with Parallax */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <img
          src="/images/hero-reference.png"
          alt="Madre e hijo en cocina limpia y moderna"
          className="w-full h-full object-cover object-center"
        />
        {/* Animated Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-r from-brand-green/90 via-brand-green/70 to-transparent"
        />

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-element absolute w-4 h-4 bg-white/20 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-32">
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              <span className="w-2 h-2 bg-brand-green-light rounded-full animate-pulse" />
              Productos 100% Biodegradables
            </span>
          </motion.div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            style={{ perspective: '1000px' }}
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                REGRESA
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-brand-green-light"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                A LO BÁSICO
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Y NATURAL
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl lg:text-2xl text-white/90 font-light mb-10 max-w-xl"
          >
            Comparte momentos felices y espacios seguros.
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => setIsVideoOpen(true)}
                variant="outline"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-brand-green px-8 py-6 rounded-full text-base font-medium transition-all duration-300"
              >
                <motion.span
                  className="flex items-center"
                  whileHover={{ x: 3 }}
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Ver Video
                </motion.span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={scrollToContact}
                className="group bg-brand-green hover:bg-brand-green-dark text-white px-8 py-6 rounded-full text-base font-medium transition-all duration-300 hover:shadow-xl hover:shadow-brand-green/30"
              >
                <motion.span
                  className="flex items-center"
                  whileHover={{ x: 3 }}
                >
                  Cotizar Ahora
                  <ChevronRight className="w-5 h-5 ml-2" />
                </motion.span>
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg"
          >
            {[
              { value: '10+', label: 'Años de experiencia' },
              { value: '5K+', label: 'Clientes satisfechos' },
              { value: '100%', label: 'Biodegradable' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.15 }}
              >
                <motion.span
                  className="block text-3xl lg:text-4xl font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1.4 + index * 0.15,
                    type: 'spring',
                    stiffness: 200,
                  }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-white/70 text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black border-none overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Video Corporativo Super Clean Institucional</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              aria-label="Cerrar video"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <div className="text-center text-white p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                </motion.div>
                <p className="text-lg opacity-70">Video corporativo próximamente</p>
                <p className="text-sm opacity-50 mt-2">
                  Estamos preparando contenido exclusivo para ti
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
