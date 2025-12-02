import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CTASection } from './components/CTASection';
import { HomePage } from './pages/HomePage';
import { CoursePage } from './pages/CoursePage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course/:id" element={<CoursePage />} />
        </Routes>
      </div>
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
