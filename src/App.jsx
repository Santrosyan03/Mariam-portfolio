import Header from './components/Header';
import Services from './components/Services';
import Footer from './components/Footer';
import { ThemeProvider } from './ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Services />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
