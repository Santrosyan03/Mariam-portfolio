import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { FaMoon, FaSun, FaBalanceScale } from 'react-icons/fa';

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <FaBalanceScale size={32} color="var(--color-accent)" />
          <span className="site-title">Mariam Law</span>
        </div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </nav>
    </header>
  );
}
