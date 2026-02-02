
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import confetti from "canvas-confetti";


const SuccessView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Confetti burst
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // GSAP animations
    gsap.fromTo(containerRef.current, 
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.2)" }
    );

    gsap.fromTo(textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.8, duration: 1, ease: "power3.out" }
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center justify-center text-center p-8 z-20"
    >
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-pink-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
        {/* Cute dinner date GIF */}
        <img 
          src="https://c.tenor.com/Mo2GB8SyzWMAAAAC/tenor.gif" 
          alt="Dinner Date Celebration" 
          className="relative w-72 h-72 md:w-96 md:h-96 object-cover rounded-3xl border-8 border-white shadow-2xl"
        />
      </div>
      
      <div ref={textRef}>
        <h2 className="cursive text-5xl md:text-6xl text-pink-600 font-bold mb-6">
          Yay! I knew it! ❤️
        </h2>
        <p className="text-xl md:text-2xl text-pink-800 font-semibold max-w-xl bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-pink-100 shadow-sm">
          Congratulations! You just chose to be in the best date of your life! 🥂✨
        </p>
        
        <div className="mt-10 flex gap-4 justify-center">
            <span className="text-4xl animate-bounce">🕯️</span>
            <span className="text-4xl animate-bounce delay-150">🍝</span>
            <span className="text-4xl animate-bounce delay-300">🍷</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessView;
