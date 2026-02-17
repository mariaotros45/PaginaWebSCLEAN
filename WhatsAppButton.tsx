import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  const phoneNumber = '3219373623';
  const message = '¡Hola! Me interesa obtener información sobre los productos de Super Clean Institucional. ¿Podrían ayudarme?';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // Hide notification after 5 seconds
    const timer = setTimeout(() => {
      setHasNotification(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setHasNotification(false);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Chat Bubble */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#25D366] p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Super Clean</h4>
                  <p className="text-white/80 text-sm">En línea</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-auto text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Message */}
              <div className="p-4 bg-[#E5DDD5] min-h-[120px]">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[85%]"
                >
                  <p className="text-gray-700 text-sm">
                    ¡Hola! 👋 Bienvenido a Super Clean Institucional. ¿En qué podemos ayudarte hoy?
                  </p>
                  <span className="text-gray-400 text-xs mt-1 block text-right">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              </div>

              {/* CTA Button */}
              <div className="p-4 bg-white">
                <button
                  onClick={handleClick}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chatear por WhatsApp
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          onClick={() => isOpen ? setIsOpen(false) : handleClick()}
          className="relative w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-lg flex items-center justify-center transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 4px 20px rgba(37, 211, 102, 0.4)',
              '0 4px 30px rgba(37, 211, 102, 0.6)',
              '0 4px 20px rgba(37, 211, 102, 0.4)',
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <MessageCircle className="w-8 h-8 text-white fill-current" />

          {/* Notification Badge */}
          <AnimatePresence>
            {hasNotification && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-xs font-bold">1</span>
              </motion.span>
            )}
          </AnimatePresence>

          {/* Ripple Effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        </motion.button>
      </motion.div>
    </>
  );
};

export default WhatsAppButton;
