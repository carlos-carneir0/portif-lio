import React from 'react';
import Navbar from './components/Navbar';
import './pages/Inicio.css';
import './pages/Sobre.css';
import './pages/Projetos.css';
import './pages/Contato.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="inicio" className="inicio-container">
          <h1>Bem-vindo ao Meu Portfólio</h1>
          <p>Este é o início do seu site em React. Use a navegação para conhecer mais!</p>
        </section>
        <section id="sobre" className="sobre-container">
          <h1>Sobre</h1>
          <p>Este site foi criado para apresentar meu portfólio, meus projetos e formas de contato.</p>
          <p>Aqui você pode conhecer um pouco mais sobre mim e meu trabalho.</p>
        </section>
        <section id="projetos" className="projetos-container">
          <h1>Projetos</h1>
          <ul>
            <li>Projeto 1: Descrição breve do projeto 1.</li>
            <li>Projeto 2: Descrição breve do projeto 2.</li>
            <li>Projeto 3: Descrição breve do projeto 3.</li>
          </ul>
        </section>
        <section id="contato" className="contato-container">
          <h1>Contato</h1>
          <p>Entre em contato comigo pelo e-mail: <a href="mailto:seuemail@exemplo.com">seuemail@exemplo.com</a></p>
          <p>Ou preencha o formulário abaixo:</p>
          <form>
            <input type="text" placeholder="Seu nome" required />
            <input type="email" placeholder="Seu e-mail" required />
            <textarea placeholder="Sua mensagem" required />
            <button type="submit">Enviar</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default App;
