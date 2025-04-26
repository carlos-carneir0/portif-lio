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

  useEffect(() => {
    setTimeout(() => setReveal(true), 200);
  }, []);

  return (
    <div className="inicio-container">
      <div className="background-animation"></div>
      <h1 className={`typewriter${reveal ? ' reveal' : ''}`}>{text}<span className="cursor">|</span></h1>
      <p className={reveal ? 'reveal' : ''}>Este é o início do seu site em React. Use a navegação para conhecer mais!</p>
    </div>
  );
}



export default Inicio;
