import React from 'react';
import { Briefcase, ListTodo, Wrench, Sparkles } from 'lucide-react';
import Navbar from './NavBar'; // ✅ Import du composant Navbar
import './HomePage.css';

const HomePage = ({ setCurrentPage }) => (
  <div className="home-container">
    {/* ✅ Navbar en haut de la page */}
    <Navbar />

    {/* Effet de fond avec des bulles animées */}
    <div className="background-bubbles">
      {[...Array(10)].map((_, i) => <div key={i} className="bubble"></div>)}
    </div>

    {/* Section principale : Accueil */}
    <div className="main-content">
      <div className="card-container animate-fadeIn">
        <h1 className="home-title">Gestion de Projets et de Tâches</h1>
        <p className="home-description">
          Organisez vos idées, projets et tâches pour rester productif et concentré sur vos objectifs.
        </p>
        <div className="btn-container">
          <button
            onClick={() => setCurrentPage('projets')}
            className="btn-primary"
          >
            <Briefcase size={20} />
            <span>Gérer mes Projets</span>
          </button>
          <button
            onClick={() => setCurrentPage('taches')}
            className="btn-primary"
          >
            <ListTodo size={20} />
            <span>Accéder à mes Tâches</span>
          </button>
        </div>
      </div>
    </div>
    
    {/* Section des fonctionnalités */}
    <section className="features-section">
      <h2 className="section-title">Comment ça marche ?</h2>
      <div className="features-grid">
        <div className="feature-card animate-fadeIn">
          <Briefcase size={48} className="feature-icon" />
          <h3 className="feature-title">Gérez vos projets</h3>
          <p className="feature-description">
            Créez des tableaux pour chaque projet et organisez-les en listes pour une vision claire de votre travail. 
          </p>
        </div>
        <div className="feature-card animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <ListTodo size={48} className="feature-icon" />
          <h3 className="feature-title">Organisez vos tâches</h3>
          <p className="feature-description">
            Ajoutez des cartes de tâches, attribuez-les et suivez leur progression d'une liste à l'autre. C'est simple et efficace. 
          </p>
        </div>
        <div className="feature-card animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <Sparkles size={48} className="feature-icon" />
          <h3 className="feature-title">Restez concentré</h3>
          <p className="feature-description">
            Grâce à une interface claire et épurée, vous ne serez pas distrait et vous pourrez vous concentrer sur ce qui compte vraiment. 
          </p>
        </div>
      </div>
    </section>

    {/* Section d'appel à l'action (CTA) */}
    <section className="cta-section">
      <div className="cta-card animate-fadeIn">
        <h2 className="cta-title">Prêt à commencer ?</h2>
        <p className="cta-description">
          Rejoignez des milliers d'utilisateurs qui gèrent leurs projets et leurs tâches avec efficacité.
        </p>
        <button
          onClick={() => setCurrentPage('projets')}
          className="btn-primary"
        >
          <Wrench size={20} />
          <span>Commencer maintenant</span>
        </button>
      </div>
    </section>
  </div>
);

export default HomePage;
