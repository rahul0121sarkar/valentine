
import React, { useState } from 'react';
import ValentineCard from './components/ValentineCard';
import SuccessView from './components/SuccessView';
import BackgroundHearts from './components/BackgroundHearts';

const App: React.FC = () => {
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-pink-50 selection:bg-pink-200">
      <BackgroundHearts />
      
      {!isAccepted ? (
        <ValentineCard onAccept={() => setIsAccepted(true)} />
      ) : (
        <SuccessView />
      )}
      
      {/* Floating corner decorations */}
      <div className="absolute top-4 left-4 text-4xl opacity-50 animate-bounce delay-100">🌸</div>
      <div className="absolute top-4 right-4 text-4xl opacity-50 animate-bounce delay-300">💖</div>
      <div className="absolute bottom-4 left-4 text-4xl opacity-50 animate-bounce delay-500">✨</div>
      <div className="absolute bottom-4 right-4 text-4xl opacity-50 animate-bounce delay-200">🌹</div>
    </div>
  );
};

export default App;
