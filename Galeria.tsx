import { useState, useRef, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Categoria = 'todos' | 'hogar' | 'empresarial' | 'instituciones';

interface ImagenGaleria {
  id: number;
  src: string;
  alt: string;
  categoria: Categoria;
}

const Galeria = () => {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>('todos');
  const [imagenSeleccionada, setImagenSeleccionada] = useState<ImagenGaleria | null>(null);
  const [imagenIndex, setImagenIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: '-100px' });
  const gridRef = useRef<HTMLDivElement>(null);

  const categorias: { value: Categoria; label: string }[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'hogar', label: 'Hogar' },
    { value: 'empresarial', label: 'Empresarial' },
    { value: 'instituciones', label: 'Instituciones' },
  ];

  const imagenes: ImagenGaleria[] = [
    {
      id: 1,
      src: '/images/hero-reference.png',
      alt: 'Limpieza en hogar familiar',
      categoria: 'hogar',
    },
    {
      id: 2,
      src: '/images/hero-reference.png',
      alt: 'Servicio empresarial de limpieza',
      categoria: 'empresarial',
    },
    {
      id: 3,
      src: '/images/hero-reference.png',
      alt: 'Limpieza institucional',
      categoria: 'instituciones',
    },
    {
      id: 4,
      src: '/images/hero-reference.png',
      alt: 'Productos de limpieza ecológicos',
      categoria: 'hogar',
    },
    {
      id: 5,
      src: '/images/hero-reference.png',
      alt: 'Oficina limpia y ordenada',
      categoria: 'empresarial',
    },
    {
      id: 6,
      src: '/images/hero-reference.png',
      alt: 'Institución educativa limpia',
      categoria: 'instituciones',
    },
  ];

  const imagenesFiltradas =
    categoriaActiva === 'todos'
      ? imagenes
      : imagenes.filter((img) => img.categoria === categoriaActiva);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid items stagger animation
      gsap.fromTo(
        '.gallery-item',
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [categoriaActiva]);

  const openLightbox = (imagen: ImagenGaleria) => {
    setImagenSeleccionada(imagen);
    const index = imagenesFiltradas.findIndex((img) => img.id === imagen.id);
    setImagenIndex(index);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex =
      direction === 'next'
        ? (imagenIndex + 1) % imagenesFiltradas.length
        : (imagenIndex - 1 + imagenesFiltradas.length) % imagenesFiltradas.length;
    setImagenIndex(newIndex);
    setImagenSeleccionada(imagenesFiltradas[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!imagenSeleccionada) return;
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'Escape') setImagenSeleccionada(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imagenSeleccionada, imagenIndex]);

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
      aria-labelledby="galeria-title"
    >
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-40 right-0 w-72 h-72 bg-brand-green/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-5 py-2.5 bg-brand-green/10 text-brand-green rounded-full text-sm font-semibold mb-6"
          >
            Galería
          </motion.span>

          <motion.h2
            id="galeria-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
          >
            Nuestro <span className="text-brand-green">Trabajo</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Conoce algunos de nuestros proyectos y resultados.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categorias.map((cat) => (
            <motion.button
              key={cat.value}
              onClick={() => setCategoriaActiva(cat.value)}
              className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 overflow-hidden ${
                categoriaActiva === cat.value
                  ? 'bg-brand-green text-white shadow-lg shadow-brand-green/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={categoriaActiva === cat.value}
            >
              {categoriaActiva === cat.value && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-brand-green rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {imagenesFiltradas.map((imagen, index) => (
              <motion.div
                key={imagen.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="gallery-item group relative overflow-hidden rounded-2xl cursor-pointer shadow-soft hover:shadow-card"
                onClick={() => openLightbox(imagen)}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={imagen.src}
                    alt={imagen.alt}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-green/50 to-transparent flex flex-col items-center justify-end p-6"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white font-medium">{imagen.alt}</p>
                  </motion.div>
                </motion.div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-brand-green capitalize">
                    {imagen.categoria}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {imagenSeleccionada && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={() => setImagenSeleccionada(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={() => setImagenSeleccionada(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation Buttons */}
            {imagenesFiltradas.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                >
                  <ChevronRight className="w-8 h-8" />
                </motion.button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={imagenSeleccionada.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative max-w-5xl w-full mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imagenSeleccionada.src}
                alt={imagenSeleccionada.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
              >
                <p className="text-white text-xl font-semibold">{imagenSeleccionada.alt}</p>
                <p className="text-white/60 text-sm mt-1">
                  {imagenIndex + 1} / {imagenesFiltradas.length}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Galeria;
