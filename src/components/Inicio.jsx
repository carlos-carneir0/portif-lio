import React from 'react';
import './Inicio.css';

import { useEffect, useRef, useState } from 'react';

const frases = [
  'Bem-vindo ao Meu Portfólio',
  'Téc.Desenvolvimento de Sistemas',
  'Desenvolvedor FrontEnd',
  'Programador de microcontroladores'
];

function Inicio() {
  const [text, setText] = useState('');
  const [fraseIndex, setFraseIndex] = useState(0);
  const [digitando, setDigitando] = useState(true);

  useEffect(() => {
    let typingTimeout;
    let deletingTimeout;

    if (digitando) {
      if (text.length < frases[fraseIndex].length) {
        typingTimeout = setTimeout(() => {
          setText(frases[fraseIndex].slice(0, text.length + 1));
        }, 90);
      } else {
        setTimeout(() => setDigitando(false), 1200);
      }
    } else {
      if (text.length > 0) {
        deletingTimeout = setTimeout(() => {
          setText(frases[fraseIndex].slice(0, text.length - 1));
        }, 30);
      } else {
        setDigitando(true);
        setFraseIndex((prev) => (prev + 1) % frases.length);
      }
    }

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(deletingTimeout);
    };
  }, [text, digitando, fraseIndex]);

  const [reveal, setReveal] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setTimeout(() => setReveal(true), 200);
  }, []);

  useEffect(() => {
    // Criar partículas
    const createParticles = () => {
      const newParticles = [];
      const numParticles = 90;
      
      for (let i = 0; i < numParticles; i++) {
        newParticles.push({
          id: i,
          size: Math.random() * 6 + 3,
          left: Math.random() * 100,
          top: Math.random() * 100,
          duration: Math.random() * 5 + 4, // mais rápido
          delay: Math.random(), // delay menor
          opacity: Math.random() * 0.5 + 0.1,
          moveX: (Math.random() - 5) * 60,
          moveY: (Math.random() - 5) * 60
        });
      }
      
      setParticles(newParticles);
    };
    
    createParticles();
    
    // Recriar partículas periodicamente para manter o efeito
    const interval = setInterval(() => {
      createParticles();
    }, 30000); // A cada 30 segundos
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inicio-container">
      <div className="background-animation">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              '--duration': `${particle.duration}s`,
              '--delay': `${particle.delay}s`,
              '--max-opacity': particle.opacity,
              '--move-x': `${particle.moveX}px`,
              '--move-y': `${particle.moveY}px`
            }}
          />
        ))}
      </div>
      <h1 className={`typewriter${reveal ? ' reveal' : ''}`}>{text}<span className="cursor">|</span></h1>
      <p className={reveal ? 'reveal' : ''}>Este é o início do seu site em React. Use a navegação para conhecer mais!</p>
    </div>
  );
}



export default Inicio;
