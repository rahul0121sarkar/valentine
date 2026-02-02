
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ValentineCardProps {
  onAccept: () => void;
}

const ValentineCard: React.FC<ValentineCardProps> = ({ onAccept }) => {
  const [yesScale, setYesScale] = useState(1);
  const [noCount, setNoCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation with cleanup to prevent blurriness
    gsap.fromTo(cardRef.current, 
      { scale: 0.9, opacity: 0, y: 30 },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "back.out(1.5)",
        clearProps: "transform", // This is key to fixing blurriness after animation
        onComplete: () => {
          // Ensure the element is perfectly sharp after entry
          if (cardRef.current) cardRef.current.style.transform = 'none';
        }
      }
    );
  }, []);

  const moveNoButton = () => {
    if (!noButtonRef.current || !containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const btn = noButtonRef.current.getBoundingClientRect();

    // Calculate a safe area within the card
    const padding = 20;
    const maxX = container.width - btn.width - padding;
    const maxY = container.height - btn.height - padding;

    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    gsap.to(noButtonRef.current, {
      position: 'absolute',
      left: randomX,
      top: randomY,
      duration: 0.2,
      ease: "power2.out"
    });

    setYesScale(prev => prev + 0.2);
    setNoCount(prev => prev + 1);
  };

  const getNoText = () => {
    const texts = [
      "No", "Are you sure?", "Pookie please...", "Don't do this to me", 
      "I'm gonna cry", "You're breaking my heart", "Think about it!", 
      "Just click Yes!", "Last chance!", "Pretty please?", 
      "You're mean! :(", "I'll be very sad", "Fine, be like that",
      "Wait, no!", "Come back!", "Still no?"
    ];
    return texts[Math.min(noCount, texts.length - 1)];
  };

  return (
    <div 
      ref={cardRef}
      className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_15px_40px_rgba(255,140,160,0.4)] border-[6px] border-pink-100 text-center max-w-lg w-full z-20 transform-gpu"
      style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'antialiased' }}
    >
      <div className="mb-6 text-7xl animate-bounce" style={{ animationDuration: '3s' }}>💝</div>
      
      <h1 className="cursive text-4xl md:text-5xl text-pink-600 font-bold mb-8 leading-tight">
        Akshitha Will you be my Valentine?
      </h1>

      <div 
        ref={containerRef}
        className="relative flex flex-col md:flex-row items-center justify-center gap-6 mt-4 min-h-[280px] w-full bg-pink-50/30 rounded-3xl p-4"
      >
        <button
          onClick={onAccept}
          style={{ 
            transform: `scale(${yesScale})`,
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          className="bg-pink-500 hover:bg-pink-600 text-white font-black py-4 px-12 rounded-full shadow-xl text-2xl z-30 ring-4 ring-white active:scale-95 whitespace-nowrap"
        >
          Yes!
        </button>

        <button
          ref={noButtonRef}
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          className="bg-white hover:bg-gray-50 text-gray-500 font-bold py-3 px-8 rounded-full shadow-md transition-colors duration-200 text-xl whitespace-nowrap border-2 border-pink-50"
        >
          {getNoText()}
        </button>
      </div>

      <div className="mt-8 text-pink-400 text-sm font-bold uppercase tracking-widest opacity-60">
        {noCount > 0 ? `Resistance count: ${noCount}` : "Choice is yours (sort of)"}
      </div>
    </div>
  );
};

export default ValentineCard;
