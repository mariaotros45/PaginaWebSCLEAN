import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  pin?: boolean;
}

export const useScrollAnimation = () => {
  const createFadeInUp = (
    element: Element | Element[] | string,
    options: ScrollAnimationOptions = {}
  ) => {
    const {
      start = 'top 85%',
      toggleActions = 'play none none none',
    } = options;

    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element as Element,
          start,
          toggleActions,
        },
      }
    );
  };

  const createStaggerReveal = (
    container: Element | string,
    items: string,
    options: ScrollAnimationOptions = {}
  ) => {
    const {
      start = 'top 80%',
      toggleActions = 'play none none none',
    } = options;

    return gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container as Element,
          start,
          toggleActions,
        },
      }
    );
  };

  const createParallax = (
    element: Element | string,
    speed: number = 0.5,
    options: ScrollAnimationOptions = {}
  ) => {
    const { start = 'top bottom', end = 'bottom top' } = options;

    return gsap.to(element, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element as Element,
        start,
        end,
        scrub: true,
      },
    });
  };

  const createScaleIn = (
    element: Element | string,
    options: ScrollAnimationOptions = {}
  ) => {
    const {
      start = 'top 85%',
      toggleActions = 'play none none none',
    } = options;

    return gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: element as Element,
          start,
          toggleActions,
        },
      }
    );
  };

  const createSlideIn = (
    element: Element | string,
    direction: 'left' | 'right' = 'left',
    options: ScrollAnimationOptions = {}
  ) => {
    const {
      start = 'top 80%',
      toggleActions = 'play none none none',
    } = options;

    const xOffset = direction === 'left' ? -80 : 80;

    return gsap.fromTo(
      element,
      {
        opacity: 0,
        x: xOffset,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element as Element,
          start,
          toggleActions,
        },
      }
    );
  };

  return {
    createFadeInUp,
    createStaggerReveal,
    createParallax,
    createScaleIn,
    createSlideIn,
  };
};

export default useScrollAnimation;
