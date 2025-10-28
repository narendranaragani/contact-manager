import ContactForm from "./components/contactForm.jsx";
import ContactList from "./components/contactList/contactList.jsx";
import { Routes, Route } from "react-router-dom";
import RegisterForm from "./components/loginForm/registerForm.jsx";
import LoginForm from "./components/loginForm/loginForm.jsx";
import ProtectRoute from "./components/protectedRoute/protect.jsx";
import Home from "./components/Home/home.jsx";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/"
        element={
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        }
      />
      <Route
        path="/form"
        element={
          <ProtectRoute>
            <ContactForm />
          </ProtectRoute>
        }
      />
      <Route
        path="/contacts"
        element={
          <ProtectRoute>
            <ContactList />
          </ProtectRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <ProtectRoute>
            <ContactForm />
          </ProtectRoute>
        }
      />
    </Routes>
  );
}

export default App;
