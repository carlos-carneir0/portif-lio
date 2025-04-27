import React from 'react';
import './Contato.css';

function Contato() {
  return (
    <div className="contato-container">
      <h1>Contato</h1>
      <p style={{fontSize: '1.2rem'}}>Entre em contato comigo pelo e-mail:<br/>
        <a className="contato-email" href="mailto:carloseacarneiro@gmail.com">carloseacarneiro@gmail.com</a>
      </p>
      <div className="contato-social-icons">
        <a
          className="contato-icon-btn linkedin"
          href="https://www.linkedin.com/in/seu-usuario" 
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <img src={require('../icons/linkedin.svg').default} alt="LinkedIn" className="contato-icon" />
        </a>
        <a
          className="contato-icon-btn github"
          href="https://github.com/carlos-carneir0" 
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <img src={require('../icons/github.svg').default} alt="GitHub" className="contato-icon" />
        </a>
      </div>
    </div>
  );
}

export default Contato;
