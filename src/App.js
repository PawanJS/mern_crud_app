import { Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout/layout.component';
import { Contact } from './pages/contact';
import { About } from './pages/about';
import { Home } from './pages/home';
import { CarList } from './components/Car-list/car-list.component';

import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dealer/:id" element={<CarList />} />
      </Routes>
    </Layout>
  );
}

export default App;
