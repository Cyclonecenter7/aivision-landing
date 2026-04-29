import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';

import Landing from './pages/Landing';
import CasePage from './pages/CasePage';
import CasePage2 from './pages/CasePage2';
import CasePage3 from './pages/CasePage3';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Consent from './pages/Consent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/case/1" element={<CasePage />} />
        <Route path="/case/2" element={<CasePage2 />} />
        <Route path="/case/3" element={<CasePage3 />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
