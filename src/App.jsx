import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider } from './ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <Hero />
            <About />
            <Services />
            <Contact />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
