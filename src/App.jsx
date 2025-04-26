import React from 'react';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Sobre from './components/Sobre';
import Projetos from './components/Projetos';
import Contato from './components/Contato';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="inicio"><Inicio /></section>
        <section id="sobre"><Sobre /></section>
        <section id="projetos"><Projetos /></section>
        <section id="contato"><Contato /></section>
      </main>
    </>
  );
}

export default App;
