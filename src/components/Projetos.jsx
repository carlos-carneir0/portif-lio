import React, { useEffect, useState, useRef } from 'react';
import './Projetos.css';

function Projetos() {
  const [revealFirst, setRevealFirst] = useState(false);
  const [revealSecond, setRevealSecond] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let revealed = false;
    const handleReveal = (entries, observer) => {
      if (entries[0].isIntersecting && !revealed) {
        revealed = true;
        setRevealFirst(true);
        setTimeout(() => setRevealSecond(true), 120);
        observer.disconnect(); // Para garantir que só rode uma vez
      }
    };

    const observer = new window.IntersectionObserver((entries, obs) => handleReveal(entries, obs), {
      threshold: 0.1,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projetos" ref={sectionRef}>
      <h1>Projetos</h1>
      <div className="projetos-cards">
        <div className={`card${revealFirst ? ' reveal reveal-delay-1' : ''}`}>
          <img src={require('../assets/placeholder.png')} alt="Projeto 1" className="card-img" />
          <h2>Projeto 1</h2>
          <p>Descrição breve do projeto 1.</p>
          <a href="#" className="card-btn" target="_blank" rel="noopener noreferrer">Ver Projeto</a>
        </div>
        <div className={`card${revealSecond ? ' reveal reveal-delay-2' : ''}`}>
          <img src={require('../assets/placeholder.png')} alt="Projeto 2" className="card-img" />
          <h2>Projeto 2</h2>
          <p>Descrição breve do projeto 2.</p>
          <a href="#" className="card-btn" target="_blank" rel="noopener noreferrer">Ver Projeto</a>
        </div>
      </div>
    </section>
  );
}

export default Projetos;
