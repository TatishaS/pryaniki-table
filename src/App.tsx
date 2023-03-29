import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainTable from './pages/MainTable';
import NotFound from './pages/NotFound';

import SignIn from './pages/SignIn';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<MainTable />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
