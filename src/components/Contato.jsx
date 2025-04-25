import React from 'react';
import '../pages/Contato.css';

function Contato() {
  return (
    <div className="contato-container">
      <h1>Contato</h1>
      <p>Entre em contato comigo pelo e-mail: <a href="mailto:seuemail@exemplo.com">seuemail@exemplo.com</a></p>
      <p>Ou preencha o formulário abaixo:</p>
      <form>
        <input type="text" placeholder="Seu nome" required />
        <input type="email" placeholder="Seu e-mail" required />
        <textarea placeholder="Sua mensagem" required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contato;
