import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { FaMoon, FaSun, FaBalanceScale } from 'react-icons/fa';

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <nav className="nav">
        <div className="logo">
          <FaBalanceScale size={32} color="var(--color-accent)" />
          <span className="site-title">Mariam Law</span>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </nav>
      <section className="hero">
        <h1>Professional Legal Services</h1>
        <p>Your trusted partner in law.</p>
      </section>
    </header>
  );
}
