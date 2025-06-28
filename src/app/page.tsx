'use client';

import { useEffect } from 'react';
import { MapPin, Clock, Users, Star, Check, Car, Shield, Zap } from 'lucide-react';

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(target.getAttribute('href')!);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Header background on scroll
    const handleScroll = () => {
      const header = document.querySelector('.header') as HTMLElement;
      if (header) {
        if (window.scrollY > 100) {
          header.style.background = 'rgba(255, 255, 255, 0.98)';
          header.style.backdropFilter = 'blur(20px)';
        } else {
          header.style.background = 'rgba(255, 255, 255, 0.95)';
          header.style.backdropFilter = 'blur(10px)';
        }
      }
    };

    // Add hover effects to cards
    const addCardHoverEffects = () => {
      const cards = document.querySelectorAll('.feature-card, .pricing-card:not(.featured)');
      cards.forEach(card => {
        card.addEventListener('mouseenter', function(this: HTMLElement) {
          this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function(this: HTMLElement) {
          this.style.transform = 'translateY(0)';
        });
      });
    };

    // Animate elements on scroll
    const animateOnScroll = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);

      // Observe all animated elements
      document.querySelectorAll('.feature-card, .step, .pricing-card, .testimonial').forEach(el => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'translateY(30px)';
        (el as HTMLElement).style.transition = 'all 0.6s ease';
        observer.observe(el);
      });
    };

    // Add event listeners
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    window.addEventListener('scroll', handleScroll);
    
    // Initialize effects
    addCardHoverEffects();
    animateOnScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="logo">🅿️ Unde Parchez?</div>
          <ul className="nav-links">
            <li><a href="#features">Funcții</a></li>
            <li><a href="#how-it-works">Cum funcționează</a></li>
            <li><a href="#pricing">Prețuri</a></li>
            <li><a href="#testimonials">Recenzii</a></li>
          </ul>
          <a href="#download" className="cta-btn">Descarcă Acum</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="floating">Găsește locul perfect de parcare în București!</h1>
          <p>Monitorizare în timp real, comunitate activă și rezervări garantate. Transformă experiența de parcare într-una simplă și eficientă.</p>
          <div className="hero-cta">
            <a href="#download" className="btn-primary">Începe Gratuit</a>
            <a href="#demo" className="btn-secondary">Vezi Demo</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-title">
          <h2>De ce să alegi Unde Parchez?</h2>
          <p>Soluția completă pentru toate nevoile tale de parcare în oraș</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Monitorizare în Timp Real</h3>
            <p>Vezi disponibilitatea locurilor de parcare live, actualizată de comunitatea noastră activă de utilizatori din București.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Comunitate Activă</h3>
            <p>Peste 10.000 de șoferi raportează zilnic când părăsesc locurile de parcare, ajutându-te să găsești rapid un loc liber.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Hărți Interactive</h3>
            <p>Navigare ușoară cu integrare Google Maps și Waze. Găsește cea mai scurtă rută către locul de parcare disponibil.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Notificări Instant</h3>
            <p>Primește alerte pentru locurile de parcare care se eliberează în zona ta preferată. Nu mai pierde vremea căutând.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Siguranță Garantată</h3>
            <p>Sistem de rating și verificare a informațiilor. Toate locurile sunt validate de comunitate pentru acuratețe maximă.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Rezervări Premium</h3>
            <p>Rezervă în avans locurile de parcare pentru evenimente importante. Garantie 100% că vei avea loc asigurat.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="section-title">
          <h2>Cum funcționează?</h2>
          <p>3 pași simpli către parcarea perfectă</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Caută Locuri Disponibile</h3>
            <p>Deschide aplicația și vezi în timp real toate locurile de parcare disponibile în zona dorită din București.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Navighează la Destinație</h3>
            <p>Selectează locul potrivit și urmează indicațiile GPS integrate pentru a ajunge rapid la destinație.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Parchează și Raportează</h3>
            <p>Ocupă locul găsit și ajută comunitatea raportând când pleci, pentru a informa alți șoferi.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing">
        <div className="section-title">
          <h2>Planuri Simple și Transparente</h2>
          <p>Alege planul care se potrivește nevoilor tale</p>
        </div>
        <div className="pricing-cards">
          <div className="pricing-card">
            <div className="plan-name">Gratuit</div>
            <div className="plan-price">0 RON</div>
            <div className="plan-period">pe lună</div>
            <ul className="plan-features">
              <li>Vizualizare locuri disponibile</li>
              <li>Notificări de bază</li>
              <li>Raportare comunitate</li>
              <li>Hărți integrate</li>
              <li>Suport email</li>
            </ul>
            <a href="#signup" className="btn-secondary" style={{color: '#667eea', borderColor: '#667eea'}}>Începe Gratuit</a>
          </div>
          <div className="pricing-card featured">
            <div className="plan-name">Premium</div>
            <div className="plan-price">19 RON</div>
            <div className="plan-period">pe lună</div>
            <ul className="plan-features">
              <li>Toate funcțiile gratuite</li>
              <li>Rezervări în avans</li>
              <li>Notificări prioritare</li>
              <li>Istoric locuri favorite</li>
              <li>Suport telefonic 24/7</li>
              <li>Acces la parcări private</li>
            </ul>
            <a href="#upgrade" className="btn-primary">Upgrade la Premium</a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials">
        <div className="section-title">
          <h2>Ce spun utilizatorii noștri</h2>
          <p>Mii de șoferi din București își exprimă satisfacția</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial">
            <div className="testimonial-text">Aplicația mi-a schimbat complet experiența de parcare în centrul Bucureștiului. Nu mai pierd 20-30 de minute căutând un loc!</div>
            <div className="testimonial-author">- Maria Popescu, Sector 1</div>
          </div>
          <div className="testimonial">
            <div className="testimonial-text">Rezervările premium sunt geniale! Pentru întâlniri importante, știu că am locul garantat. Merită fiecare ban.</div>
            <div className="testimonial-author">- Alexandru Ionescu, Șofer Uber</div>
          </div>
          <div className="testimonial">
            <div className="testimonial-text">Comunitatea este super activă. Informațiile sunt mereu precise și la timp. Recomand cu încredere!</div>
            <div className="testimonial-author">- Diana Constantinescu, Sector 3</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Unde Parchez?</h3>
            <p>Aplicația care îți simplifică parcarea în București. Comunitate, tehnologie și inovație pentru o experiență de parcare perfectă.</p>
          </div>
          <div className="footer-section">
            <h3>Link-uri Utile</h3>
            <a href="#features">Funcții</a>
            <a href="#pricing">Prețuri</a>
            <a href="#support">Suport</a>
            <a href="#api">API Dezvoltatori</a>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <a href="#privacy">Politica de Confidențialitate</a>
            <a href="#terms">Termeni și Condiții</a>
            <a href="#cookies">Politica Cookies</a>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>📧 contact@undeparchez.ro</p>
            <p>📱 +40 21 123 4567</p>
            <p>📍 București, România</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Unde Parchez? Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  );
}
