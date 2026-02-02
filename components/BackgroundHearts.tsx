
import React, { useEffect, useState } from 'react';

const BackgroundHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const generatedHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * (40 - 15) + 15}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * (15 - 10) + 10}s`,
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-200 animate-float"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            bottom: '-50px',
            opacity: 0.6,
          }}
        >
          ❤️
        </div>
      ))}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-50vh) rotate(180deg);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BackgroundHearts;
