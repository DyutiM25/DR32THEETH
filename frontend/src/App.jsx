import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import Signup from "./pages/Auth/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
