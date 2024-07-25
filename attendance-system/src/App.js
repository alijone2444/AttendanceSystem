import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignupPage from './containers/LoginSignup/loginSignupPage';
import HomePage from './containers/HomePage/home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/Home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;