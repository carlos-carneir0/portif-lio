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
  const [particleOffsets, setParticleOffsets] = useState([]); // deslocamento temporário
  const [mousePos, setMousePos] = useState({ x: null, y: null });

  useEffect(() => {
    setTimeout(() => setReveal(true), 200);
  }, []);

  useEffect(() => {
    // Listener para atualizar posição do mouse
    const handleMouseMove = (e) => {
      const container = document.querySelector('.background-animation');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Criar partículas
    const createParticles = () => {
      const newParticles = [];
      const numParticles = 95;
      
      for (let i = 0; i < numParticles; i++) {
        newParticles.push({
          id: i,
          size: Math.random() * 6 + 3,
          left: Math.random() * 100,
          top: Math.random() * 100,
          duration: Math.random() * 5 + 4, // velocidade
          delay: Math.random(), // delay 
          opacity: Math.random() * 0.5 + 0.1,
          moveX: (Math.random() - 0.7) * 90,
          moveY: (Math.random() - 0.7) * 90
        });
      }
      
      setParticles(newParticles);
      setParticleOffsets(newParticles.map(() => ({ x: 0, y: 0 })));
    };
    
    createParticles();
    
    // Recriar partículas periodicamente para manter o efeito
    const interval = setInterval(() => {
      createParticles();
    }, 30000); // A cada 30 segundos
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Repulsão e retorno suave
  useEffect(() => {
    if (!particles.length) return;
    let animationFrame;
    const repulseRadius = 15; // em %
    const repulseStrength = 1; // força de afastamento
    const returnSpeed = 0.05; // velocidade de retorno (0~1)

    const updateOffsets = () => {
      setParticleOffsets((prevOffsets) =>
        particles.map((particle, i) => {
          let offsetX = prevOffsets[i]?.x || 0;
          let offsetY = prevOffsets[i]?.y || 0;
          if (mousePos.x !== null && mousePos.y !== null) {
            const dx = particle.left - mousePos.x;
            const dy = particle.top - mousePos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < repulseRadius) {
              // Repulsão
              const force = (repulseRadius - dist) / repulseRadius * repulseStrength;
              const angle = Math.atan2(dy, dx);
              const targetX = Math.cos(angle) * force * repulseRadius;
              const targetY = Math.sin(angle) * force * repulseRadius;
              // Interpola para o alvo
              offsetX = offsetX * (1 - returnSpeed) + targetX * returnSpeed;
              offsetY = offsetY * (1 - returnSpeed) + targetY * returnSpeed;
            } else {
              // Volta suavemente
              offsetX = offsetX * (1 - returnSpeed);
              offsetY = offsetY * (1 - returnSpeed);
            }
          } else {
            // Volta suavemente
            offsetX = offsetX * (1 - returnSpeed);
            offsetY = offsetY * (1 - returnSpeed);
          }
          return { x: offsetX, y: offsetY };
        })
      );
      animationFrame = requestAnimationFrame(updateOffsets);
    };
    animationFrame = requestAnimationFrame(updateOffsets);
    return () => cancelAnimationFrame(animationFrame);
  }, [particles, mousePos]);

  return (
    <div className="inicio-container">
      <div className="background-animation">
        {particles.map((particle, i) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `calc(${particle.left}% + ${particleOffsets[i]?.x || 0}%)`,
              top: `calc(${particle.top}% + ${particleOffsets[i]?.y || 0}%)`,
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
